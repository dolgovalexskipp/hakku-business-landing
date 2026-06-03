#!/usr/bin/env node
// Encrypt an HTML page behind a Hakku-branded password gate.
// Self-contained static HTML that decrypts client-side via WebCrypto
// (PBKDF2-SHA256 100k iterations + AES-GCM 256). No build, no backend.
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

function renderGate(payload, title) {
  const payloadJson = JSON.stringify(payload);
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/design_system/colors_and_type.css">
  <style>
    body { background: var(--paper); color: var(--ink); min-height: 100vh; display: flex; flex-direction: column; }
    .gnav { display: flex; align-items: center; justify-content: space-between; padding: 16px 28px; border-bottom: 1px solid var(--ink-08); }
    .wm { font-family: var(--font-display); font-size: 18px; letter-spacing: -0.02em; display: inline-flex; align-items: center; gap: 9px; color: var(--ink); }
    .wm .sep { color: var(--ink-40); }
    .back { font-size: 13px; color: var(--ink-55); }
    main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }
    .card { max-width: 440px; width: 100%; background: #fff; border: 1px solid var(--ink-12); border-radius: 24px; padding: 36px 34px 30px; box-shadow: 0 30px 80px rgba(0,0,0,.07); }
    .visual { height: 116px; margin: -8px -8px 26px; border-radius: 18px; background: var(--ash); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .visual img { width: 150px; height: 150px; object-fit: contain; animation: spin 90s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .kicker { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--blue); margin-bottom: 12px; }
    h1 { font-family: var(--font-display); font-weight: 400; font-size: 26px; line-height: 1.12; letter-spacing: -0.02em; margin: 0 0 10px; color: var(--ink); }
    p.hint { font-size: 14.5px; color: var(--ink-72); line-height: 1.55; margin: 0 0 24px; }
    label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--ink-55); margin-bottom: 8px; }
    input { width: 100%; padding: 14px 16px; border: 1px solid var(--ink-12); border-radius: 10px; background: var(--paper); font-family: var(--font-body); font-size: 16px; color: var(--ink); }
    input:focus { outline: none; border-color: var(--blue); background: #fff; box-shadow: 0 0 0 3px rgba(42,62,244,.12); }
    button { width: 100%; margin-top: 14px; padding: 15px; background: var(--ink); color: #fff; border: 0; border-radius: 999px; font-family: var(--font-body); font-size: 15px; font-weight: 600; cursor: pointer; transition: filter .15s; }
    button:hover { filter: brightness(1.7); }
    .err { margin-top: 14px; padding: 10px 14px; background: rgba(213,31,117,.06); border: 1px solid rgba(213,31,117,.25); border-radius: 10px; font-size: 13.5px; color: #a01a59; display: none; }
    .err.show { display: block; }
    .foot { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--ink-08); font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--ink-40); text-align: center; font-weight: 500; }
    footer.pg { padding: 24px 28px; border-top: 1px solid var(--ink-08); font-size: 12px; color: var(--ink-40); text-align: center; letter-spacing: .06em; }
  </style>
</head>
<body>
  <nav class="gnav">
    <a href="/" style="display:flex;align-items:center;gap:10px">
      <svg width="24" height="20" viewBox="0 0 75.947 63.746" fill="#000">
        <g transform="translate(52.456,1.459)"><path d="M 12.389 59.989 L 23.491 48.887 C 18.463 43.859 15.701 37.15 15.701 29.994 C 15.701 22.822 18.463 16.113 23.491 11.102 L 12.389 0 C 4.41 7.979 0 18.635 0 29.994 C 0 41.354 4.393 52.01 12.389 59.989 Z"/></g>
        <g transform="translate(0,21.328)"><path fill-rule="evenodd" d="M 42.418 0 L 42.418 0.001 L 48.578 0.001 L 48.578 15.702 L 39.403 15.702 C 33.149 31.34 17.844 42.418 0 42.418 L 0 26.718 C 14.723 26.718 26.717 14.74 26.717 0 L 42.418 0 Z"/></g>
        <g transform="translate(26.734,0)"><path d="M 7.859 15.718 C 12.199 15.718 15.718 12.199 15.718 7.859 C 15.718 3.519 12.199 0 7.859 0 C 3.519 0 0 3.519 0 7.859 C 0 12.199 3.519 15.718 7.859 15.718 Z"/></g>
      </svg>
      <span class="wm"><span>хакку.ии</span><span class="sep">|</span><span>б<span style="color:#D51F75">ИИ</span>знес</span></span>
    </a>
    <a href="/" class="back">← к сообществу</a>
  </nav>
  <main>
    <div class="card">
      <div class="visual"><img src="/assets/graphic-holo-torus.webp" alt=""></div>
      <span class="kicker">Материал сообщества</span>
      <h1>Доступ для участников</h1>
      <p class="hint">Страница закрыта паролем. Введите пароль из чата сообщества — откроется материал.</p>
      <form onsubmit="event.preventDefault(); unlock();" autocomplete="off">
        <label for="pwd">Пароль</label>
        <input type="password" id="pwd" autofocus autocomplete="off" spellcheck="false">
        <button type="submit">Открыть материал</button>
        <div class="err" id="err">Пароль не подошёл. Попробуйте ещё раз.</div>
      </form>
      <div class="foot">хакку.ии · бИИзнес</div>
    </div>
  </main>
  <footer class="pg">Материал доступен участникам сообщества · не индексируется</footer>
<script>
const PAYLOAD = ${payloadJson};
async function unlock() {
  const pwd = document.getElementById('pwd').value;
  const err = document.getElementById('err');
  err.classList.remove('show');
  if (!pwd) return;
  const b64 = (s) => { const bin = atob(s); const out = new Uint8Array(bin.length); for (let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i); return out; };
  try {
    const enc = new TextEncoder();
    const km = await crypto.subtle.importKey('raw', enc.encode(pwd), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64(PAYLOAD.salt), iterations: 100000, hash: 'SHA-256' },
      km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
    const buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(PAYLOAD.iv) }, key, b64(PAYLOAD.ct));
    const html = new TextDecoder().decode(buf);
    document.open(); document.write(html); document.close();
  } catch (e) {
    err.classList.add('show');
    document.getElementById('pwd').select();
  }
}
</script>
</body>
</html>
`;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node _tools/encrypt-page.js <source.html> <password> <output.html> [--title "Title"]');
    process.exit(1);
  }
  const [source, password, output] = args;
  let title = 'Материал · бИИзнес';
  const ti = args.indexOf('--title');
  if (ti !== -1 && args[ti + 1]) title = args[ti + 1];
  const plaintext = fs.readFileSync(path.resolve(source), 'utf-8');
  const payload = await encrypt(plaintext, password);
  fs.writeFileSync(path.resolve(output), renderGate(payload, title), 'utf-8');
  console.log(`Encrypted: ${source} -> ${output} (${(fs.statSync(path.resolve(output)).size/1024).toFixed(1)} KB)`);
}
main().catch(e => { console.error(e); process.exit(1); });
