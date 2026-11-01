from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
from PIL import Image
import base64,hashlib,json,textwrap,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}'
checks=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome',args=['--no-sandbox'])
  try:
   page=browser.new_page(viewport={'width':1280,'height':1000},device_scale_factor=1,reduced_motion='reduce')
   errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(base+'/review.html',wait_until='networkidle')
   assert page.locator('img').evaluate_all('els=>els.every(e=>e.complete && e.naturalWidth>0)')
   assert page.evaluate('document.documentElement.scrollWidth')==1280
   for n in [16,24,32]:
    assert page.locator(f'.sizes img[width="{n}"]').count()==6
    for box in page.locator(f'.sizes img[width="{n}"]').all():assert box.bounding_box()['width']==n
   for ident in 'abc':
    page.locator('#option-'+ident).screenshot(path=str(ROOT/f'option-{ident}-review.png'))
   page.screenshot(path=str(ROOT/'review-desktop.png'),full_page=True)
   page.set_viewport_size({'width':390,'height':844});page.goto(base+'/review.html',wait_until='networkidle')
   assert page.evaluate('document.documentElement.scrollWidth')==390
   page.screenshot(path=str(ROOT/'review-phone.png'),full_page=True)
   assert not errors,errors
   checks.append({'check':'review renders','sizes':[16,24,32],'surfaces':['light','dark'],'desktop':1280,'phone':390,'pageErrors':errors,'pageOverflow':False})
   for ident in 'abc':
    folder=ROOT/f'option-{ident}'
    for size in [16,24,32,48,64,128,256,512,1024]:
     page.set_viewport_size({'width':1100,'height':1100})
     page.set_content(f'<html><body style="margin:0;background:transparent"><img id="export" src="{base}/option-{ident}/app-icon.svg" width="{size}" height="{size}"></body></html>')
     page.wait_for_function("document.querySelector('img').complete && document.querySelector('img').naturalWidth>0")
     page.locator('#export').screenshot(path=str(folder/f'app-icon-{size}.png'),omit_background=True,timeout=10000)
     im=Image.open(folder/f'app-icon-{size}.png');assert im.size==(size,size)
     assert im.mode=='RGBA' and im.getpixel((0,0))[3]<=1
    # Embed the individually browser-rendered small rasters, not resampled guesses.
    sizes=[16,24,32,48,64,128,256]
    frames=[Image.open(folder/f'app-icon-{n}.png') for n in sizes]
    frames[-1].save(folder/'app-icon.ico',format='ICO',sizes=[(n,n) for n in sizes],append_images=frames[:-1])
    ico=Image.open(folder/'app-icon.ico');assert ico.ico.sizes()==set((n,n) for n in sizes)
    checks.append({'option':ident,'icoSizes':sizes,'pngSizes':[16,24,32,48,64,128,256,512,1024],'cornerAlphaAtMost':1})
   page.close()
  finally:browser.close()
finally:server.shutdown();server.server_close()
# Structural proof: canonical path data is preserved and SVGs have no raster/text/scripts.
source=ROOT.parents[2]/'brand/system/assets'
word_d={p.attrib['d'] for p in ET.parse(source/'Wordmark/vivary-wordmark-bone.svg').iter() if p.tag.endswith('path')}
jar_d={p.attrib['d'] for p in ET.parse(source/'Marks/vivary-mark-jar-bone.svg').iter() if p.tag.endswith('path')}
for p in ROOT.glob('option-*/*.svg'):
 tree=ET.parse(p);paths={el.attrib['d'] for el in tree.iter() if el.tag.endswith('path')}
 assert paths.issubset(word_d|jar_d),str(p)
 assert not any(el.tag.split('}')[-1] in ['image','text','script','foreignObject'] for el in tree.iter())
checks.append({'check':'all proposed SVG paths match canonical source shapes; no text, raster, script or foreignObject','passed':True})
manifest={'checks':checks,'files':[{'path':p.relative_to(ROOT).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(ROOT.rglob('*')) if p.is_file() and p.suffix in ['.svg','.png','.ico','.html']]}
(ROOT/'render-checks.json').write_text(json.dumps(manifest,indent=2)+'\n')
# Separate inspection copies. The native proposal assets and original references stay unchanged.
for ident in 'abc':
 src=ROOT/f'option-{ident}-review.png';im=Image.open(src);im.thumbnail((1000,1200));target=ROOT/f'option-{ident}-inspect.jpg';im.convert('RGB').save(target,quality=78)
 target.with_suffix('.b64').write_text('\n'.join(textwrap.wrap(base64.b64encode(target.read_bytes()).decode(),120)))
print(json.dumps({'checks':len(checks),'files':len(manifest['files']),'passed':True,'helpersClosed':True}))
