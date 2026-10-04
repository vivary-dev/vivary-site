import importlib.util
import sys
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('export_docs', Path(__file__).parents[1] / 'scripts/export-docs.py')
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
spec.loader.exec_module(module)

class Markdown(unittest.TestCase):
    def test_semantic_content_and_boundaries(self):
        html = '''<html><title>Setup &amp; limits</title><nav>Skip navigation</nav><main id="main"><h1>Setup</h1><p>Before <strong>running</strong>, review <a href="/commands/#install">commands</a>.</p><ol><li>Read</li><li>Review <code>a_b --flag</code></li></ol><dl><dt>Version</dt><dd>0.4.2</dd></dl><pre><code>line1\n  line2 &lt;ok&gt;</code></pre><p id="limits">Unsigned preview.</p><div role="img" aria-label="Fictional illustration"><div aria-hidden="true">NOT REAL WORK</div></div><script>SECRET</script><img src="/decoration.svg" alt=""><img src="/diagram.png" alt="Project diagram"></main></html>'''
        title, md = module.convert(html, 'https://www.vivaryagent.xyz/')
        self.assertEqual(title, 'Setup & limits')
        for expected in ['# Setup', '**running**', 'https://www.vivaryagent.xyz/commands/#install', '1. Read', '2. Review `a_b --flag`', '**Version**', '0.4.2', 'line1\n  line2 <ok>', '<a id="limits"></a>', 'Unsigned preview.', 'Fictional illustration', '![Project diagram]']:
            self.assertIn(expected, md)
        for excluded in ['Skip navigation', 'SECRET', 'NOT REAL WORK', 'decoration.svg']:
            self.assertNotIn(excluded, md)

    def test_ordered_step_paragraphs_follow_marker_width(self):
        items = ''.join(f'<li><h3>Step {n}</h3><p>Action {n}.</p><p>Reason {n}.</p></li>' for n in range(1, 11))
        _, md = module.convert(f'<title>Setup</title><main><h1>Setup</h1><ol>{items}</ol></main>', 'https://example.com/')
        self.assertIn('1. ### Step 1\n\n   Action 1.\n\n   Reason 1.', md)
        self.assertIn('10. ### Step 10\n\n    Action 10.\n\n    Reason 10.', md)

    def test_adjacent_visual_labels_keep_word_boundaries(self):
        _, md = module.convert('<title>X</title><main><h1>X</h1><div><span>before the turn</span><span>capsule.json</span></div></main>', 'https://example.com/')
        self.assertIn('before the turn capsule.json', md)

    def test_ambiguous_content_fails_build(self):
        for html in ['<title>X</title><p>No main</p>', '<title>X</title><main><h1>A</h1><h1>B</h1></main>']:
            with self.assertRaises(ValueError): module.convert(html, 'https://example.com/')

    def test_link_resolves_against_source_route(self):
        _, md = module.convert('<title>Doc</title><main><h1>Doc</h1><a href="#install">Install</a></main>', 'https://www.vivaryagent.xyz/commands/')
        self.assertIn('https://www.vivaryagent.xyz/commands/#install', md)

if __name__ == '__main__': unittest.main()
