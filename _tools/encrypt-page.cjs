#!/usr/bin/env node
// Teaser + password gate. The open part (~20%) renders openly for everyone;
// everything after the single <!--GATE--> marker is AES-GCM encrypted and
// revealed in-place on correct password (PBKDF2-SHA256 100k + AES-GCM-256).
// No build, no backend. Source must be a full HTML doc with ONE <!--GATE--> marker.
//
// Usage:
//   node _tools/encrypt-page.js <source.html> <password> <output.html> [--title "Title"]

const fs = require('fs');
const path = require('path');
const { webcrypto: crypto } = require('crypto');

async function encrypt(plaintext, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const km = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    km, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
  );
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  const b64 = (buf) => Buffer.from(buf).toString('base64');
  return { salt: b64(salt), iv: b64(iv), ct: b64(ct) };
}

function gateBlock(payloadJson) {
  return `
  <style>
    #lockwrap { position: relative; padding: 0 20px 96px; }
    #lockwrap .lock-fade { position: absolute; left: 0; right: 0; top: -180px; height: 180px; background: linear-gradient(to bottom, rgba(255,255,255,0), var(--paper)); pointer-events: none; }
    #lockwrap .lock-card { max-width: 520px; margin: 0 auto; background: #fff; border: 1px solid var(--ink-12); border-radius: 22px; padding: 34px 30px 30px; text-align: center; box-shadow: 0 30px 80px rgba(0,0,0,.08); position: relative; }
    #lockwrap .lock-ic { width: 46px; height: 46px; border-radius: 50%; background: var(--ink-04); border: 1px solid var(--ink-08); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--ink); }
    #lockwrap .lock-kicker { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--blue); margin-bottom: 10px; }
    #lockwrap .lock-h { font-family: var(--font-display); font-weight: 400; font-size: 26px; letter-spacing: -0.02em; color: var(--ink); margin: 0 0 10px; line-height: 1.12; }
    #lockwrap .lock-hint { font-size: 14.5px; color: var(--ink-72); line-height: 1.55; margin: 0 0 22px; }
    #lockwrap input { width: 100%; padding: 14px 16px; border: 1px solid var(--ink-12); border-radius: 10px; background: var(--paper); font-family: var(--font-body); font-size: 16px; color: var(--ink); text-align: center; }
    #lockwrap input:focus { outline: none; border-color: var(--blue); background: #fff; box-shadow: 0 0 0 3px rgba(42,62,244,.12); }
    #lockwrap button { width: 100%; margin-top: 12px; padding: 15px; background: var(--ink); color: #fff; border: 0; border-radius: 999px; font-family: var(--font-body); font-size: 15px; font-weight: 600; cursor: pointer; transition: filter .15s; }
    #lockwrap button:hover { filter: brightness(1.7); }
    #lockwrap .lock-err { margin-top: 12px; padding: 9px 13px; background: rgba(213,31,117,.06); border: 1px solid rgba(213,31,117,.25); border-radius: 10px; font-size: 13px; color: #a01a59; display: none; }
    #lockwrap .lock-err.show { display: block; }
    #lockwrap .lock-join { display: inline-block; margin-top: 18px; font-size: 13.5px; color: var(--ink-55); border-bottom: 1px solid var(--ink-12); padding-bottom: 2px; }
    #lockwrap .lock-join:hover { color: var(--ink); }
    .mdbtn { display: inline-flex; align-items: center; gap: 9px; margin-top: 4px; font-family: var(--font-body); font-size: 14.5px; font-weight: 500; color: var(--ink); background: #fff; border: 1px solid var(--ink-12); border-radius: 999px; padding: 11px 18px; cursor: pointer; transition: border-color .15s, background .15s; }
    .mdbtn:hover { border-color: var(--ink); background: var(--ink-04); }
    .mdbtn b { font-family: var(--font-mono); font-weight: 600; }
    .mdbtn svg { color: var(--blue); }
  </style>
  <div id="lockwrap">
    <div class="lock-fade"></div>
    <div class="lock-card">
      <div class="lock-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></div>
      <div class="lock-kicker">Дальше — для участников</div>
      <h3 class="lock-h">Открыть материал целиком</h3>
      <p class="lock-hint">Вы прочитали вступление. Полный разбор — с разбором по шагам, матрицей и примерами — открывается по паролю из чата сообщества.</p>
      <form onsubmit="event.preventDefault(); unlock();" autocomplete="off">
        <input type="password" id="pwd" placeholder="Пароль участника" autofocus autocomplete="off" spellcheck="false">
        <button type="submit">Открыть полностью</button>
        <div class="lock-err" id="err">Пароль не подошёл. Попробуйте ещё раз.</div>
      </form>
      <a href="https://t.me/hakkuai_business_bot" class="lock-join">Ещё не в сообществе? Вступить →</a>
    </div>
  </div>
  <div id="gated-content"></div>
  <script>
    const PAYLOAD = ${payloadJson};
    window.cpy = function (id, btn) {
      var t = document.getElementById(id).innerText;
      navigator.clipboard.writeText(t).then(function () {
        var o = btn.innerText; btn.innerText = 'Скопировано';
        setTimeout(function () { btn.innerText = o; }, 1500);
      });
    };
    // .md для ИИ — собирается в браузере из вшитого (зашифрованного) #md-skill,
    // публичного статик-файла нет. || existing — не перетираем кастомный dlMd материала.
    window.dlMd = window.dlMd || function () {
      var el = document.getElementById('md-skill'); if (!el) return;
      var blob = new Blob([el.textContent.replace(/^\\s+/, '')], { type: 'text/markdown;charset=utf-8' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = (el.getAttribute('data-name') || 'konspekt') + '.md';
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    };
    function b64(s) { var bin = atob(s); var out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
    async function doUnlock(pwd, silent) {
      var err = document.getElementById('err');
      if (err) err.classList.remove('show');
      if (!pwd) return false;
      try {
        var enc = new TextEncoder();
        var km = await crypto.subtle.importKey('raw', enc.encode(pwd), 'PBKDF2', false, ['deriveKey']);
        var key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: b64(PAYLOAD.salt), iterations: 100000, hash: 'SHA-256' },
          km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
        );
        var buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(PAYLOAD.iv) }, key, b64(PAYLOAD.ct));
        document.getElementById('gated-content').innerHTML = new TextDecoder().decode(buf);
        var lw = document.getElementById('lockwrap'); if (lw) lw.remove();
        // share the community password so the LMS and every other material auto-open
        try { localStorage.setItem('hakku_os_pw', pwd); } catch (e) {}
        return true;
      } catch (e) {
        if (!silent) { if (err) err.classList.add('show'); var p = document.getElementById('pwd'); if (p) p.select(); }
        return false;
      }
    }
    function unlock() { var p = document.getElementById('pwd'); doUnlock(p ? p.value : '', false); }
    // auto-unlock from a community password stored by the LMS login (or a prior manual unlock)
    (function () { try { var s = localStorage.getItem('hakku_os_pw'); if (s) doUnlock(s, true); } catch (e) {} })();
  </script>`;
}

// Блок «Скачать .md для ИИ» — вставляется в НАЧАЛО gated-части при --md.
// Конспект вшит в <script type="text/markdown"> (raw text: бэктики/& — литералы),
// кнопка зовёт глобальный dlMd (определён в gateBlock). Публичного .md-файла нет.
function mdSection(md, name) {
  return `
  <section style="padding:48px 0;border-top:1px solid var(--ink-08)">
    <div style="max-width:880px;margin:0 auto;padding:0 28px">
      <div style="font-family:var(--font-body);font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--blue);margin-bottom:10px">Для вашего ИИ</div>
      <h2 style="font-family:var(--font-display);font-weight:400;font-size:clamp(1.6rem,3.5vw,2.2rem);line-height:1.12;letter-spacing:-.02em;color:var(--ink);margin:0 0 12px">Конспект для ИИ-агента</h2>
      <p style="font-size:16px;line-height:1.6;color:var(--ink-72);margin:0 0 16px;max-width:680px">Короткий .md-брифинг материала — приложите его в чат своему ИИ и попросите помочь применить это у себя.</p>
      <button class="mdbtn" type="button" onclick="dlMd()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Скачать конспект <b>.md</b> — отдайте своему ИИ-агенту</button>
    </div>
    <script type="text/markdown" id="md-skill" data-name="${name}">${md}</script>
  </section>
`;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node _tools/encrypt-page.js <source.html> <password> <output.html> [--md <skill.md>]');
    process.exit(1);
  }
  const [source, password, output] = args;
  const mdIdx = args.indexOf('--md');
  const mdPath = mdIdx >= 0 ? args[mdIdx + 1] : null;
  const src = fs.readFileSync(path.resolve(source), 'utf-8');
  if (!src.includes('<!--GATE-->')) {
    console.error('ERROR: source has no <!--GATE--> marker (need exactly one to split open vs gated).');
    process.exit(1);
  }
  const parts = src.split('<!--GATE-->');
  if (parts.length !== 2) {
    console.error('ERROR: found ' + (parts.length - 1) + ' <!--GATE--> markers, need exactly one.');
    process.exit(1);
  }
  const openPart = parts[0];
  let gatedInner = parts[1].replace(/<\/body>\s*<\/html>\s*$/i, '');
  if (mdPath) {
    const md = fs.readFileSync(path.resolve(mdPath), 'utf-8');
    if (md.includes('</script')) { console.error('ERROR: .md содержит "</script" — нельзя вшить в raw-text <script>.'); process.exit(1); }
    const name = path.basename(mdPath).replace(/\.md$/i, '');
    gatedInner = mdSection(md, name) + gatedInner;
    console.log(`+ .md вшит в gated-блок (${(md.length / 1024).toFixed(1)} KB) — публичного файла нет`);
  }
  const payload = await encrypt(gatedInner, password);
  const out = openPart + gateBlock(JSON.stringify(payload)) + '\n</body>\n</html>\n';
  fs.writeFileSync(path.resolve(output), out, 'utf-8');
  const openPct = Math.round(openPart.length / src.length * 100);
  console.log(`Encrypted: ${source} -> ${output}`);
  console.log(`Open teaser: ~${openPct}% · gated: ~${100 - openPct}% · output ${(fs.statSync(path.resolve(output)).size / 1024).toFixed(1)} KB`);
}
main().catch(e => { console.error(e); process.exit(1); });
