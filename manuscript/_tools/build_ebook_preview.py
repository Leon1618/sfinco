#!/usr/bin/env python3
"""Rebuild the Sfinco Guides e-book preview HTML from current manuscript source."""
import re, os, sys, base64, mimetypes

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def esc_attr(s):
    return esc(s).replace('"', '&quot;')

def read_blocks(path):
    text = open(path, encoding='utf-8').read().replace('\r\n', '\n')
    raw = re.split(r'\n\s*\n+', text.strip())
    return [b for b in (r.strip('\n') for r in raw) if b.strip()]

CALLOUT_MAP = {
    'SOUNDS FAMILIAR?': ('callout-real-story', 'Sounds familiar?'),
    'REAL STORY': ('callout-real-story', 'Real story'),
    'DID YOU KNOW?': ('callout-info', 'Did you know?'),
    'NOTE': ('callout-info', 'Note'),
    'WARNING': ('callout-warning', 'Warning'),
    'CRITICAL': ('callout-warning', 'Critical'),
    'TIP': ('callout-tip', 'Tip'),
    'WELL DONE': ('callout-tip', 'Well done'),
    'IMPORTANT': ('callout-warning', 'Important'),
}

def classify_label(label):
    stripped = label.strip()
    key = stripped.upper()
    if key in CALLOUT_MAP:
        return CALLOUT_MAP[key]
    for cand, (css, _disp) in CALLOUT_MAP.items():
        if key.startswith(cand):
            return (css, stripped.capitalize())
    return ('callout-info', stripped.capitalize())

KNOWN_LABELS = sorted(CALLOUT_MAP.keys(), key=len, reverse=True)

def split_known_label(rest):
    rest = rest.strip()
    upper = rest.upper()
    for cand in KNOWN_LABELS:
        if upper.startswith(cand):
            return cand, rest[len(cand):].strip()
    return None, rest

KICKER_RE = re.compile(r'^Sfinco(\s+Guides)?\s*(·|\s{2,})')
SYMBOLS = '▶ℹ⚠✓✔★✶'

def is_plain_single_line(b):
    lines = b.split('\n')
    if len(lines) != 1:
        return False
    first = lines[0].strip()
    if not first:
        return False
    if first.startswith(('#', '>', '|', '!', '---')):
        return False
    if KICKER_RE.match(first) and len(first) < 70:
        return False
    if re.match(r'^\*(.+)\*$', first) or re.match(r'^\*\*(.+?)\*\*$', first):
        return False
    return True

def is_fragment_line(text):
    t = text.rstrip()
    return not re.search(r'[.!?]["\')]*$', t)

def embed_image(vol_dir, src):
    path = os.path.join(vol_dir, src)
    mime = mimetypes.guess_type(path)[0] or 'image/png'
    data = open(path, 'rb').read()
    b64 = base64.b64encode(data).decode('ascii')
    return f'data:{mime};base64,{b64}'

def parse_cover(vol_dir):
    blocks = read_blocks(os.path.join(vol_dir, '00_CoverSheet.md'))
    joined = '\n\n'.join(blocks)
    parts = joined.split('---')
    top = parts[0].strip().split('\n\n')
    top = [p.strip() for p in top if p.strip()]
    title = top[2] if len(top) > 2 else ''
    tagline = top[3] if len(top) > 3 else ''
    meta = {}
    if len(parts) > 1:
        for line in parts[1].strip().split('\n'):
            line = line.strip()
            if not line or ':' not in line:
                continue
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
    if title.isupper():
        title = title.title()
        title = re.sub(r'\bIphone\b', 'iPhone', title)
    return title, tagline, meta

def render_body(vol_dir, files, vol_num, vol_title):
    pages = []
    for fname in files:
        path = os.path.join(vol_dir, fname)
        if not os.path.exists(path):
            continue
        blocks = read_blocks(path)
        is_chapter = re.match(r'^0[1-8]_Chapter', fname)
        chap_num = re.match(r'^0([1-8])_Chapter', fname)
        chap_num = chap_num.group(1).zfill(2) if chap_num else None
        file_kind = 'front' if fname == '00_FrontMatter.md' else ('back' if fname == '09_BackMatter.md' else None)

        current = None
        seen_h1 = False
        awaiting_lead = False
        i, n = 0, len(blocks)
        while i < n:
            b = blocks[i]
            lines = b.split('\n')
            first = lines[0].strip()

            is_kicker_line = bool(KICKER_RE.match(first)) and len(first) < 70 and len(lines) == 1
            if is_kicker_line and i + 1 < n:
                if current:
                    pages.append(current)
                current = {'id': f"p{len(pages)}", 'label': None, 'sub': None, 'chap': chap_num if is_chapter else None, 'kind': file_kind, 'html': []}
                current['html'].append(f'<p class="kicker">{esc(first)}</p>')
                seen_h1 = False
                awaiting_lead = False
                i += 1
                continue
            if is_kicker_line and i + 1 >= n:
                if current is None:
                    current = {'id': f"p{len(pages)}", 'label': None, 'sub': None, 'chap': chap_num if is_chapter else None, 'kind': file_kind, 'html': []}
                current['html'].append(f'<p class="kicker">{esc(first)}</p>')
                i += 1
                continue

            if current is None:
                current = {'id': f"p{len(pages)}", 'label': None, 'sub': None, 'chap': chap_num if is_chapter else None, 'kind': file_kind, 'html': []}

            m = re.match(r'^(#{1,4})\s+(.*)$', first)
            if m and len(lines) == 1:
                level = len(m.group(1))
                text = m.group(2).strip()
                if level == 3 and not seen_h1 and not any('<h1' in h for h in current['html']):
                    current['html'].append(f'<p class="mini-title">{esc(text)}</p>')
                    i += 1
                    if i < n and '\n' not in blocks[i] and len(blocks[i]) < 200:
                        current['html'].append(f'<p class="mini-tagline">{esc(blocks[i].strip())}</p>')
                        i += 1
                    continue
                if level == 1:
                    if current['chap']:
                        current['html'].append(f'<h1><span class="chap-num">{current["chap"]}</span>{esc(text)}</h1>')
                    else:
                        current['html'].append(f'<h1>{esc(text)}</h1>')
                    seen_h1 = True
                    awaiting_lead = True
                    if current['label'] is None:
                        current['label'] = text
                elif level == 2:
                    current['html'].append(f'<h2>{esc(text)}</h2>')
                else:
                    current['html'].append(f'<h3>{esc(text)}</h3>')
                i += 1
                continue

            if first == '---':
                current['html'].append('<hr>')
                i += 1
                continue

            sm = re.match(r'^\*\*(.+?)\*\*$', first)
            if sm and len(lines) == 1 and i + 1 < n:
                nb = blocks[i + 1].strip()
                qm = re.match(r'^>\s*"(.+)"\s*$', nb, re.S)
                if qm:
                    current['html'].append(
                        f'<div class="scam-example"><span class="scam-from">{esc(sm.group(1))}</span><p>&ldquo;{esc(qm.group(1))}&rdquo;</p></div>'
                    )
                    i += 2
                    continue

            m = re.match(r'^!\[(.*?)\]\((.*?)\)$', first)
            if m and len(lines) == 1:
                alt, src = m.group(1), m.group(2)
                uri = embed_image(vol_dir, src)
                current['html'].append(f'<img class="manuscript-img" src="{uri}" alt="{esc_attr(alt)}">')
                i += 1
                if i < n:
                    nb = blocks[i].strip()
                    cm = re.match(r'^\*(.+)\*$', nb, re.S)
                    if cm and '\n' not in nb:
                        current['html'].append(f'<p class="img-caption">{esc(cm.group(1))}</p>')
                        i += 1
                    elif '\n' not in nb and not nb.startswith(('#', '>', '|', '!', '---')):
                        current['html'].append(f'<p class="img-caption">{esc(nb)}</p>')
                        i += 1
                continue

            if first.startswith('>'):
                callout_lines = [l[1:].strip() if l.startswith('>') else l.strip() for l in lines]
                label_text = None
                body_lines = []
                for l in callout_lines:
                    if not l:
                        continue
                    lm = re.match(r'^\*\*(.+?)\*\*$', l)
                    if lm and label_text is None:
                        raw_label = re.sub(r'^[^A-Za-z]+', '', lm.group(1)).strip()
                        label_text = raw_label
                        continue
                    im = re.match(r'^\*(.+?)\*$', l)
                    if im:
                        body_lines.append(('em', im.group(1)))
                    else:
                        body_lines.append(('p', l))
                css_class, label_disp = classify_label(label_text or '')
                body_html = ''.join(f'<p>{esc(t)}</p>' for kind, t in body_lines)
                current['html'].append(
                    f'<div class="callout {css_class}"><span class="callout-label">{esc(label_disp)}</span>{body_html}</div>'
                )
                i += 1
                continue

            pm = re.match(r'^\|\s*([' + SYMBOLS + r']+)\s+(.*)\|\s*$', b, re.S)
            if pm and len(lines) == 1:
                _, rest = pm.groups()
                label, body = split_known_label(rest)
                css_class, label_disp = classify_label(label or '')
                current['html'].append(
                    f'<div class="callout {css_class}"><span class="callout-label">{esc(label_disp)}</span><p>{esc(body)}</p></div>'
                )
                i += 1
                continue

            smp = re.match(r'^\|\s*([^|]+?)\s*\|\s*$', b) if len(lines) == 1 else None
            if smp and i + 1 < n:
                nxt = blocks[i + 1]
                nxt_lines = nxt.split('\n')
                smp2 = re.match(r'^\|\s*([^|]+?)\s*\|\s*$', nxt) if len(nxt_lines) == 1 else None
                if smp2:
                    current['html'].append(
                        f'<div class="scam-example"><span class="scam-from">{esc(smp.group(1))}</span><p>{esc(smp2.group(1))}</p></div>'
                    )
                    i += 2
                    if i < n:
                        nb = blocks[i].strip()
                        cm = re.match(r'^\*(.+)\*$', nb, re.S)
                        if cm and '\n' not in nb:
                            current['html'].append(f'<p class="img-caption">{esc(cm.group(1))}</p>')
                            i += 1
                    continue
            if smp:
                current['html'].append(f'<p>{esc(smp.group(1))}</p>')
                i += 1
                continue

            if len(lines) >= 2 and lines[0].strip().startswith('|') and re.match(r'^\|?\s*-+\s*(\|\s*-+\s*)+\|?\s*$', lines[1].strip()):
                header_cells = [c.strip() for c in lines[0].strip().strip('|').split('|')]
                rows = []
                for l in lines[2:]:
                    if not l.strip():
                        continue
                    cells = [c.strip() for c in l.strip().strip('|').split('|')]
                    rows.append(cells)
                thead = ''.join(f'<th>{esc(c)}</th>' for c in header_cells)
                tbody = ''.join('<tr>' + ''.join(f'<td>{esc(c)}</td>' for c in row) + '</tr>' for row in rows)
                is_checklist = bool(rows) and all(row and row[0].strip() in ('☐', '☑', '✓', '✔') for row in rows)
                wrap_cls = 'table-wrap table-checklist' if is_checklist else 'table-wrap'
                current['html'].append(f'<div class="{wrap_cls}"><table><thead><tr>{thead}</tr></thead><tbody>{tbody}</tbody></table></div>')
                i += 1
                continue

            if current['html'] and '<h1' in current['html'][-1] and len(lines) == 1 and len(first) < 220:
                current['sub'] = first
                current['html'].append(f'<p class="subtitle">{esc(first)}</p>')
                i += 1
                continue

            spm = re.match(r'^Settings path(?:\s*\([^)]*\))?:\s*(.+)$', first) if len(lines) == 1 else None
            if spm:
                crumbs = [c.strip().rstrip('.') for c in re.split(r'\s*>\s*', spm.group(1)) if c.strip()]
                crumb_html = '<span class="crumb-sep">&rsaquo;</span>'.join(f'<span class="crumb">{esc(c)}</span>' for c in crumbs)
                current['html'].append(f'<p class="settings-path">{crumb_html}</p>')
                awaiting_lead = False
                i += 1
                continue

            fm = re.match(r'^(\*|!)\s*\s*([A-Z][A-Z ]*?):\s*\s*(.+?)\*?$', first) if len(lines) == 1 else None
            if fm and (first.startswith('*') or first.startswith('!')):
                label_raw = fm.group(2).strip()
                body_raw = fm.group(3).strip()
                if body_raw.endswith('*'):
                    body_raw = body_raw[:-1].strip()
                css_class, label_disp = classify_label(label_raw)
                current['html'].append(
                    f'<div class="callout {css_class}"><span class="callout-label">{esc(label_disp)}</span><p>{esc(body_raw)}</p></div>'
                )
                awaiting_lead = False
                i += 1
                continue

            sfm = re.match(r'^[' + SYMBOLS + r']\s+([A-Z][A-Z ]*?):\s*\s*(.+)$', first) if len(lines) == 1 else None
            if sfm:
                css_class, label_disp = classify_label(sfm.group(1).strip())
                current['html'].append(
                    f'<div class="callout {css_class}"><span class="callout-label">{esc(label_disp)}</span><p>{esc(sfm.group(2).strip())}</p></div>'
                )
                awaiting_lead = False
                i += 1
                continue

            nm = re.match(r'^(\d+)\.\s+([^\n]+?)\s*$', first) if len(lines) == 1 else None
            if nm and len(first) < 120 and not first.endswith(('.', '!', '?')):
                current['html'].append(
                    f'<h4 class="numbered"><span class="num-badge">{nm.group(1)}</span>{esc(nm.group(2))}</h4>'
                )
                awaiting_lead = False
                i += 1
                continue

            if is_plain_single_line(b) and is_fragment_line(first):
                run = [first]
                j = i + 1
                while j < n:
                    nb = blocks[j]
                    if is_plain_single_line(nb):
                        nfirst = nb.strip()
                        if is_fragment_line(nfirst):
                            run.append(nfirst)
                            j += 1
                            continue
                    break
                if len(run) >= 2:
                    current['html'].append('<ul>' + ''.join(f'<li>{esc(x)}</li>' for x in run) + '</ul>')
                    awaiting_lead = False
                    i = j
                    continue

            joined = ' '.join(l.strip() for l in lines if l.strip())
            cls = ''
            if awaiting_lead:
                cls = ' class="lead"'
                awaiting_lead = False
            current['html'].append(f'<p{cls}>{esc(joined)}</p>')
            i += 1

        if current:
            pages.append(current)
            current = None

    return pages

def build_volume(vol_dir, vol_num):
    title, tagline, meta = parse_cover(vol_dir)
    files = ['00_FrontMatter.md'] + [f'0{n}_Chapter{n}.md' for n in range(1, 9)] + ['09_BackMatter.md']
    pages = render_body(vol_dir, files, vol_num, title)

    toc_entries = []
    seen_chap_nums = {}
    seen_kind = set()
    for idx, p in enumerate(pages):
        if p['chap']:
            cn = int(p['chap'])
            if cn not in seen_chap_nums:
                seen_chap_nums[cn] = 0
                p['id'] = f'ch{cn}'
                toc_entries.append((p['id'], f"Chapter {cn}", p['sub'] or ''))
            else:
                seen_chap_nums[cn] += 1
                p['id'] = f'ch{cn}-{seen_chap_nums[cn] + 1}'
        elif p.get('kind') == 'front':
            if 'front' not in seen_kind:
                seen_kind.add('front')
                p['id'] = 'front'
                toc_entries.append((p['id'], 'Front Matter', ''))
            else:
                p['id'] = f'front-{idx}'
        elif p.get('kind') == 'back':
            if 'back' not in seen_kind:
                seen_kind.add('back')
                p['id'] = 'back'
                toc_entries.append((p['id'], 'Back Matter', ''))
            else:
                p['id'] = f'back-{idx}'
        elif idx == len(pages) - 1:
            p['id'] = 'back'
        else:
            p['id'] = f'sec{idx}'

    total_pages = len(pages) + 1

    here = os.path.dirname(os.path.abspath(__file__))
    css = open(os.path.join(here, 'style.css'), encoding='utf-8').read()
    js = open(os.path.join(here, 'app.js'), encoding='utf-8').read()

    cover_rows = ''
    field_order = ['Author', 'Series', 'Volume', 'Category', 'Format', 'Audience', 'Region', 'Publisher', 'Brand colours', 'Website']
    for f in field_order:
        if f in meta:
            cover_rows += f'<tr><th>{esc(f)}</th><td>{esc(meta[f])}</td></tr>'

    toc_html = ''
    for pid, label, sub in toc_entries:
        sub_html = f'<span class="toc-sub">{esc(sub)}</span>' if sub else ''
        toc_html += f'<a href="#{pid}" class="toc-link" data-id="{pid}"><span class="toc-label">{esc(label)}</span>{sub_html}</a>'
    toc_html = '<a href="#cover" class="toc-link" data-id="cover"><span class="toc-label">Cover</span></a>' + toc_html

    body_pages_html = ''
    for i, p in enumerate(pages):
        cls = 'page chapter' if p['chap'] else 'page'
        folio = f'<div class="page-footer"><span>Sfinco Guides &middot; Vol. {vol_num}</span><span>Page {i+2} of {total_pages}</span></div>'
        body_pages_html += f'<section id="{p["id"]}" class="{cls}">' + ''.join(p['html']) + folio + '</section>\n'

    html_out = f'''<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{{color-scheme:light}}body{{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}}img{{max-width:100%}}[hidden]:not([hidden=until-found]){{display:none!important}}</style></head><body>
<meta charset="UTF-8">
<title>Sfinco Guides &middot; Vol. {vol_num}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
{css}
</style>

<header class="topbar">
  <div class="mark">Sfinco Guides<small>Vol. {vol_num} &middot; {esc(title)}</small></div>
  <button id="tocToggle" class="toc-toggle" aria-expanded="false" aria-controls="tocDrawer">
    <span class="toc-icon">&#9776;</span> Contents
  </button>
</header>
<div class="progress-track"><div id="progressFill" class="progress-fill"></div></div>

<div id="tocBackdrop" class="toc-backdrop"></div>
<nav id="tocDrawer" class="toc-drawer" aria-hidden="true" aria-label="Table of contents">
  <div class="toc-drawer-head">
    <span>Contents</span>
    <button id="tocClose" class="toc-close" aria-label="Close contents">&times;</button>
  </div>
  <div class="toc-links">{toc_html}</div>
</nav>

<main>
<section id="cover" class="cover">
<div class="cover-badge">Sfinco Guides &middot; Series {1 if vol_num <= 5 else 2}, Vol. {vol_num} of 8</div>
<h1 class="cover-title">{esc(title.upper())}</h1>
<p class="cover-tagline">{esc(tagline)}</p>
<div class="cover-meta"><table>{cover_rows}</table></div>
<div class="page-footer"><span>Sfinco Guides &middot; Vol. {vol_num}</span><span>Page 1 of {total_pages}</span></div></section>
{body_pages_html}
</main>
<script>
{js}
</script>
</body></html>'''

    html_out = re.sub(
        r'>([^<]*)<',
        lambda m: '>' + re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', m.group(1)) + '<',
        html_out,
    )
    return html_out

if __name__ == '__main__':
    manuscript_root = sys.argv[1]
    vol_num = int(sys.argv[2])
    out_path = sys.argv[3]
    vol_dir = os.path.join(manuscript_root, f'vol{vol_num}')
    html_out = build_volume(vol_dir, vol_num)
    open(out_path, 'w', encoding='utf-8').write(html_out)
    print(f'wrote {out_path}: {len(html_out)} bytes, em-dash count: {html_out.count(chr(0x2014))}')
