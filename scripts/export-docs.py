#!/usr/bin/env python3
"""Derive Markdown from the same exported main content people read. No packages."""
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
import hashlib
import json
import os
import re

# The documentation articles come from the same list the site renders.
DOCS = json.loads((Path(__file__).resolve().parents[1] / 'src/content/docs.json').read_text())
DOC_ROUTES = tuple(f"/docs/{article['slug']}/" for article in DOCS['articles'])
ROUTES = ('/', '/commands/', '/what-is-vivary/', '/docs/') + DOC_ROUTES
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
SKIP = {'script', 'style', 'noscript', 'svg', 'button'}
# Elements that separate words when a page is flattened into search text.
BLOCK = {'p', 'li', 'dt', 'dd', 'td', 'th', 'tr', 'caption', 'pre', 'div', 'section', 'article', 'header', 'footer',
         'nav', 'ul', 'ol', 'dl', 'table', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}

@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)

class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node('root')
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def find(node, tag):
    if isinstance(node, str):
        return []
    return ([node] if node.tag == tag else []) + [found for child in node.children for found in find(child, tag)]


def plain(node):
    return node if isinstance(node, str) else ''.join(plain(child) for child in node.children)


def escape(text):
    return re.sub(r'([\\`*_\[\]<>])', r'\\\1', text)


def hidden(node):
    # data-export-skip marks interactive page furniture, such as a search form.
    return (node.tag in SKIP or node.attrs.get('aria-hidden') == 'true' or 'hidden' in node.attrs
            or 'data-export-skip' in node.attrs)


def table(node, origin):
    """A simple table becomes a GitHub-style pipe table. Each cell stays on one line."""
    lines = []
    for row in find(node, 'tr'):
        cells = [child for child in row.children if isinstance(child, Node) and child.tag in ('th', 'td') and not hidden(child)]
        text = [re.sub(r'\s+', ' ', render(cell, origin)).strip().replace('|', r'\|') for cell in cells]
        lines.append('| ' + ' | '.join(text) + ' |')
        if len(lines) == 1:
            lines.append('|' + '|'.join([' --- '] * len(cells)) + '|')
    caption = find(node, 'caption')
    title = re.sub(r'\s+', ' ', render(caption[0], origin)).strip() + '\n\n' if caption else ''
    return '\n\n' + title + '\n'.join(lines) + '\n\n'


def render(node, origin, in_pre=False):
    if isinstance(node, str):
        return node if in_pre else escape(re.sub(r'\s+', ' ', node))
    if hidden(node):
        return ''
    tag = node.tag
    if tag == 'table':
        return table(node, origin)
    if tag == 'pre':
        text = plain(node).strip('\n')
        fence = '`' * max(3, 1 + max((len(x) for x in re.findall(r'`+', text)), default=0))
        return f'\n\n{fence}\n{text}\n{fence}\n\n'
    if tag == 'code':
        text = plain(node)
        fence = '`' * (1 + max((len(x) for x in re.findall(r'`+', text)), default=0))
        return f'{fence} {text} {fence}' if '`' in text else f'{fence}{text}{fence}'
    chunks = []
    previous = None
    for child in node.children:
        chunk = render(child, origin, in_pre)
        # CSS gaps between adjacent labels/actions do not exist in text nodes.
        if isinstance(previous, Node) and isinstance(child, Node) and chunks and chunk and not chunks[-1][-1:].isspace() and not chunk[0].isspace():
            chunks.append(' ')
        chunks.append(chunk)
        previous = child
    content = ''.join(chunks)
    if tag == 'a' and node.attrs.get('href'):
        href = urljoin(origin, node.attrs['href'])
        if not href.startswith(('https://', 'http://', 'mailto:')):
            raise ValueError(f'Unsupported public link: {href}')
        return f'[{content.strip()}](<{href}>)'
    if tag == 'img':
        alt = node.attrs.get('alt', '')
        return f'![{escape(alt)}](<{urljoin(origin, node.attrs["src"])}>)' if alt else ''
    if tag == 'br':
        return '  \n'
    if tag == 'hr':
        return '\n\n---\n\n'
    if tag in ('strong', 'b'):
        return f'**{content}**'
    if tag in ('em', 'i'):
        return f'*{content}*'
    if tag in ('ul', 'ol'):
        items = [child for child in node.children if isinstance(child, Node) and child.tag == 'li']
        rendered_items = []
        for i, child in enumerate(items, 1):
            marker = f'{i}. ' if tag == 'ol' else '- '
            lines = render(child, origin).strip().splitlines()
            if not lines:
                continue
            # Continuation blocks must align after the complete list marker.
            continuation = [(' ' * len(marker) + line) if line.strip() else '' for line in lines[1:]]
            rendered_items.append(marker + lines[0] + ''.join('\n' + line for line in continuation))
        content = '\n'.join(rendered_items)
    if tag == 'dt':
        return f'\n\n**{content.strip()}**\n\n'
    if tag == 'dd':
        return content.strip() + '\n\n'
    if re.fullmatch(r'h[1-6]', tag):
        content = '#' * int(tag[1]) + ' ' + content.strip()
    if node.attrs.get('role') == 'img' and node.attrs.get('aria-label'):
        content = escape(node.attrs['aria-label']) + '\n\n' + content
    # Retain source anchors so links to setup/limits remain useful in Markdown.
    anchor = node.attrs.get('id')
    if anchor:
        if not re.fullmatch(r'[a-zA-Z0-9_-]+', anchor):
            raise ValueError(f'Unsupported anchor: {anchor}')
        content = f'<a id="{anchor}"></a>\n\n' + content
    if tag in {'main', 'section', 'article', 'div', 'p', 'dl', 'ul', 'ol', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}:
        return '\n\n' + content.strip() + '\n\n'
    return content


def convert(html, canonical):
    doc = Document(html)
    mains = find(doc.root, 'main')
    if len(mains) != 1 or len(find(mains[0], 'h1')) != 1:
        raise ValueError('Expected exactly one main and h1')
    body = render(mains[0], canonical)
    body = re.sub(r'\n[ \t]+\n', '\n\n', body)
    body = re.sub(r'\n{3,}', '\n\n', body).strip()
    title = plain(find(doc.root, 'title')[0])
    return title, f'Canonical page: {canonical}\n\n{body}\n'


def words(node):
    if isinstance(node, str):
        return node
    # Table captions and column headings repeat on every row of a table. They add noise to results.
    if hidden(node) or node.tag in ('caption', 'thead'):
        return ''
    inner = ''.join(words(child) for child in node.children)
    return f' {inner} ' if node.tag in BLOCK else inner


def clean(text):
    return re.sub(r'\s+', ' ', text).strip()


def search_entry(html, route):
    """One article's searchable text, split at its sections so a result links to an anchor."""
    main = find(Document(html).root, 'main')[0]
    summary = [node for node in find(main, 'p') if 'define' in node.attrs.get('class', '').split()]
    sections = []
    for section in find(main, 'section'):
        if 'data-search-section' not in section.attrs:
            continue
        anchor = section.attrs.get('id', '')
        heading = find(section, 'h2')
        if not re.fullmatch(r'[a-z0-9-]+', anchor) or len(heading) != 1:
            raise ValueError(f'{route}: each search section needs an id and one h2')
        body = ''.join(words(child) for child in section.children if not (isinstance(child, Node) and child.tag == 'h2'))
        sections.append({'id': anchor, 'heading': clean(words(heading[0])), 'text': clean(body)})
    if not sections or len(summary) != 1:
        raise ValueError(f'{route}: an article needs one summary and at least one section')
    return {'path': route, 'title': clean(words(find(main, 'h1')[0])), 'summary': clean(words(summary[0])), 'sections': sections}


def export():
    out = Path('out')
    origin = os.environ.get('NEXT_PUBLIC_SITE_URL', 'https://vivary-dev.github.io').rstrip('/')
    docs = []
    index = []
    for route in ROUTES:
        path = out / route.strip('/')
        html = (path / 'index.html').read_text()
        if route in DOC_ROUTES:
            index.append(search_entry(html, route))
        title, markdown = convert(html, origin + route)
        (path / 'index.md').write_text(markdown)
        docs.append({'path': route, 'markdownPath': route + 'index.md', 'title': title, 'uri': origin + route, 'markdown': markdown, 'htmlSha256': hashlib.sha256(html.encode()).hexdigest()})
    # The checked-in guidance stays authoritative; only its origin is build-specific.
    guidance = Path('public/llms.txt').read_text().replace('https://vivary-dev.github.io', origin)
    (out / 'llms.txt').write_text(guidance)
    # The docs search reads this file in the browser. No server is involved.
    (out / 'docs' / 'search-index.json').write_text(json.dumps({'articles': index}, ensure_ascii=False, separators=(',', ':')) + '\n')
    cache = Path('.tmp/pages-functions')
    cache.mkdir(parents=True, exist_ok=True)
    (cache / 'documents.json').write_text(json.dumps(docs, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(docs)} Markdown documents and a search index of {len(index)} articles from public HTML.')

if __name__ == '__main__':
    export()
