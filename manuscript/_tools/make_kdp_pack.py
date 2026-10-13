#!/usr/bin/env python3
"""
Build Volume 1's KDP production pack: print interior PDF, wraparound
cover, and a Kindle EPUB, from the manuscript source files.

Print interior is black & white by default (images are converted to
true grayscale, not left for the printer to desaturate); the Kindle
EPUB stays full colour but has its images downscaled/recompressed to
keep the per-MB delivery fee down.

This is Claude's build tooling, not something Leo needs to run day to
day -- it's saved here so a future session doesn't have to reconstruct
it from scratch again. Requires: Google Chrome (headless print-to-pdf
and screenshot), poppler's pdftotext/pdfinfo (`brew install poppler`),
Pillow (`pip install pillow`).

Usage:
    python3 make_kdp_pack.py <manuscript_root> <vol_num> <out_dir>

Example:
    python3 make_kdp_pack.py /Users/leopinheiro/Downloads/sfinco/manuscript 1 /tmp/vol1_kdp_build
"""
import sys, os, re, json, base64, zipfile, html as _html, hashlib, subprocess, shutil, io
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import build_ebook_preview as B

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
AUTHOR = 'Leonardo Pinheiro'
YEAR = '2025'


def parse_sections(vol_dir, vol_num):
    title, tagline, meta = B.parse_cover(vol_dir)
    files = ['00_FrontMatter.md'] + [f'0{n}_Chapter{n}.md' for n in range(1, 9)] + ['09_BackMatter.md']
    pages = B.render_body(vol_dir, files, vol_num, title)

    sections = []
    seen_chaps, seen_kinds = set(), set()
    cur = None
    for p in pages:
        html_parts = [h for h in p['html'] if not h.startswith('<p class="kicker">')]
        is_new_chapter = p['chap'] and p['chap'] not in seen_chaps
        is_new_frontback = (p['kind'] in ('front', 'back')) and (p['kind'] not in seen_kinds) and not p['chap']
        if p['chap']:
            seen_chaps.add(p['chap'])
        if p['kind'] in ('front', 'back'):
            seen_kinds.add(p['kind'])
        if (is_new_chapter or is_new_frontback) or cur is None:
            if cur:
                sections.append(cur)
            cur = {
                'label': p['label'] or ('Introduction' if p['kind'] == 'front' else ('Back matter' if p['kind'] == 'back' else '')),
                'chap': p['chap'], 'kind': p['kind'], 'html': [], 'toc_sub': [],
            }
        if p['label'] and p['label'] != cur['label']:
            cur['toc_sub'].append(p['label'])
        cur['html'].extend(html_parts)
    if cur:
        sections.append(cur)
    for idx, sec in enumerate(sections):
        sec['_id'] = f'sec{idx}'
    return title, tagline, meta, sections


# ---------------------------------------------------------------- print PDF

PRINT_CSS = '''
@page { size: 6in 9in; margin: 0.95in 0.75in 0.85in 0.75in;
  @bottom-center { content: counter(page); font-family:'IBM Plex Sans',Arial,sans-serif; font-size:9pt; color:#555; } }
@page :first { @bottom-center { content: ''; } }
* { box-sizing: border-box; }
html,body{ margin:0; padding:0; }
body{ font-family:'IBM Plex Sans',Arial,sans-serif; font-size:10.6pt; line-height:1.5; color:#17191c; }
.pbreak{ page-break-before: always; }
.titlepage{ page-break-before: always; text-align:center; padding-top:1.6in; }
.titlepage .kicker{ color:#7a7a7a; font-weight:700; letter-spacing:3px; font-size:11pt; margin-bottom:6px; }
.titlepage h1{ font-family:'Fraunces',Georgia,serif; font-weight:900; font-size:40pt; margin:10px 0 14px; }
.titlepage .tagline{ font-family:'Fraunces',Georgia,serif; font-style:italic; color:#3a3a3a; font-size:15pt; margin-bottom:60px; }
.titlepage .author{ font-weight:700; font-size:14pt; margin-top:110px; }
.titlepage .site{ color:#6b6f76; letter-spacing:2px; font-size:9pt; margin-top:6px; }
.copyright{ page-break-before: always; font-size:8.6pt; color:#444; padding-top:3.2in; line-height:1.6; }
.copyright p{ margin:0 0 10px; }
.toc{ page-break-before: always; }
.toc h1{ font-family:'Fraunces',Georgia,serif; font-size:22pt; margin-bottom:22px; }
.toc .entry{ display:flex; justify-content:space-between; align-items:baseline; border-bottom:1px dotted #c9c9c9; padding:7px 0; font-size:10.5pt; }
.toc .entry.sub{ padding-left:18px; font-size:9.5pt; color:#444; border-bottom:none; padding-top:2px; padding-bottom:2px; }
.toc .entry .pg{ color:#6b6f76; font-variant-numeric: tabular-nums; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:900; font-size:21pt; margin:0 0 4px; }
h1 .chap-num{ display:block; font-family:'IBM Plex Sans',Arial,sans-serif; font-weight:700; color:#7a7a7a; font-size:10pt; letter-spacing:3px; margin-bottom:6px; }
h2{ font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:14.5pt; margin:22px 0 8px; color:#3a3a3a; }
h3{ font-size:11.5pt; font-weight:700; margin:16px 0 6px; }
p.subtitle{ font-style:italic; color:#3a3a3a; font-size:11.5pt; margin:0 0 14px; }
p.lead{ font-size:11.2pt; margin:0 0 12px; }
p{ margin:0 0 10px; orphans:3; widows:3; }
p.mini-title{ font-weight:700; margin:18px 0 2px; }
p.mini-tagline{ font-style:italic; color:#3a3a3a; margin:0 0 10px; }
hr{ border:none; border-top:1px solid #ddd; margin:16px 0; }
.callout{ border-left:4px solid #3a3a3a; background:#f1f1f1; padding:9px 12px; margin:12px 0; page-break-inside:avoid; }
.callout-label{ display:block; font-weight:700; font-size:9pt; letter-spacing:1px; text-transform:uppercase; color:#3a3a3a; margin-bottom:3px; }
.callout.callout-warning{ border-color:#7a7a7a; background:#e6e6e6; }
.callout.callout-warning .callout-label{ color:#7a7a7a; }
.callout p{ margin:0 0 4px; font-size:9.8pt; }
.scam-example{ border:1px solid #ddd; border-radius:6px; padding:8px 10px; margin:10px 0; background:#fafafa; page-break-inside:avoid; }
.scam-from{ display:block; font-weight:700; font-size:9pt; color:#777; margin-bottom:3px; }
.scam-example p{ margin:0; font-style:italic; font-size:9.8pt; }
img.manuscript-img{ max-width:1.7in; display:block; margin:10px auto 2px; border:1px solid #ddd; border-radius:10px; }
p.img-caption{ text-align:center; font-size:8.6pt; color:#777; margin:0 0 12px; }
.table-wrap{ margin:12px 0; page-break-inside:avoid; }
table{ width:100%; border-collapse:collapse; font-size:9.4pt; }
th, td{ border:1px solid #ddd; padding:5px 7px; text-align:left; vertical-align:top; }
th{ background:#eeeeee; }
h4.numbered{ display:flex; align-items:center; gap:8px; margin:18px 0 8px; font-size:12pt; }
.num-badge{ background:#3a3a3a; color:#fff; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10pt; font-weight:700; flex:none; }
ul, ol{ margin:0 0 12px; padding-left:20px; }
li{ margin-bottom:4px; }
'''

DATA_URI_IMG_RE = re.compile(r'(data:image/(png|jpeg|jpg);base64,)([^"\')\s]+)')

def grayscale_data_uris(html_str):
    """Convert every embedded image to true grayscale, so the print PDF
    shows exactly what a black & white KDP print run will produce
    (rather than leaving it to the printer to desaturate colour)."""
    cache = {}
    def repl(m):
        prefix, b64 = m.group(1), m.group(3)
        key = hashlib.sha1(b64.encode()).hexdigest()
        if key not in cache:
            img = Image.open(io.BytesIO(base64.b64decode(b64))).convert('L')
            buf = io.BytesIO()
            img.save(buf, format='PNG', optimize=True)
            cache[key] = base64.b64encode(buf.getvalue()).decode()
        return 'data:image/png;base64,' + cache[key]
    return DATA_URI_IMG_RE.sub(repl, html_str)

H1_RE = re.compile(r'<h1[^>]*>(?:<span[^>]*>.*?</span>)?(.*?)</h1>')

def slug(key):
    return 'MK' + re.sub(r'[^A-Za-z0-9]', '', key).upper()[:40] + 'ZZ'

def marker_span(key):
    return f'<span style="position:absolute;opacity:0.01;font-size:1pt">{slug(key)}</span>'

def section_block(sec):
    out = [f'<section class="pbreak" id="{sec["_id"]}">', marker_span(sec['_id'])]
    sub_remaining = list(sec.get('toc_sub', []))
    for frag in sec['html']:
        m = H1_RE.search(frag)
        if m and sub_remaining:
            text = re.sub('<[^>]+>', '', m.group(1)).strip()
            if text == sub_remaining[0]:
                out.append(marker_span(sub_remaining[0]))
                sub_remaining.pop(0)
        out.append(frag)
    out.append('</section>')
    return ''.join(out)

def build_print_doc(title, tagline, sections, toc_numbers=None):
    parts = [f'''<div class="titlepage">
      <div class="kicker">SFINCO GUIDES &middot; SERIES 1</div>
      <h1>{_html.escape(title)}</h1>
      <div class="tagline">{_html.escape(tagline)}</div>
      <div class="author">{AUTHOR}</div>
      <div class="site">SFINCO.COM.AU</div>
    </div>''']
    parts.append(f'''<div class="copyright">
      <p><strong>{_html.escape(title)}</strong><br>Sfinco Guides, Volume 1 of 8</p>
      <p>First published {YEAR} by Sfinco.</p>
      <p>Copyright &copy; {YEAR} {AUTHOR} / Sfinco. All rights reserved.</p>
      <p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations used in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
      <p>The information in this book is provided for general guidance only and does not constitute professional legal, financial, or cybersecurity advice. Readers should seek advice appropriate to their own circumstances from a qualified professional before acting on anything in this book.</p>
      <p>Sfinco &middot; Sunshine Coast, Queensland, Australia &middot; sfinco.com.au</p>
    </div>''')

    toc_entries = []
    for sec in sections:
        toc_entries.append(('main', sec['label'], sec['_id']))
        for sub in sec.get('toc_sub', []):
            toc_entries.append(('sub', sub, sub))
    toc_html = ['<div class="toc"><h1>Contents</h1>']
    for kind, label, key in toc_entries:
        pg = (toc_numbers or {}).get(key, '')
        ecls = 'entry sub' if kind == 'sub' else 'entry'
        toc_html.append(f'<div class="{ecls}"><span>{_html.escape(label)}</span><span class="pg">{pg}</span></div>')
    toc_html.append('</div>')
    parts.append(''.join(toc_html))

    for sec in sections:
        parts.append(section_block(sec))

    body = ''.join(parts)
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>{PRINT_CSS}</style></head><body>{body}</body></html>'''


def chrome_print_pdf(html_path, pdf_path):
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                     f'--print-to-pdf={pdf_path}', '--print-to-pdf-no-header',
                     f'file://{html_path}'], check=True, capture_output=True)

def resolve_toc_numbers(pdf_path, sections):
    txt_path = pdf_path + '.txt'
    subprocess.run(['pdftotext', '-layout', pdf_path, txt_path], check=True)
    pages = open(txt_path).read().split('\f')
    numbers = {}
    for sec in sections:
        keys = [sec['_id']] + sec.get('toc_sub', [])
        for key in keys:
            token = slug(key)
            found = None
            for i, p in enumerate(pages, start=1):
                if token in re.sub(r'\s+', '', p):
                    found = i
                    break
            numbers[key] = found
    return numbers

def build_interior_pdf(vol_dir, title, tagline, sections, out_dir, grayscale=True):
    pass1_html = os.path.join(out_dir, 'interior_pass1.html')
    pass1_pdf = os.path.join(out_dir, 'interior_pass1.pdf')
    pass1_doc = build_print_doc(title, tagline, sections)
    if grayscale:
        pass1_doc = grayscale_data_uris(pass1_doc)
    open(pass1_html, 'w').write(pass1_doc)
    chrome_print_pdf(pass1_html, pass1_pdf)
    toc_numbers = resolve_toc_numbers(pass1_pdf, sections)

    final_html = os.path.join(out_dir, 'interior_final.html')
    final_pdf = os.path.join(out_dir, 'interior.pdf')
    final_doc = build_print_doc(title, tagline, sections, toc_numbers)
    if grayscale:
        final_doc = grayscale_data_uris(final_doc)
    open(final_html, 'w').write(final_doc)
    chrome_print_pdf(final_html, final_pdf)
    import json as _json
    pages_cmd = subprocess.run(['pdfinfo', final_pdf], capture_output=True, text=True).stdout
    m = re.search(r'Pages:\s+(\d+)', pages_cmd)
    page_count = int(m.group(1)) if m else None
    return final_pdf, page_count


# ------------------------------------------------------------- wraparound

def build_wraparound_cover(vol_dir, page_count, out_path, color_interior=False):
    factor = 0.002347 if color_interior else 0.002252
    spine_in = round(page_count * factor, 4)
    spine_px = round(spine_in * 300)
    bleed_px = 38
    trim_px = 1800
    total_w = bleed_px * 2 + trim_px * 2 + spine_px
    total_h = bleed_px * 2 + 2700

    tpl = open(os.path.join(HERE, 'wraparound_template.html')).read()
    tpl = tpl.replace('AUTHOR_NAME', AUTHOR)
    tpl = tpl.replace('width:3759px;height:2776px', f'width:{total_w}px;height:{total_h}px')
    tpl = tpl.replace('width:3759px;height:2776px;background', f'width:{total_w}px;height:{total_h}px;background')
    tpl = re.sub(r'width:3759px', f'width:{total_w}px', tpl)
    tpl = re.sub(r'height:2776px', f'height:{total_h}px', tpl)
    tpl = tpl.replace('left:1838px;width:83px', f'left:{bleed_px+trim_px}px;width:{spine_px}px')
    tpl = tpl.replace('left:1921px', f'left:{bleed_px+trim_px+spine_px}px')

    html_path = out_path + '.html'
    open(html_path, 'w').write(tpl)
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--hide-scrollbars',
                     '--force-device-scale-factor=1', f'--window-size={total_w},{total_h}',
                     f'--screenshot={out_path}', f'file://{html_path}'], check=True, capture_output=True)
    return out_path, spine_in


# ------------------------------------------------------------------- epub

EPUB_CSS = '''
body{font-family:Georgia,serif;line-height:1.5;margin:0 5%;}
h1{font-family:Georgia,serif;font-weight:bold;font-size:1.6em;margin:0.6em 0 0.2em;}
h1 .chap-num{display:block;font-family:Helvetica,Arial,sans-serif;font-weight:bold;color:#C47F00;font-size:0.5em;letter-spacing:2px;margin-bottom:0.3em;}
h2{color:#1B4F8A;font-size:1.25em;margin:1.2em 0 0.4em;}
h3{font-size:1.05em;margin:1em 0 0.3em;}
p.subtitle{font-style:italic;color:#1B4F8A;margin:0 0 0.8em;}
p.lead{font-size:1.05em;}
p.mini-title{font-weight:bold;margin:1em 0 0.1em;}
p.mini-tagline{font-style:italic;color:#1B4F8A;margin:0 0 0.6em;}
.callout{border-left:4px solid #1B4F8A;background:#f3f6fb;padding:0.6em 0.8em;margin:0.8em 0;}
.callout-label{display:block;font-weight:bold;font-size:0.8em;letter-spacing:1px;text-transform:uppercase;color:#1B4F8A;margin-bottom:0.2em;}
.callout.callout-warning{border-color:#C47F00;background:#fbf3e6;}
.callout.callout-warning .callout-label{color:#C47F00;}
.scam-example{border:1px solid #ddd;border-radius:6px;padding:0.5em 0.7em;margin:0.7em 0;background:#fafafa;}
.scam-from{display:block;font-weight:bold;font-size:0.8em;color:#777;margin-bottom:0.2em;}
img{max-width:100%;height:auto;display:block;margin:0.8em auto 0.1em;}
p.img-caption{text-align:center;font-size:0.8em;color:#777;margin:0 0 0.8em;}
table{width:100%;border-collapse:collapse;font-size:0.9em;}
th,td{border:1px solid #ddd;padding:0.3em 0.5em;text-align:left;}
th{background:#eef2f7;}
.titlepage{text-align:center;margin-top:30%;}
.titlepage .kicker{color:#C47F00;font-weight:bold;letter-spacing:3px;font-size:0.9em;}
.titlepage h1{font-size:2.2em;margin:0.3em 0;}
.titlepage .tagline{font-style:italic;color:#1B4F8A;}
.titlepage .author{font-weight:bold;margin-top:2em;}
.titlepage .site{color:#777;font-size:0.8em;letter-spacing:2px;}
.copyright{font-size:0.85em;color:#444;}
'''

NAMED_ENTITY_MAP = {
    '&ldquo;': '&#8220;', '&rdquo;': '&#8221;', '&lsquo;': '&#8216;', '&rsquo;': '&#8217;',
    '&middot;': '&#183;', '&rsaquo;': '&#8250;', '&lsaquo;': '&#8249;', '&times;': '&#215;',
    '&nbsp;': '&#160;', '&bull;': '&#8226;', '&mdash;': '&#8212;', '&ndash;': '&#8211;', '&hellip;': '&#8230;',
}
DATA_URI_RE = re.compile(r'src="data:image/(png|jpeg|jpg);base64,([^"]+)"')

def build_epub(vol_dir, title, tagline, sections, out_path, cover_png_path):
    build_dir = out_path + '_build'
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)
    img_dir = os.path.join(build_dir, 'OEBPS', 'images')
    os.makedirs(img_dir, exist_ok=True)
    os.makedirs(os.path.join(build_dir, 'META-INF'), exist_ok=True)

    img_cache = {}
    img_counter = [0]
    def replace_images(htmlstr):
        def repl(m):
            ext, b64 = m.group(1), m.group(2)
            key = hashlib.sha1(b64.encode()).hexdigest()
            if key not in img_cache:
                img_counter[0] += 1
                fname = f'img{img_counter[0]:03d}.jpg'
                # Downscale and recompress for e-reader display: these are
                # 1284x2778 source screenshots, far more than an e-reader
                # needs, and PNG at that size inflates KDP's per-MB Kindle
                # delivery fee for no visible benefit on screen.
                img = Image.open(io.BytesIO(base64.b64decode(b64))).convert('RGB')
                if img.width > 600:
                    new_h = round(img.height * 600 / img.width)
                    img = img.resize((600, new_h), Image.LANCZOS)
                img.save(os.path.join(img_dir, fname), format='JPEG', quality=82, optimize=True)
                img_cache[key] = fname
            return f'src="images/{img_cache[key]}"'
        return DATA_URI_RE.sub(repl, htmlstr)

    def xhtmlify(fragment):
        frag = re.sub(r'<(img|hr|br)([^>]*?)(?<!/)>', r'<\1\2/>', fragment)
        for named, numeric in NAMED_ENTITY_MAP.items():
            frag = frag.replace(named, numeric)
        return frag

    HEAD = '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.w3.org/2007/ops">\n<head><meta charset="utf-8"/><title>{title}</title><link rel="stylesheet" type="text/css" href="styles.css"/></head>\n<body>\n'
    FOOT = '</body></html>'
    chapter_files = []
    def write_chapter(fname, title_label, body_html, cls=''):
        content = HEAD.format(title=_html.escape(title_label)) + f'<section class="{cls}">' + body_html + '</section>\n' + FOOT
        open(os.path.join(build_dir, 'OEBPS', fname), 'w', encoding='utf-8').write(content)
        chapter_files.append((fname, title_label))

    write_chapter('title.xhtml', title, f'<div class="titlepage"><p class="kicker">SFINCO GUIDES &#183; SERIES 1</p><h1>{_html.escape(title)}</h1><p class="tagline">{_html.escape(tagline)}</p><p class="author">{AUTHOR}</p><p class="site">SFINCO.COM.AU</p></div>', 'titlepage')
    write_chapter('copyright.xhtml', 'Copyright', f'''<div class="copyright">
<p><strong>{_html.escape(title)}</strong><br/>Sfinco Guides, Volume 1 of 8</p>
<p>First published {YEAR} by Sfinco.</p>
<p>Copyright &#169; {YEAR} {AUTHOR} / Sfinco. All rights reserved.</p>
<p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations used in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
<p>The information in this book is provided for general guidance only and does not constitute professional legal, financial, or cybersecurity advice. Readers should seek advice appropriate to their own circumstances from a qualified professional before acting on anything in this book.</p>
<p>Sfinco &#183; Sunshine Coast, Queensland, Australia &#183; sfinco.com.au</p>
</div>''')
    toc_html = '<div class="toc"><h1>Contents</h1><ul>' + ''.join(f'<li>{_html.escape(s["label"])}</li>' for s in sections) + '</ul></div>'
    write_chapter('contents.xhtml', 'Contents', toc_html)

    for idx, sec in enumerate(sections):
        body = xhtmlify(replace_images(''.join(sec['html'])))
        write_chapter(f'sec{idx:02d}.xhtml', sec['label'], body, 'chapter')

    open(os.path.join(build_dir, 'OEBPS', 'styles.css'), 'w').write(EPUB_CSS)
    open(os.path.join(build_dir, 'META-INF', 'container.xml'), 'w').write('''<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>''')

    shutil.copy(cover_png_path, os.path.join(img_dir, 'cover.png'))
    all_files = [('title.xhtml', 'Title'), ('copyright.xhtml', 'Copyright'), ('contents.xhtml', 'Contents')] + chapter_files[3:]
    manifest_items = [f'<item id="{f.replace(".xhtml","")}" href="{f}" media-type="application/xhtml+xml"/>' for f, _ in all_files]
    spine_items = [f'<itemref idref="{f.replace(".xhtml","")}"/>' for f, _ in all_files]
    img_manifest = []
    for key, fname in img_cache.items():
        ext = fname.rsplit('.', 1)[1]
        mt = 'image/png' if ext == 'png' else 'image/jpeg'
        img_manifest.append(f'<item id="{fname}" href="images/{fname}" media-type="{mt}"/>')

    opf = f'''<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">sfinco-vol1-iphone-protection</dc:identifier>
    <dc:title>{_html.escape(title)}</dc:title>
    <dc:creator>{AUTHOR}</dc:creator>
    <dc:language>en-AU</dc:language>
    <dc:publisher>Sfinco</dc:publisher>
    <dc:date>{YEAR}-01-01</dc:date>
    <meta property="dcterms:modified">{YEAR}-01-01T00:00:00Z</meta>
    <meta name="cover" content="cover-img"/>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="cover-img" href="images/cover.png" media-type="image/png" properties="cover-image"/>
    {''.join(manifest_items)}
    {''.join(img_manifest)}
    <item id="css" href="styles.css" media-type="text/css"/>
  </manifest>
  <spine>{''.join(spine_items)}</spine>
</package>'''
    open(os.path.join(build_dir, 'OEBPS', 'content.opf'), 'w').write(opf)

    nav_items = ''.join(f'<li><a href="{f}">{_html.escape(t)}</a></li>' for f, t in all_files)
    nav = f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.w3.org/2007/ops">
<head><meta charset="utf-8"/><title>Navigation</title></head>
<body><nav epub:type="toc" id="toc"><h1>Table of Contents</h1><ol>{nav_items}</ol></nav></body></html>'''
    open(os.path.join(build_dir, 'OEBPS', 'nav.xhtml'), 'w').write(nav)

    if os.path.exists(out_path):
        os.remove(out_path)
    zf = zipfile.ZipFile(out_path, 'w')
    zf.writestr('mimetype', 'application/epub+zip', compress_type=zipfile.ZIP_STORED)
    for root, dirs, files in os.walk(build_dir):
        for fn in files:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, build_dir)
            zf.write(full, rel, compress_type=zipfile.ZIP_DEFLATED)
    zf.close()
    return out_path


if __name__ == '__main__':
    manuscript_root, vol_num_s, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]
    vol_num = int(vol_num_s)
    vol_dir = os.path.join(manuscript_root, f'vol{vol_num}')
    os.makedirs(out_dir, exist_ok=True)

    title, tagline, meta, sections = parse_sections(vol_dir, vol_num)
    interior_pdf, page_count = build_interior_pdf(vol_dir, title, tagline, sections, out_dir)
    print(f'Interior PDF: {interior_pdf} ({page_count} pages)')

    cover_png = os.path.join(vol_dir, 'cover', 'front-cover.png')
    wrap_path, spine_in = build_wraparound_cover(vol_dir, page_count, os.path.join(out_dir, 'wraparound-cover.png'))
    print(f'Wraparound cover: {wrap_path} (spine {spine_in:.4f} in at {page_count} pages)')

    epub_path = build_epub(vol_dir, title, tagline, sections, os.path.join(out_dir, f'Sfinco_Vol{vol_num}_{title.replace(" ", "_")}.epub'), cover_png)
    print(f'EPUB: {epub_path}')
