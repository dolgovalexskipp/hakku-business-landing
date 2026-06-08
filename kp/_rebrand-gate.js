#!/usr/bin/env node
// Rebrand the default dolgov-ai password gate (produced by encrypt-page.js)
// into the hakku.ai | бИИзнес look. Idempotent-ish: run right after encrypt.
//   node kp/_rebrand-gate.js <path-to-encrypted.html>
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('usage: node _rebrand-gate.js <file.html>'); process.exit(1); }
let html = fs.readFileSync(file, 'utf8');

const GLYPH = '<svg class="glyph" viewBox="0 0 75.947 63.746" fill="currentColor" aria-hidden="true"><g transform="translate(52.456,1.459)"><path d="M 12.389 59.989 L 23.491 48.887 C 18.463 43.859 15.701 37.15 15.701 29.994 C 15.701 22.822 18.463 16.113 23.491 11.102 L 12.389 0 C 4.41 7.979 0 18.635 0 29.994 C 0 41.354 4.393 52.01 12.389 59.989 Z"/></g><g transform="translate(0,21.328)"><path fill-rule="evenodd" d="M 42.418 0 L 42.418 0.001 L 48.578 0.001 L 48.578 15.702 L 39.403 15.702 C 33.149 31.34 17.844 42.418 0 42.418 L 0 26.718 C 14.723 26.718 26.717 14.74 26.717 0 L 42.418 0 Z"/></g><g transform="translate(26.734,0)"><path d="M 7.859 15.718 C 12.199 15.718 15.718 12.199 15.718 7.859 C 15.718 3.519 12.199 0 7.859 0 C 3.519 0 0 3.519 0 7.859 C 0 12.199 3.519 15.718 7.859 15.718 Z"/></g></svg>';

const pairs = [
  // favicon dot
  ["fill='%233a754d'", "fill='%232A3EF4'"],
  // fonts: Lufga -> Tektur + Inter via Google Fonts
  [`    @font-face { font-family: 'Lufga'; src: url('/fonts/Lufga-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
    @font-face { font-family: 'Lufga'; src: url('/fonts/Lufga-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }
    @font-face { font-family: 'Lufga'; src: url('/fonts/Lufga-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }
    @font-face { font-family: 'Lufga'; src: url('/fonts/Lufga-Bold.woff2') format('woff2'); font-weight: 700; font-display: swap; }
    @font-face { font-family: 'Lufga'; src: url('/fonts/Lufga-ExtraBold.woff2') format('woff2'); font-weight: 800; font-display: swap; }`,
   `    @import url("https://fonts.googleapis.com/css2?family=Tektur:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap");`],
  // root vars -> бИИзнес (paper white, ink black, blue accent)
  [`      --paper: #f6f0e6;
      --paper-2: #fdfbf7;
      --ink: #10100f;
      --muted: #67635d;
      --muted-light: #8a857e;
      --line: rgba(16,16,15,0.09);
      --green-950: #11281d;
      --green-900: #173a28;
      --green-700: #3a754d;
      --green-100: #e7efe8;`,
   `      --paper: #ffffff;
      --paper-2: #ffffff;
      --ink: #000000;
      --muted: rgba(0,0,0,0.55);
      --muted-light: rgba(0,0,0,0.40);
      --line: rgba(0,0,0,0.10);
      --green-950: #000000;
      --green-900: #000000;
      --green-700: #2A3EF4;
      --green-100: #eef0ff;`],
  // body font
  ["      font-family: 'Lufga', system-ui, sans-serif;", "      font-family: 'Inter', system-ui, sans-serif;"],
  // nav bar bg cream -> white
  ["      background: rgba(246,240,230,0.9);", "      background: rgba(255,255,255,0.9);"],
  // brand style
  [`    .brand {
      font-size: 13px; font-weight: 800;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--ink);
    }`,
   `    .brand {
      display: inline-flex; align-items: center; gap: 9px;
      font-family: 'Tektur', system-ui, sans-serif;
      font-size: 17px; font-weight: 400;
      letter-spacing: -0.01em;
      color: var(--ink);
    }
    .brand .glyph { width: 22px; height: 18.5px; flex-shrink: 0; }
    .brand .ii { color: #D51F75; }
    .brand .sep { color: rgba(0,0,0,0.4); }`],
  // h1 style
  [`    h1 {
      font-size: 26px; line-height: 1.1;
      letter-spacing: -0.025em;
      font-weight: 800;
      margin-bottom: 10px;
    }`,
   `    h1 {
      font-family: 'Tektur', system-ui, sans-serif;
      font-size: 30px; line-height: 1.05;
      letter-spacing: -0.02em;
      font-weight: 400;
      margin-bottom: 10px;
    }`],
  // visual radial gradients -> trio
  [`        radial-gradient(circle at 22% 55%, rgba(58,117,77,0.18) 0%, rgba(58,117,77,0) 42%),
        radial-gradient(circle at 58% 45%, rgba(23,58,40,0.3) 0%, rgba(23,58,40,0) 48%),
        radial-gradient(circle at 82% 60%, rgba(58,117,77,0.14) 0%, rgba(58,117,77,0) 40%),`,
   `        radial-gradient(circle at 22% 55%, rgba(42,62,244,0.16) 0%, rgba(42,62,244,0) 42%),
        radial-gradient(circle at 58% 45%, rgba(213,31,117,0.18) 0%, rgba(213,31,117,0) 48%),
        radial-gradient(circle at 82% 60%, rgba(253,114,2,0.14) 0%, rgba(253,114,2,0) 40%),`],
  // focus shadow green -> blue
  ["box-shadow: 0 0 0 3px rgba(58,117,77,0.12);", "box-shadow: 0 0 0 3px rgba(42,62,244,0.12);"],
  // svg circles -> trio
  [`          <circle cx="96" cy="60" r="44" fill="#173a28" fill-opacity="0.12"/>
          <circle cx="180" cy="60" r="58" fill="#3a754d" fill-opacity="0.16"/>
          <circle cx="274" cy="60" r="50" fill="#173a28" fill-opacity="0.2"/>
          <circle cx="360" cy="60" r="34" fill="#3a754d" fill-opacity="0.14"/>
          <line x1="40" y1="60" x2="420" y2="60" stroke="#173a28" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="2 6"/>`,
   `          <circle cx="96" cy="60" r="44" fill="#2A3EF4" fill-opacity="0.14"/>
          <circle cx="180" cy="60" r="58" fill="#D51F75" fill-opacity="0.16"/>
          <circle cx="274" cy="60" r="50" fill="#2A3EF4" fill-opacity="0.18"/>
          <circle cx="360" cy="60" r="34" fill="#FD7202" fill-opacity="0.16"/>
          <line x1="40" y1="60" x2="420" y2="60" stroke="#2A3EF4" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="2 6"/>`],
  // nav anchors -> хакку.ии wordmark + glyph
  [`      <a href="https://dolgovalex.com/" class="brand">Долгов, Эй Ай и партнёры</a>
      <a href="https://dolgovalex.com/" class="nav-back">← на главную</a>`,
   `      <a href="https://business.hakku.ai/" class="brand">${GLYPH}<span class="bt">хакку.ии <span class="sep">|</span> б<span class="ii">ИИ</span>знес</span></a>
      <a href="https://business.hakku.ai/" class="nav-back">бИИзнес ↗</a>`],
  // kicker / h1 / hint copy
  [`      <span class="kicker">Личный документ</span>
      <h1>Персональный R&amp;D</h1>
      <p class="hint">Страница закрыта паролем. Введите пароль из сообщения — откроется рабочий документ под вашу сессию.</p>`,
   `      <span class="kicker">Коммерческое предложение</span>
      <h1>Для IZMENI SOZNANIE</h1>
      <p class="hint">Документ закрыт паролем. Введите пароль из сообщения — откроется коммерческое предложение.</p>`],
  // foot
  [`      <div class="foot">Долгов, Эй Ай и партнёры</div>`,
   `      <div class="foot">хакку.ии · бИИзнес</div>`],
];

let ok = 0, missed = [];
for (const [from, to] of pairs) {
  if (html.includes(from)) { html = html.replace(from, to); ok++; }
  else missed.push(from.slice(0, 48).replace(/\n/g, '⏎'));
}
fs.writeFileSync(file, html);
console.log(`rebrand: applied ${ok}/${pairs.length}`);
if (missed.length) { console.error('MISSED:\n  ' + missed.join('\n  ')); process.exit(2); }
