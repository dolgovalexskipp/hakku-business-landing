#!/usr/bin/env node
// Диагностические анкеты компаний перед корпоративным обучением.
// Вопросы и списки под компании — в _materials_src/diagnostika/spec.mjs (gitignored, репо публичный).
// Сюда попадает только движок: открытая шапка + пароль, всё остальное (название компании,
// вопросы) — AES-GCM (PBKDF2-SHA256 100k), как у encrypt-page.cjs. Ответы → /shkola-api/diag.
//
// Usage: node _tools/build-diagnostika.mjs            — собрать все страницы из spec
//        node _tools/build-diagnostika.mjs --plain    — плюс открытые копии в _materials_src/diagnostika/out/ для проверки

import fs from 'node:fs';
import path from 'node:path';
import { webcrypto as crypto } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SPEC = path.join(ROOT, '_materials_src/diagnostika/spec.mjs');
const PLAIN = process.argv.includes('--plain');

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function encrypt(plaintext, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const km = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    km, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  const b64 = buf => Buffer.from(buf).toString('base64');
  return { salt: b64(salt), iv: b64(iv), ct: b64(ct) };
}

// ---------- поля ----------

const lab = (q, forId) => `<label class="flab"${forId ? ` for="${forId}"` : ''}>${q.n ? `<span class="qn">${esc(q.n)}.</span> ` : ''}${esc(q.label)} ${q.req ? '<span class="req">*</span>' : '<span class="opt">необязательно</span>'}</label>${q.hint ? `<div class="fhint">${esc(q.hint)}</div>` : ''}`;

function otherInput(q) {
  return q.other ? `<input class="fin fother" name="${q.id}_other" maxlength="300" placeholder="${esc(q.other === true ? 'Другое — впишите' : q.other)}">` : '';
}

function field(q) {
  const req = q.req ? ' required' : '';
  switch (q.type) {
    case 'text':
      return `<div class="fgroup">${lab(q, q.id)}<input class="fin" id="${q.id}" name="${q.id}"${req} maxlength="${q.max || 300}"${q.ph ? ` placeholder="${esc(q.ph)}"` : ''}></div>`;
    case 'area':
      return `<div class="fgroup">${lab(q, q.id)}<textarea class="fin" id="${q.id}" name="${q.id}"${req} rows="${q.rows || 3}" maxlength="${q.max || 2500}"${q.ph ? ` placeholder="${esc(q.ph)}"` : ''}></textarea></div>`;
    case 'one':
    case 'many': {
      const t = q.type === 'one' ? 'radio' : 'checkbox';
      const opts = q.options.map((o, i) => `<label class="chip"><input type="${t}" name="${q.id}" value="${esc(o)}"${q.type === 'one' && q.req && i === 0 ? ' required' : ''}><span>${esc(o)}</span></label>`).join('');
      return `<div class="fgroup"${q.type === 'many' && q.req ? ` data-req-group="${q.id}"` : ''}>${lab(q)}<div class="chips">${opts}</div>${otherInput(q)}</div>`;
    }
    case 'level': {
      const opts = q.options.map((o, i) => `<label class="lvl"><input type="radio" name="${q.id}" value="${i + (q.start ?? 1)}"${q.req && i === 0 ? ' required' : ''}><span class="ln">${i + (q.start ?? 1)}</span><span class="lt">${esc(o)}</span></label>`).join('');
      return `<div class="fgroup">${lab(q)}<div class="levels">${opts}</div></div>`;
    }
    case 'matrix': {
      const rows = q.rows.map((r, ri) => {
        const name = `${q.id}_${ri + 1}`;
        const cells = q.cols.map((c, ci) => `<label class="pill"><input type="radio" name="${name}" value="${esc(c)}"${q.req && ci === 0 ? ' required' : ''}><span>${esc(c)}</span></label>`).join('');
        return `<div class="mrow"><div class="mlab">${esc(r)}</div><div class="pills">${cells}</div></div>`;
      }).join('');
      return `<div class="fgroup">${lab(q)}<div class="matrix">${rows}</div></div>`;
    }
    case 'group': // блок подполей: задача 1/2/3, шаг процесса и т.п.
      return `<div class="fgroup fbox">${lab(q)}${q.fields.map(f => field({ ...f, id: `${q.id}_${f.id}` })).join('')}</div>`;
    case 'note':
      return `<div class="fnote">${q.html}</div>`;
    default:
      throw new Error('unknown type ' + q.type);
  }
}

function section(s) {
  return `<div class="fsep">${esc(s.title)}</div>${s.lead ? `<p class="flead">${s.lead}</p>` : ''}${s.questions.map(field).join('\n')}`;
}

// ---------- страница ----------

const CSS = `
    body { background: var(--paper); color: var(--ink); margin: 0; }
    .wrap { max-width: 820px; margin: 0 auto; padding: 0 28px; }
    .mat-nav { position: sticky; top: 0; z-index: 40; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 28px; background: rgba(255,255,255,.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--ink-08); }
    .wm { font-family: var(--font-display); font-size: 18px; letter-spacing: -0.02em; display: inline-flex; align-items: center; gap: 9px; color: var(--ink); }
    .wm .sep { color: var(--ink-40); }
    .eyebrow-line { display: inline-flex; align-items: center; gap: 10px; }
    .eyebrow-line .bar { width: 22px; height: 3px; background: var(--grad-full); border-radius: 2px; }
    .lede2 { font-size: 18px; line-height: 1.58; color: var(--ink-72); }
    .mat-p { font-size: 16px; line-height: 1.65; color: var(--ink-72); margin: 0 0 16px; }
    .mat-p b { color: var(--ink); font-weight: 600; }
    section.blk { padding: 48px 0; }
    .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 22px 0 6px; }
    .fact { border: 1px solid var(--ink-12); border-radius: 16px; padding: 18px; background: #fff; }
    .fact .fn { font-family: var(--font-display); font-size: 28px; line-height: 1; color: var(--ink); }
    .fact .fd { font-size: 13.5px; line-height: 1.45; color: var(--ink-55); margin-top: 8px; }
    .anketa { margin-top: 8px; }
    .fgroup { margin-bottom: 22px; }
    .fbox { border: 1px solid var(--ink-12); border-radius: 16px; padding: 18px 18px 2px; background: rgba(255,255,255,.6); }
    .fbox .fgroup { margin-bottom: 14px; }
    .fbox .flab { font-weight: 500; font-size: 13.5px; }
    .flab { display: block; font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 8px; line-height: 1.4; }
    .qn { color: var(--blue); font-family: var(--font-display); font-weight: 400; }
    .req { color: var(--magenta); }
    .opt { font-weight: 400; color: var(--ink-40); font-size: 12.5px; }
    .fhint { font-size: 13.5px; line-height: 1.5; color: var(--ink-55); margin: -3px 0 9px; }
    .flead { font-size: 14.5px; line-height: 1.55; color: var(--ink-55); margin: -6px 0 18px; }
    .fnote { font-size: 14px; line-height: 1.55; color: var(--ink-72); background: var(--ink-04); border-radius: 12px; padding: 12px 14px; margin: 0 0 22px; }
    .fin { width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid var(--ink-12); border-radius: 12px; background: #fff; font-family: var(--font-body); font-size: 15.5px; line-height: 1.5; color: var(--ink); }
    .fin:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(42,62,244,.12); }
    textarea.fin { resize: vertical; min-height: 70px; }
    .fother { margin-top: 8px; }
    .fsep { font-size: 11.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--blue); margin: 40px 0 18px; padding-top: 22px; border-top: 1px solid var(--ink-08); }
    .chips, .pills { display: flex; flex-wrap: wrap; gap: 7px; }
    .chip, .pill { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; border: 1px solid var(--ink-12); border-radius: 999px; padding: 8px 14px; background: #fff; font-size: 14px; line-height: 1.3; color: var(--ink-72); transition: border-color .15s, background .15s; }
    .pill { padding: 6px 12px; font-size: 13px; }
    .chip:hover, .pill:hover { border-color: var(--ink-40); }
    .chip:has(input:checked), .pill:has(input:checked) { border-color: var(--ink); background: var(--ink); color: #fff; }
    .chip input, .pill input { position: absolute; opacity: 0; width: 1px; height: 1px; }
    .chip:has(input:focus-visible), .pill:has(input:focus-visible) { box-shadow: 0 0 0 3px rgba(42,62,244,.25); }
    .matrix { display: grid; gap: 12px; }
    .mrow { display: grid; grid-template-columns: 210px 1fr; gap: 12px; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--ink-08); }
    .mrow:last-child { border-bottom: 0; }
    .mlab { font-size: 14px; color: var(--ink); line-height: 1.35; }
    .levels { display: grid; gap: 7px; }
    .lvl { display: grid; grid-template-columns: 20px 26px 1fr; gap: 10px; align-items: center; cursor: pointer; border: 1px solid var(--ink-12); border-radius: 12px; padding: 11px 14px; background: #fff; }
    .lvl:has(input:checked) { border-color: var(--ink); background: var(--ink-04); }
    .lvl input { margin: 0; accent-color: var(--blue); width: 16px; height: 16px; }
    .lvl .ln { font-family: var(--font-display); font-size: 15px; color: var(--blue); }
    .lvl .lt { font-size: 14.5px; line-height: 1.45; color: var(--ink-72); }
    .ferr { outline: 2px solid rgba(213,31,117,.45); outline-offset: 6px; border-radius: 12px; }
    .fbtn { margin-top: 28px; padding: 15px 34px; background: var(--ink); color: #fff; border: 0; border-radius: 999px; font-family: var(--font-body); font-size: 15.5px; font-weight: 600; cursor: pointer; }
    .fbtn:disabled { opacity: .55; cursor: default; }
    .fmsg { margin-top: 14px; font-size: 14.5px; line-height: 1.55; }
    .fmsg.ok { color: #1a7a45; font-weight: 600; }
    .fmsg.err { color: #a01a59; }
    .fsaved { font-size: 12.5px; color: var(--ink-40); margin-top: 10px; }
    .pgfoot { padding: 40px 28px 56px; text-align: center; font-size: 13px; color: var(--ink-40); }
    #lockwrap { padding: 0 20px 96px; }
    .lock-card { max-width: 480px; margin: 0 auto; background: #fff; border: 1px solid var(--ink-12); border-radius: 22px; padding: 32px 28px 28px; text-align: center; box-shadow: 0 30px 80px rgba(0,0,0,.08); }
    .lock-h { font-family: var(--font-display); font-weight: 400; font-size: 24px; color: var(--ink); margin: 0 0 10px; }
    .lock-hint { font-size: 14.5px; color: var(--ink-72); line-height: 1.55; margin: 0 0 20px; }
    #pwd { width: 100%; box-sizing: border-box; padding: 14px 16px; border: 1px solid var(--ink-12); border-radius: 10px; background: var(--paper); font-family: var(--font-body); font-size: 16px; text-align: center; }
    #lockwrap button { width: 100%; margin-top: 12px; padding: 15px; background: var(--ink); color: #fff; border: 0; border-radius: 999px; font-family: var(--font-body); font-size: 15px; font-weight: 600; cursor: pointer; }
    .lock-err { margin-top: 12px; font-size: 13px; color: #a01a59; display: none; }
    .lock-err.show { display: block; }
    @media (max-width: 720px) {
      .wrap { padding: 0 16px; }
      .mat-nav { padding: 14px 16px; }
      .facts { grid-template-columns: 1fr; }
      .mrow { grid-template-columns: 1fr; gap: 8px; }
      .lvl { grid-template-columns: 20px 1fr; } .lvl .ln { display: none; }
    }`;

const NAV = `<nav class="mat-nav">
    <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none">
      <svg width="24" height="20" viewBox="0 0 75.947 63.746" fill="#000" aria-hidden="true">
        <g transform="translate(52.456,1.459)"><path d="M 12.389 59.989 L 23.491 48.887 C 18.463 43.859 15.701 37.15 15.701 29.994 C 15.701 22.822 18.463 16.113 23.491 11.102 L 12.389 0 C 4.41 7.979 0 18.635 0 29.994 C 0 41.354 4.393 52.01 12.389 59.989 Z"/></g>
        <g transform="translate(0,21.328)"><path fill-rule="evenodd" d="M 42.418 0 L 42.418 0.001 L 48.578 0.001 L 48.578 15.702 L 39.403 15.702 C 33.149 31.34 17.844 42.418 0 42.418 L 0 26.718 C 14.723 26.718 26.717 14.74 26.717 0 L 42.418 0 Z"/></g>
        <g transform="translate(26.734,0)"><path d="M 7.859 15.718 C 12.199 15.718 15.718 12.199 15.718 7.859 C 15.718 3.519 12.199 0 7.859 0 C 3.519 0 0 3.519 0 7.859 C 0 12.199 3.519 15.718 7.859 15.718 Z"/></g>
      </svg>
      <span class="wm"><span>хакку.ии</span><span class="sep">|</span><span>б<span style="color:#D51F75">ИИ</span>знес</span></span>
    </a>
  </nav>`;

function gatedHtml(company, survey) {
  const facts = survey.facts.map(f => `<div class="fact"><div class="fn">${esc(f[0])}</div><div class="fd">${esc(f[1])}</div></div>`).join('');
  return `
  <section class="blk" style="padding-top:8px">
    <div class="wrap">
      <p class="mat-p" style="font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-55)">${esc(company.name)}</p>
      ${survey.intro.map(p => `<p class="mat-p">${p}</p>`).join('')}
      <div class="facts">${facts}</div>
      <form class="anketa" id="diag-form" onsubmit="return sendDiag(this)" autocomplete="off" novalidate>
        ${survey.sections(company).map(section).join('\n')}
        <button class="fbtn" type="submit">Отправить анкету</button>
        <div class="fmsg" id="diag-msg"></div>
        <div class="fsaved" id="diag-saved">Черновик сохраняется в этом браузере — можно закрыть страницу и вернуться.</div>
      </form>
    </div>
  </section>`;
}

const ENGINE = `
    function b64(s) { var bin = atob(s), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
    var DRAFT_KEY = 'hakku_diag_draft_' + DIAG.company + '_' + DIAG.survey, PW_KEY = 'hakku_diag_pw_' + DIAG.company;
    function collect(form) {
      var a = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === 'checkbox') { if (el.checked) (a[el.name] = a[el.name] || []).push(el.value); }
        else if (el.type === 'radio') { if (el.checked) a[el.name] = el.value; }
        else if (el.value.trim()) a[el.name] = el.value.trim();
      });
      return a;
    }
    function restore(form) {
      var d; try { d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null'); } catch (e) {}
      if (!d) return;
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || !(el.name in d)) return;
        var v = d[el.name];
        if (el.type === 'checkbox') el.checked = [].concat(v).indexOf(el.value) >= 0;
        else if (el.type === 'radio') el.checked = el.value === v;
        else el.value = v;
      });
    }
    function saveDraft(form) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(collect(form))); } catch (e) {} }
    function validate(form) {
      form.querySelectorAll('.ferr').forEach(function (n) { n.classList.remove('ferr'); });
      var bad = null, a = collect(form);
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.required || !el.name) return;
        if (!(el.name in a)) { var g = el.closest('.mrow') || el.closest('.fgroup'); if (g) { g.classList.add('ferr'); bad = bad || g; } }
      });
      form.querySelectorAll('[data-req-group]').forEach(function (g) {
        var n = g.getAttribute('data-req-group');
        if (!(n in a) && !((n + '_other') in a)) { g.classList.add('ferr'); bad = bad || g; }
      });
      return bad;
    }
    window.sendDiag = function (form) {
      var msg = document.getElementById('diag-msg'), btn = form.querySelector('.fbtn');
      var bad = validate(form);
      if (bad) {
        msg.className = 'fmsg err'; msg.textContent = 'Не заполнены обязательные вопросы — они подсвечены.';
        bad.scrollIntoView({ behavior: 'smooth', block: 'center' }); return false;
      }
      btn.disabled = true; btn.textContent = 'Отправляю…'; msg.className = 'fmsg'; msg.textContent = '';
      fetch('/shkola-api/diag', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ survey: DIAG.survey, company: DIAG.company, answers: collect(form) }) })
      .then(function (r) { return r.json(); }).then(function (j) {
        if (!(j && j.ok)) throw new Error('fail');
        try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
        Array.prototype.forEach.call(form.children, function (el) { if (el.id !== 'diag-msg') el.style.display = 'none'; });
        msg.className = 'fmsg ok'; msg.textContent = 'Спасибо, анкета отправлена. Ответы прочитаю до начала обучения.';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }).catch(function () {
        btn.disabled = false; btn.textContent = 'Отправить анкету';
        msg.className = 'fmsg err'; msg.textContent = 'Не отправилось. Проверьте интернет и нажмите ещё раз — черновик сохранён.';
      });
      return false;
    };
    async function doUnlock(pwd, silent) {
      var err = document.getElementById('err'); if (err) err.classList.remove('show');
      if (!pwd) return false;
      try {
        var enc = new TextEncoder();
        var km = await crypto.subtle.importKey('raw', enc.encode(pwd), 'PBKDF2', false, ['deriveKey']);
        var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(PAYLOAD.salt), iterations: 100000, hash: 'SHA-256' },
          km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        var buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(PAYLOAD.iv) }, key, b64(PAYLOAD.ct));
        mount(new TextDecoder().decode(buf));
        try { localStorage.setItem(PW_KEY, pwd); } catch (e) {}
        return true;
      } catch (e) {
        if (!silent) { if (err) err.classList.add('show'); var p = document.getElementById('pwd'); if (p) p.select(); }
        return false;
      }
    }
    function mount(html) {
      document.getElementById('gated-content').innerHTML = html;
      var lw = document.getElementById('lockwrap'); if (lw) lw.remove();
      var form = document.getElementById('diag-form');
      restore(form);
      var t; form.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { saveDraft(form); }, 400); });
      form.addEventListener('change', function (e) { saveDraft(form); var g = e.target.closest('.ferr'); if (g) g.classList.remove('ferr'); });
    }
    function unlock() { var p = document.getElementById('pwd'); doUnlock(p ? p.value : '', false); }
    if (typeof PLAIN_HTML === 'string') mount(PLAIN_HTML);
    else (function () { try { var s = localStorage.getItem(PW_KEY); if (s) doUnlock(s, true); } catch (e) {} })();`;

function page({ company, survey, payload, plainHtml }) {
  const lock = plainHtml ? '' : `
  <div id="lockwrap">
    <div class="lock-card">
      <h2 class="lock-h">Введите пароль</h2>
      <p class="lock-hint">Пароль — в письме или сообщении, в котором пришла ссылка на анкету.</p>
      <form onsubmit="event.preventDefault(); unlock();" autocomplete="off">
        <input type="password" id="pwd" placeholder="Пароль" autofocus autocomplete="off" spellcheck="false">
        <button type="submit">Открыть анкету</button>
        <div class="lock-err" id="err">Пароль не подошёл. Попробуйте ещё раз.</div>
      </form>
    </div>
  </div>`;
  return `<!doctype html>
<html lang="ru" data-brand="b2c">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${esc(survey.title)} · бИИзнес</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/design_system/colors_and_type.css">
  <style>${CSS}
  </style>
</head>
<body>
  ${NAV}
  <section class="blk" style="padding-bottom:24px">
    <div class="wrap">
      <div class="eyebrow-line" style="margin-bottom:18px"><span class="bar"></span><span style="font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-55)">Обучение работе с ИИ · диагностика</span></div>
      <h1 style="font-family:var(--font-display);font-weight:400;font-size:clamp(2.2rem,5.5vw,3.6rem);line-height:1.05;letter-spacing:-0.03em;margin:0 0 18px;color:var(--ink)">${esc(survey.title)}</h1>
      <p class="lede2" style="max-width:680px">${esc(survey.lede)}</p>
    </div>
  </section>
  ${lock}
  <div id="gated-content"></div>
  <footer class="pgfoot">хакку.ии | бИИзнес · business.hakku.ai</footer>
  <script>
    var DIAG = ${JSON.stringify({ company: company.slug, survey: survey.slug })};
    ${plainHtml ? `var PLAIN_HTML = ${JSON.stringify(plainHtml).replace(/</g, '\\u003c')};` : `var PAYLOAD = ${JSON.stringify(payload)};`}
    ${ENGINE}
  </script>
</body>
</html>
`;
}

const { companies, surveys } = await import(pathToFileURL(SPEC).href);
for (const company of companies) {
  for (const survey of surveys) {
    const inner = gatedHtml(company, survey);
    const rel = path.join('diagnostika', company.slug, survey.path);
    const out = path.join(ROOT, rel, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page({ company, survey, payload: await encrypt(inner, company.password) }));
    console.log('built', '/' + rel.replace(/\\/g, '/') + (survey.path ? '/' : ''), '←', company.slug, survey.slug);
    if (PLAIN) {
      const po = path.join(ROOT, '_materials_src/diagnostika/out', company.slug, survey.path || '', 'index.html');
      fs.mkdirSync(path.dirname(po), { recursive: true });
      fs.writeFileSync(po, page({ company, survey, plainHtml: inner }));
    }
  }
}
