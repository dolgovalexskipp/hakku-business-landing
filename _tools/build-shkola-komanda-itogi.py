#!/usr/bin/env python3
"""Сборка пост-ридинга школы «Команда» (business.hakku.ai/shkola-komanda-itogi/).

Источник правды — vault:
  Dolgov-AI/Workshops/komanda-2026-09/postreading_page_source_v2.html  (страница, маркеры <!--MD--> и <!--PHONE-->)
  Dolgov-AI/Workshops/komanda-2026-09/postreading_dlya_ii_v1.md         (файл для ИИ, вшивается в #md-skill)

Шаги: склейка → _materials_src/shkola-komanda-itogi.html → encrypt-page.cjs (пароль школы)
→ патч гейта: отдельный ключ localStorage школы, тексты замка, без ссылки «вступить».

Запуск:  python3 _tools/build-shkola-komanda-itogi.py [--phone "+7 ..."]
"""
import argparse, pathlib, re, subprocess, sys

REPO = pathlib.Path(__file__).resolve().parent.parent
VAULT = pathlib.Path.home() / "Documents/Sasha_Jopa_OS/Dolgov-AI/Workshops/komanda-2026-09"
SRC_HTML = VAULT / "postreading_page_source_v2.html"
SRC_MD = VAULT / "postreading_dlya_ii_v1.md"
MERGED = REPO / "_materials_src/shkola-komanda-itogi.html"
OUT = REPO / "shkola-komanda-itogi/index.html"
PASSWORD = "komanda-sentyabr-2026"
LS_KEY = "hakku_shkola_komanda_pw"

ap = argparse.ArgumentParser()
ap.add_argument("--phone", default="", help="номер телефона для карточки контактов, например '+7 900 000-00-00'")
args = ap.parse_args()

html = SRC_HTML.read_text(encoding="utf-8")
md = SRC_MD.read_text(encoding="utf-8")
if "</script" in md:
    sys.exit("ERROR: .md содержит '</script' — нельзя вшить в raw-text <script>")
if "<!--MD-->" not in html:
    sys.exit("ERROR: в исходнике нет маркера <!--MD-->")
html = html.replace("<!--MD-->", "\n" + md + "\n")

if args.phone:
    tel = re.sub(r"[^\d+]", "", args.phone)
    card = ('<div class="cc"><div class="ck">Телефон</div><div class="cv"><a href="tel:%s">%s</a></div>'
            '<div class="cd">Звонок или сообщение в мессенджер по этому номеру.</div></div>' % (tel, args.phone))
    html = html.replace("<!--PHONE-->", card)
else:
    html = html.replace("<!--PHONE-->", "")

MERGED.write_text(html, encoding="utf-8")
(REPO / "_materials_src/shkola-komanda-itogi-dlya-ii.md").write_text(md, encoding="utf-8")

OUT.parent.mkdir(exist_ok=True)
subprocess.run(["node", str(REPO / "_tools/encrypt-page.cjs"), str(MERGED), PASSWORD, str(OUT)], check=True, cwd=REPO)

out = OUT.read_text(encoding="utf-8")
n0 = out.count("hakku_os_pw")
out = out.replace("'hakku_os_pw'", "'%s'" % LS_KEY)
out = out.replace("Дальше — для участников</div>", "Дальше — для участников школы</div>")
out = re.sub(r'<p class="lock-hint">.*?</p>',
             '<p class="lock-hint">Слайды, промпты, шаблоны и файл для вашего ИИ открываются паролем школы — тем же, что у пре-ридинга.</p>',
             out, count=1, flags=re.S)
out = re.sub(r'\s*<a href="https://t\.me/hakkuai_business_bot" class="lock-join">[^<]*</a>', "", out, count=1)
OUT.write_text(out, encoding="utf-8")

assert "hakku_os_pw" not in out, "ключ сообщества остался"
assert "lock-join" not in out.split("gated-content")[0] or 'class="lock-join"' not in out, "ссылка вступления осталась"
print("OK: %s · ключ %s (замен: %d) · %.1f KB" % (OUT.relative_to(REPO), LS_KEY, n0, len(out.encode()) / 1024))
