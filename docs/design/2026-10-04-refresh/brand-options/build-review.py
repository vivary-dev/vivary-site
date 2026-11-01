from pathlib import Path
from copy import deepcopy
import base64,hashlib,json,xml.etree.ElementTree as ET

ROOT=Path('/home/workspace/Projects/vivary-site-refresh-20261004')
OUT=Path(__file__).resolve().parent
ASSETS=ROOT/'docs/brand/system/assets'
NS='http://www.w3.org/2000/svg';ET.register_namespace('',NS)
word_source=ASSETS/'Wordmark/vivary-wordmark-bone.svg'
jar_source=ASSETS/'Marks/vivary-mark-jar-bone.svg'
lockup_source=ASSETS/'Lockups/vivary-lockup-horizontal-bone.svg'
icon_source=ASSETS/'App icon/vivary-appicon-1024.svg'
word=ET.parse(word_source).getroot();jar=ET.parse(jar_source).getroot();lockup=ET.parse(lockup_source).getroot();icon=ET.parse(icon_source).getroot()
reference=Path('/home/workspace/Projects/vivary-mascot-entry/.tmp/mascot-task7/app-dark-desktop.png')
assert hashlib.sha256(reference.read_bytes()).hexdigest()=='6a5988dbd38e68fe2e42135583e55b409d87f24de086fb0513dd169562566227'
(OUT/'reference-app-dark.png').write_bytes(reference.read_bytes())
site_reference=Path('/home/workspace/Projects/vivary-site-mascot/.tmp/pages-functions/render/home-1440.png')
assert site_reference.is_file()
(OUT/'reference-site-desktop.png').write_bytes(site_reference.read_bytes())

def write_svg(path,root,label):
 root.set('role','img');root.set('aria-label',label)
 ET.ElementTree(root).write(path,encoding='unicode',xml_declaration=False)
 with path.open('a') as f:f.write('\n')

def recolor(root,ink):
 for p in root.iter('{'+NS+'}path'):p.set('fill',ink)

def data(path,mime='image/svg+xml'):
 return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()

options=[
 {'id':'a','name':'Quiet wordmark','summary':'Full name in the header. A bone jar on charcoal for the native icon. Recommended.','header':'wordmark','tile':'#0c100e','ink':'#edf4ef','tradeoff':'Most restrained header. The small jar carries less detail at 16px; the name stays legible beside it in taskbar labels.'},
 {'id':'b','name':'Jar + name','summary':'The existing jar-and-name pairing, fitted to a UI header. The established lime app icon.','header':'lockup','tile':'#0c100e','ink':'#b8f263','tradeoff':'Strongest continuity with the current website lockup. The jar repeats beside the app name and makes the header wider.'},
 {'id':'c','name':'Light tile','summary':'Full-name header with a charcoal jar on a bone tile. Same letterforms, stronger icon silhouette.','header':'wordmark','tile':'#ebe5d8','ink':'#0c100e','tradeoff':'Clear silhouette on a dark taskbar. The pale tile is more noticeable and less quiet beside the mascot’s own bone tile.'},
]
for option in options:
 folder=OUT/f'option-{option["id"]}';folder.mkdir(exist_ok=True)
 for suffix,ink in [('dark','#edf4ef'),('light','#080705'),('site','#ebe5d8')]:
  w=deepcopy(word if option['header']=='wordmark' else lockup)
  # Existing path data and relative geometry stay exact. Only outside canvas changes.
  w.set('viewBox','172 169 507 222' if option['header']=='wordmark' else '169 169 716 232')
  w.attrib.pop('width',None);w.attrib.pop('height',None);recolor(w,ink)
  write_svg(folder/f'header-{suffix}.svg',w,'Vivary wordmark proposal '+option['id'].upper())
 native=deepcopy(icon)
 native.find('{'+NS+'}rect').set('fill',option['tile']);recolor(native,option['ink'])
 write_svg(folder/'app-icon.svg',native,'Vivary jar app icon proposal '+option['id'].upper())
 # Browser icon shares the exact native master, not a different symbol.
 (folder/'favicon.svg').write_bytes((folder/'app-icon.svg').read_bytes())

css='''*{box-sizing:border-box}body{margin:0;background:#080705;color:#ebe5d8;font:16px/1.5 ui-sans-serif,system-ui,sans-serif}main{max-width:1200px;margin:auto;padding:42px 24px}h1{font-size:40px;line-height:1.1;margin:12px 0}h2{font-size:26px;margin:0}h3{font-size:17px;margin:0 0 12px}p{max-width:76ch;color:#bcb3a3}a{color:#ebe5d8}a:focus-visible{outline:2px solid #e9a23b;outline-offset:4px}.kicker{font:12px ui-monospace,monospace;letter-spacing:.1em;color:#bcb3a3}.warning{padding:16px;border:1px solid #645841;background:#15120d}.option{margin:40px 0 56px;padding-top:24px;border-top:1px solid #514939}.samples{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}.swatch{padding:22px;border:1px solid #465149}.dark{background:#0c100e;color:#edf4ef}.light{background:#f5f5f5;color:#080705}.header-sample{height:56px;display:flex;align-items:center;gap:16px;border-bottom:1px solid #7d817d;margin-bottom:18px}.header-logo{height:36px;width:auto}.swatch-label{font-size:12px;color:inherit}.sizes{display:flex;align-items:end;gap:26px;min-height:70px}.size{text-align:center;display:flex;align-items:center;flex-direction:column;gap:8px;font:12px ui-monospace,monospace}.tab{display:flex;align-items:center;gap:8px;border:1px solid #7d817d;border-radius:8px 8px 0 0;padding:9px 12px;font-size:13px;margin-top:20px;width:180px}.context{margin-top:24px}.app-crop{position:relative;width:100%;aspect-ratio:1280/195;overflow:hidden;border:1px solid #35423b;background:#0c100e}.app-crop>.reference{display:block;width:100%;height:auto}.overlay{position:absolute;left:0;top:0;width:15.2%;height:25.1%;background:#0c100e;display:flex;align-items:center;padding-left:1.25%}.overlay>img{height:68%;width:auto;max-width:82%}.proposed-badge{font:12px ui-monospace,monospace;color:#d6cebf;margin:8px 0}.site-crop{position:relative;width:100%;aspect-ratio:1440/90;overflow:hidden;background:#080705;border:1px solid #2a2419}.site-crop>.reference{display:block;width:100%;height:auto}.site-overlay{position:absolute;left:5%;top:0;width:20%;height:100%;background:#080705;display:flex;align-items:center;padding-left:2%}.site-overlay img{height:45%;width:auto}.site-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border:1px solid #2a2419;background:#080705;gap:20px}.site-header img{height:38px;width:auto}.site-nav{display:flex;gap:24px;font:12px ui-monospace,monospace;color:#a69d8d}.hero-icons{display:flex;align-items:center;gap:16px}.hero-icons img{width:64px;height:64px}.links{display:flex;flex-wrap:wrap;gap:16px;font-size:14px}footer{margin-top:40px;border-top:1px solid #514939;padding-top:24px} @media(max-width:650px){main{padding:24px 16px}h1{font-size:30px}.samples{grid-template-columns:1fr}.site-nav span:nth-child(n+2){display:none}.app-crop{min-width:600px}.app-window{overflow:auto}.site-header{padding:12px}.sizes{gap:30px}}'''
sections=[]
for o in options:
 ident=o['id'];folder=OUT/f'option-{ident}';dark=data(folder/'header-dark.svg');light=data(folder/'header-light.svg');site=data(folder/'header-site.svg');ico=data(folder/'app-icon.svg')
 samples=''
 for tone,header in [('dark',dark),('light',light)]:
  sizes=''.join(f'<div class="size"><img src="{ico}" alt="Option {ident.upper()} jar icon" width="{n}" height="{n}"><span>{n}px</span></div>' for n in [16,24,32])
  samples+=f'<div class="swatch {tone}"><span class="swatch-label">{tone.title()} surface · actual CSS sizes</span><div class="header-sample"><img class="header-logo" src="{header}" alt="Vivary option {ident.upper()} wordmark"></div><div class="sizes">{sizes}</div><div class="tab"><img src="{ico}" alt="" width="16" height="16">Vivary · Projects</div></div>'
 sections.append(f'''<section class="option" id="option-{ident}"><div class="hero-icons"><img src="{ico}" alt="Option {ident.upper()} app icon"><div><div class="kicker">OPTION {ident.upper()}</div><h2>{o['name']}</h2></div></div><p>{o['summary']}</p><div class="samples">{samples}</div><p>{o['tradeoff']}</p><div class="context"><h3>Proposed app header placement</h3><p class="proposed-badge">MOCKUP OVER A REAL DEVELOPMENT CAPTURE · THE LOGO OVERLAY HAS NOT SHIPPED</p><div class="app-window"><div class="app-crop"><img class="reference" src="{data(reference,'image/png')}" alt="Original October 3 development interface with a proposal over the upper-left brand area"><div class="overlay"><img src="{dark}" alt="Proposed Vivary header"></div></div></div></div><div class="context"><h3>Proposed website header placement</h3><p class="proposed-badge">MOCKUP OVER THE REVIEWED OCTOBER 3 SITE CAPTURE · THE LOGO OVERLAY HAS NOT SHIPPED</p><div class="site-crop"><img class="reference" src="{data(site_reference,'image/png')}" alt="Reviewed website header with proposed logo overlay"><div class="site-overlay"><img src="{site}" alt="Vivary proposed site header"></div></div></div><p class="links"><a href="option-{ident}/header-dark.svg">Header SVG</a><a href="option-{ident}/app-icon.svg">Native icon SVG</a><a href="option-{ident}/favicon.svg">Browser SVG</a><a href="option-{ident}/app-icon.ico">Windows ICO</a></p></section>''')
html=f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Vivary wordmark and icon proposals · October 4</title><style>{css}</style><main><div class="kicker">VIVARY · IDENTITY REVIEW · 2026-10-04</div><h1>A proper name in the corner.</h1><p>Three ways to replace the generic V with the existing path-drawn Vivary wordmark and a matching jar icon. The product name, letterforms and jar geometry stay intact. The mascot remains the separate project-agent character.</p><p class="warning">Proposals only. These files do not change the app, website or native package. The app strips below are labeled overlays on a real development capture, not screenshots of implemented changes. Original capture: October 3, before runtime sign-in.</p><p><a href="#option-a">A · Quiet wordmark</a> &nbsp; <a href="#option-b">B · Jar + name</a> &nbsp; <a href="#option-c">C · Light tile</a></p>{''.join(sections)}<footer><h2>What would change after a choice</h2><p>The chosen header asset would replace the generic V/name treatment. The matching jar master would supply desktop, taskbar and browser icons. No mascot redesign, name, runtime behavior, permissions or release status changes are proposed.</p><p>Header canvases are intentionally tighter than the old print-oriented SVG clear space. The underlying path data stays exact. Component padding supplies surrounding space. This spacing adjustment and the A/C icon colors require review as proposals.</p><p>The source screenshot is the actual browser-rendered Workbench interface from PR #179 QA, not the September 22 Windows download. No private project content is visible.</p></footer></main></html>'''
(OUT/'review.html').write_text(html)
manifest={'status':'proposal-only','options':options,'sources':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in [word_source,jar_source,lockup_source,icon_source]},'referenceScreenshot':{'path':str(reference),'sha256':hashlib.sha256(reference.read_bytes()).hexdigest(),'captured':'2026-10-03','provenance':'PR179 QA Workbench browser render; not native Windows package'},'siteReferenceScreenshot':{'path':str(site_reference),'sha256':hashlib.sha256(site_reference.read_bytes()).hexdigest(),'provenance':'Reviewed Cloudflare preview render of prior site source9c4dc92; overlay only'},'pathDataPreserved':True}
(OUT/'provenance.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Prepared 3 options and standalone review HTML in',OUT)
