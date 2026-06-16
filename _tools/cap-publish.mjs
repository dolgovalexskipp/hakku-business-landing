#!/usr/bin/env node
// cap-publish — превращает локальный mp4 (запись из Cap) в страницу-плеер
// на business.hakku.ai/v/{slug}. Этап 1: без бэкенда.
//
//   node _tools/cap-publish.mjs <file.mp4> --title "Заголовок" [опции]
//
// Опции:
//   --title "..."      заголовок ролика (обязательно)
//   --slug my-slug     явный slug (по умолчанию — транслит из title)
//   --desc "..."       описание (для страницы и Telegram-превью)
//   --private          закрытый ролик за код-гейтом LMS (требует --storage r2)
//   --storage repo|r2  где лежит видео (по умолчанию repo, если нет cap.config.json)
//   --push             сразу git add+commit+push (иначе только готовит файлы)
//
// После генерации: предпросмотр `python3 -m http.server 8080` → /v/{slug}/
// Публикация: --push или вручную git push (GitHub Pages подхватит за ~1 мин).

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SITE = 'https://business.hakku.ai';
const REPO = path.resolve(fileURLToPath(import.meta.url), '../..'); // корень репо
const VDIR = path.join(REPO, 'v');

// ---- args -------------------------------------------------------------
const argv = process.argv.slice(2);
const opts = { storage: null, private: false, push: false, deploy: false };
let src = null;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--private') opts.private = true;
  else if (a === '--push') opts.push = true;
  else if (a === '--deploy') opts.deploy = true;
  else if (a === '--title') opts.title = argv[++i];
  else if (a === '--slug') opts.slug = argv[++i];
  else if (a === '--desc') opts.desc = argv[++i];
  else if (a === '--storage') opts.storage = argv[++i];
  else if (!a.startsWith('--')) src = a;
  else die(`Неизвестная опция: ${a}`);
}
function die(msg) { console.error('✗ ' + msg); process.exit(1); }

if (!src) die('Укажи путь к mp4: node _tools/cap-publish.mjs запись.mp4 --title "..."');
src = src.replace(/^~(?=\/)/, process.env.HOME);
if (!fs.existsSync(src)) die(`Файл не найден: ${src}`);
if (!opts.title) die('Нужен --title "Заголовок ролика"');

// ---- slug (с транслитом кириллицы) ------------------------------------
const TR = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' };
function slugify(s) {
  return s.toLowerCase().split('').map(c => TR[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'video';
}
const slug = opts.slug ? slugify(opts.slug) : slugify(opts.title);
const desc = opts.desc || '';

// ---- storage backend --------------------------------------------------
const cfgPath = path.join(REPO, '_tools', 'cap.config.json');
const cfg = fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : null;
let storage = opts.storage || (cfg?.r2 ? 'r2' : 'repo');

if (storage === 'repo' && opts.private)
  die('--private с repo-storage невозможен: файл в публичном репозитории всё равно публичный.\n' +
      '  Закрытые ролики — только через R2 (заполни _tools/cap.config.json). Сейчас сделай публичный или жди Этап 2.');
if (storage === 'r2' && !cfg?.r2)
  die('storage=r2, но нет _tools/cap.config.json. Скопируй cap.config.example.json и заполни R2-доступы.');

// ---- размеры видео + постер (best-effort через ffprobe/ffmpeg) --------
let vw = 1280, vh = 720;
try {
  const out = execFileSync('ffprobe', ['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','csv=p=0:s=x', src], { encoding: 'utf8' }).trim();
  const m = out.match(/(\d+)x(\d+)/);
  if (m) { vw = +m[1]; vh = +m[2]; }
} catch {}

const pageDir = path.join(VDIR, slug);
fs.mkdirSync(pageDir, { recursive: true });

// постер — кадр на 1-й секунде
const posterFile = path.join(pageDir, 'poster.jpg');
let posterUrl = `${SITE}/assets/og-image.png`; // дефолт-фолбэк
try {
  execFileSync('ffmpeg', ['-y','-ss','1','-i', src,'-frames:v','1','-vf','scale=1280:-2', posterFile], { stdio: 'ignore' });
  posterUrl = `${SITE}/v/${slug}/poster.jpg`;
} catch { console.warn('⚠ постер не сделан (ffmpeg), беру дефолтную og-картинку'); }

// ---- разместить видео -------------------------------------------------
let videoUrl;
if (storage === 'repo') {
  const dest = path.join(pageDir, 'video.mp4');
  fs.copyFileSync(src, dest);
  const mb = fs.statSync(dest).size / 1e6;
  if (mb > 95) console.warn(`⚠ видео ${mb.toFixed(0)}MB — GitHub лимит 100MB/файл. Это сигнал переходить на R2.`);
  videoUrl = `${SITE}/v/${slug}/video.mp4`;
  console.log(`• видео скопировано в репо (${mb.toFixed(1)}MB)`);
} else {
  // R2: aws s3 cp (S3-совместимый endpoint)
  const key = `${slug}.mp4`;
  execFileSync('aws', ['s3','cp', src, `s3://${cfg.r2.bucket}/${key}`,'--endpoint-url', cfg.r2.endpoint,'--content-type','video/mp4'], { stdio: 'inherit' });
  if (fs.existsSync(posterFile))
    execFileSync('aws', ['s3','cp', posterFile, `s3://${cfg.r2.bucket}/${slug}-poster.jpg`,'--endpoint-url', cfg.r2.endpoint], { stdio: 'inherit' });
  videoUrl = `${cfg.r2.publicBase.replace(/\/$/,'')}/${key}`;
  posterUrl = `${cfg.r2.publicBase.replace(/\/$/,'')}/${slug}-poster.jpg`;
}

// ---- длительность (для подписи) + брендовая OG-карточка 1200×630 ------
let durLabel = 'Loom-разбор';
try {
  const d = execFileSync('ffprobe', ['-v','error','-show_entries','format=duration','-of','csv=p=0', src], { encoding:'utf8' }).trim();
  const min = Math.round(parseFloat(d) / 60);
  if (min >= 1) durLabel = `Loom-разбор · ${min} мин`;
} catch {}

function ogCardHTML(title, eyebrow) {
  const e = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const F = `file://${path.join(REPO,'design_system','fonts')}`;
  const tSize = title.length <= 22 ? 92 : title.length <= 34 ? 74 : 58;
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>
@font-face{font-family:'Tektur';src:url('${F}/Tektur-Bold.ttf');font-weight:700;font-display:block}
@font-face{font-family:'Tektur';src:url('${F}/Tektur-Black.ttf');font-weight:900;font-display:block}
@font-face{font-family:'Tektur';src:url('${F}/Tektur-Medium.ttf');font-weight:500;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden}
.card{position:relative;width:1200px;height:630px;background:#0a0a0b;color:#fff;font-family:'Inter',-apple-system,system-ui,sans-serif;padding:64px 68px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.glow{position:absolute;width:820px;height:820px;right:-260px;top:-300px;border-radius:50%;background:radial-gradient(circle,rgba(42,62,244,.60) 0%,rgba(213,31,117,.28) 42%,rgba(10,10,11,0) 70%)}
.bar{position:absolute;left:0;top:0;width:100%;height:8px;background:linear-gradient(90deg,#2A3EF4 0%,#D51F75 55%,#FD7202 100%)}
.z{position:relative;z-index:2}
.top{display:flex;align-items:center;gap:13px;font-family:'Tektur';font-weight:700;font-size:27px}
.dim{color:rgba(255,255,255,.30)}.mag{color:#D51F75}
.eyebrow{font-weight:600;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.52);margin-bottom:20px}
.title{font-family:'Tektur';font-weight:900;font-size:${tSize}px;line-height:.99;letter-spacing:-.015em;max-width:1010px}
.bottom{display:flex;align-items:center;justify-content:space-between}
.left{display:flex;align-items:center;gap:24px}
.play{width:104px;height:104px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 50px rgba(0,0,0,.5);flex-shrink:0}
.tri{margin-left:9px;border-style:solid;border-width:19px 0 19px 31px;border-color:transparent transparent transparent #0a0a0b}
.sub{font-size:30px;color:rgba(255,255,255,.70);max-width:560px;line-height:1.25}
.url{font-family:'Tektur';font-weight:500;font-size:25px;color:rgba(255,255,255,.46);white-space:nowrap}
</style></head><body><div class="card">
<div class="glow"></div><div class="bar"></div>
<div class="top z"><span>хакку.ии</span><span class="dim">|</span><span>б<span class="mag">ИИ</span>знес</span></div>
<div class="z"><div class="eyebrow">${e(eyebrow)}</div><div class="title">${e(title)}</div></div>
<div class="bottom z"><div class="left"><div class="play"><span class="tri"></span></div>${desc?`<div class="sub">${e(desc)}</div>`:''}</div><div class="url">business.hakku.ai</div></div>
</div></body></html>`;
}

let ogImageUrl = posterUrl; // фолбэк — постер, если Chrome недоступен
try {
  const chromeBin = cfg?.chrome || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (!fs.existsSync(chromeBin)) throw new Error('Chrome не найден');
  const ogHtml = path.join(pageDir, '_ogcard.html');
  const ogPng  = path.join(pageDir, 'og.png');
  fs.writeFileSync(ogHtml, ogCardHTML(opts.title, durLabel));
  execFileSync(chromeBin, ['--headless=new','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files','--window-size=1200,630',`--screenshot=${ogPng}`,`file://${ogHtml}`], { stdio:'ignore' });
  fs.unlinkSync(ogHtml);
  if (!fs.existsSync(ogPng)) throw new Error('png не создан');
  if (storage === 'r2') {
    execFileSync('aws', ['s3','cp', ogPng, `s3://${cfg.r2.bucket}/${slug}-og.png`,'--endpoint-url', cfg.r2.endpoint], { stdio:'ignore' });
    ogImageUrl = `${cfg.r2.publicBase.replace(/\/$/,'')}/${slug}-og.png`;
  } else {
    ogImageUrl = `${SITE}/v/${slug}/og.png`;
  }
  console.log('• OG-карточка сгенерирована (og.png)');
} catch (e) { console.warn('⚠ OG-карточка не сделана ('+e.message+'), беру постер'); }

// ---- AUTH_PROBE из LMS (единый source of truth) -----------------------
function authProbe() {
  const appjs = fs.readFileSync(path.join(REPO, 'os', 'app.jsx'), 'utf8');
  const m = appjs.match(/const AUTH_PROBE\s*=\s*(\{[^;]+\});/);
  if (!m) die('не нашёл AUTH_PROBE в os/app.jsx — гейт не собрать');
  return m[1];
}

// ---- HTML страницы ----------------------------------------------------
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const pageUrl = `${SITE}/v/${slug}/`;

function buildHTML() {
  const ogVideo = opts.private ? '' : `
  <meta property="og:type" content="video.other">
  <meta property="og:video" content="${videoUrl}">
  <meta property="og:video:secure_url" content="${videoUrl}">
  <meta property="og:video:type" content="video/mp4">
  <meta property="og:video:width" content="${vw}">
  <meta property="og:video:height" content="${vh}">
  <meta name="twitter:card" content="player">
  <meta name="twitter:player" content="${pageUrl}">
  <meta name="twitter:player:width" content="${vw}">
  <meta name="twitter:player:height" content="${vh}">`;

  const robots = opts.private ? '<meta name="robots" content="noindex,nofollow">' : '';

  // относительные пути для самого плеера (работают и локально, и в проде);
  // OG-теги остаются абсолютными (их требуют соцсети/Telegram).
  const srcLocal    = storage === 'repo' ? 'video.mp4'  : videoUrl;
  const posterLocal = (storage === 'repo' && fs.existsSync(posterFile)) ? 'poster.jpg' : posterUrl;

  // приватный режим: видео-URL не в разметке, открывается JS только после кода
  const videoTag = opts.private
    ? `<video id="v" controls playsinline preload="none" poster="${posterLocal}"></video>`
    : `<video id="v" controls playsinline preload="metadata" poster="${posterLocal}"><source src="${srcLocal}" type="video/mp4"></video>`;

  const gateScript = opts.private ? `
  <script>
  const AUTH_PROBE = ${authProbe()};
  const VIDEO_URL = ${JSON.stringify(videoUrl)};
  function _b64(s){var b=atob(s),o=new Uint8Array(b.length);for(var i=0;i<b.length;i++)o[i]=b.charCodeAt(i);return o;}
  async function verify(pwd){if(!pwd)return false;try{var e=new TextEncoder();var km=await crypto.subtle.importKey('raw',e.encode(pwd),'PBKDF2',false,['deriveKey']);var k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:_b64(AUTH_PROBE.salt),iterations:100000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);var buf=await crypto.subtle.decrypt({name:'AES-GCM',iv:_b64(AUTH_PROBE.iv)},k,_b64(AUTH_PROBE.ct));return new TextDecoder().decode(buf)==='hakku-os-ok';}catch(e){return false;}}
  function reveal(){var v=document.getElementById('v');v.src=VIDEO_URL;document.getElementById('gate').style.display='none';document.getElementById('stage').style.display='block';}
  (async()=>{try{var pw=localStorage.getItem('hakku_os_pw');if(pw&&await verify(pw)){reveal();return;}}catch(e){}document.getElementById('gate').style.display='flex';})();
  async function submitGate(e){e.preventDefault();var i=document.getElementById('pw'),err=document.getElementById('err');var ok=await verify(i.value);if(ok){try{localStorage.setItem('hakku_os_pw',i.value);localStorage.setItem('hakku_os_authed','1');}catch(e){}reveal();}else{err.style.display='block';}return false;}
  </script>` : '';

  const gateHTML = opts.private ? `
    <form id="gate" class="gate" onsubmit="return submitGate(event)" style="display:none">
      <div class="gate-card">
        <div class="eyebrow">Закрытая среда · по приглашению</div>
        <h2>Разбор для участников бИИзнес</h2>
        <p>Введите код доступа из чата сообщества, чтобы открыть видео.</p>
        <input id="pw" type="password" placeholder="Код доступа из чата" autocomplete="off" autofocus>
        <button type="submit">Открыть →</button>
        <div id="err" class="err" style="display:none">Код не подошёл. Проверьте раскладку.</div>
        <div class="hint">Нет доступа? <a href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener">@hakkuai_business_bot</a></div>
      </div>
    </form>` : '';

  return `<!doctype html>
<html lang="ru" data-brand="b2c">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${robots}
  <title>${esc(opts.title)} · хакку.ии бИИзнес</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${esc(opts.title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:image" content="${ogImageUrl}">
  <meta property="og:site_name" content="хакку.ии | бИИзнес">
  <meta property="og:locale" content="ru_RU">${ogVideo}
  <link rel="stylesheet" href="/design_system/colors_and_type.css">
  <style>
    *{box-sizing:border-box}
    html,body{margin:0;background:var(--paper,#fff);color:var(--ink,#000);font-family:var(--font-body,Inter,system-ui,sans-serif);-webkit-font-smoothing:antialiased}
    .wrap{max-width:1100px;margin:0 auto;padding:28px 20px 60px}
    .top{display:flex;align-items:center;gap:10px;margin-bottom:22px}
    .top .mark{font-family:var(--font-display,Tektur,sans-serif);font-weight:700;letter-spacing:.02em;font-size:18px}
    .top .sep{color:var(--ink-40,rgba(0,0,0,.4))}
    .top .muted{color:var(--ink-55,rgba(0,0,0,.55))}
    .eyebrow{font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-40,rgba(0,0,0,.4));margin-bottom:10px}
    h1{font-family:var(--font-display,Tektur,sans-serif);font-size:clamp(24px,3.4vw,38px);line-height:1.12;margin:0 0 10px}
    .desc{color:var(--ink-72,rgba(0,0,0,.72));max-width:680px;font-size:16px;line-height:1.55;margin:0 0 22px}
    .stage{border:1px solid var(--ink-12,rgba(0,0,0,.12));border-radius:16px;overflow:hidden;background:#000;box-shadow:0 18px 50px rgba(0,0,0,.14)}
    video{display:block;width:100%;height:auto;background:#000;aspect-ratio:${vw}/${vh}}
    .foot{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;margin-top:18px;padding-top:16px;border-top:1px solid var(--ink-08,rgba(0,0,0,.08));color:var(--ink-40,rgba(0,0,0,.4));font-size:13.5px}
    .foot a{color:var(--blue,#2A3EF4);text-decoration:none;font-weight:500}
    .gate{position:fixed;inset:0;background:var(--paper,#fff);display:flex;align-items:center;justify-content:center;padding:24px;z-index:10}
    .gate-card{width:100%;max-width:420px;border:1px solid var(--ink-12,rgba(0,0,0,.12));border-radius:18px;padding:30px;background:var(--paper,#fff);box-shadow:0 18px 50px rgba(0,0,0,.08)}
    .gate-card h2{font-family:var(--font-display,Tektur,sans-serif);font-size:26px;margin:0 0 8px}
    .gate-card p{color:var(--ink-55,rgba(0,0,0,.55));font-size:14.5px;line-height:1.5;margin:0 0 18px}
    .gate-card input{width:100%;height:48px;border:1px solid var(--ink-12,rgba(0,0,0,.12));background:var(--paper,#fff);color:var(--ink,#000);border-radius:11px;padding:0 14px;font-size:15px;outline:none}
    .gate-card input:focus{border-color:var(--blue,#2A3EF4)}
    .gate-card button{width:100%;height:48px;margin-top:12px;border:0;border-radius:11px;background:var(--ink,#000);color:#fff;font-size:15px;font-weight:600;cursor:pointer}
    .err{color:var(--magenta,#D51F75);font-size:13.5px;margin-top:10px}
    .hint{color:var(--ink-40,rgba(0,0,0,.4));font-size:13px;margin-top:14px}
    .hint a{color:var(--blue,#2A3EF4);text-decoration:none}
  </style>
</head>
<body>
  ${gateHTML}
  <div class="wrap" id="stage"${opts.private ? ' style="display:none"' : ''}>
    <div class="top"><span class="mark">хакку.ии</span><span class="sep">·</span><span class="muted">бИИзнес</span></div>
    <div class="eyebrow">Loom-разбор</div>
    <h1>${esc(opts.title)}</h1>
    ${desc ? `<p class="desc">${esc(desc)}</p>` : ''}
    <div class="stage">${videoTag}</div>
    <div class="foot">
      <span>хакку.ии (hakku.ai) · бИИзнес — сообщество собственников бизнеса</span>
      <a href="/os/">← в базу знаний</a>
    </div>
  </div>
  ${gateScript}
</body>
</html>
`;
}

fs.writeFileSync(path.join(pageDir, 'index.html'), buildHTML());

// ---- реестр (для каталога и блока «Loom-разборы» в LMS) ---------------
const regPath = path.join(VDIR, '_registry.json');
const reg = fs.existsSync(regPath) ? JSON.parse(fs.readFileSync(regPath, 'utf8')) : [];
const entry = { slug, title: opts.title, desc, url: pageUrl, private: opts.private, storage, poster: posterUrl };
const idx = reg.findIndex(r => r.slug === slug);
if (idx >= 0) reg[idx] = entry; else reg.unshift(entry);
fs.writeFileSync(regPath, JSON.stringify(reg, null, 2));

// ---- финал ------------------------------------------------------------
console.log(`\n✓ страница готова: v/${slug}/index.html`);
console.log(`  предпросмотр:  cd ${REPO} && python3 -m http.server 8080  →  http://localhost:8080/v/${slug}/`);
console.log(`  ссылка после публикации:  ${pageUrl}`);

// ВАЖНО: сайт раздаётся НЕ с GitHub Pages, а с Яндекс-сервера (git-клон).
// Поэтому деплой = git push В GitHub + git reset --hard НА сервере по SSH.
if (opts.push || opts.deploy) {
  console.log('\n• git add/commit/push → GitHub…');
  execFileSync('git', ['-C', REPO, 'add', `v/${slug}`, 'v/_registry.json', 'os/chrome.jsx'], { stdio: 'inherit' });
  execFileSync('git', ['-C', REPO, 'commit', '-m', `cap: ${opts.title}`], { stdio: 'inherit' });
  execFileSync('git', ['-C', REPO, 'push'], { stdio: 'inherit' });
}

if (opts.deploy) {
  const d = cfg?.deploy;
  if (!d?.host) die('--deploy требует блок "deploy" в _tools/cap.config.json (host/user/path[/key/branch]).');
  const key = (d.key || '~/.ssh/id_ed25519').replace(/^~/, process.env.HOME);
  const branch = d.branch || 'main';
  console.log(`\n• деплой на сервер ${d.user}@${d.host}…`);
  execFileSync('ssh', ['-i', key, `${d.user}@${d.host}`,
    `cd ${d.path} && git fetch origin -q && git reset --hard origin/${branch}`], { stdio: 'inherit' });
  console.log(`\n✓ опубликовано и задеплоено → ${pageUrl}`);
} else if (opts.push) {
  console.log(`\n✓ запушено в GitHub. ДЕПЛОЙ НЕ АВТОМАТ: добавь --deploy или вручную`);
  console.log(`  ssh ... 'cd /var/www/hakkuai/business-landing && git reset --hard origin/main'`);
} else {
  console.log('\n→ проверь локально, затем опубликуй:  --deploy  (push в GitHub + git reset на Яндекс-сервере)');
}
