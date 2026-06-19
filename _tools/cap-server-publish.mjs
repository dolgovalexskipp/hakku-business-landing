#!/usr/bin/env node
// cap-server-publish — одна команда: последняя Studio-запись Cap → страница-плеер
// business.hakku.ai/v/{slug}. Лимита 5 мин нет (Studio пишет локально). Тяжёлый mp4
// заливается НА СЕРВЕР напрямую (scp), мимо git — обходим лимит GitHub 100 МБ; в git
// едут только страница + реестр (через cap-publish --deploy).
//
//   node _tools/cap-server-publish.mjs --title "Заголовок" [--desc "..."] [--slug ...] [--project <.cap>] [--dry]
//
//   --title    обязательно
//   --desc     описание (страница + TG-превью)
//   --slug     явный slug (по умолчанию транслит из title)
//   --project  путь к .cap-проекту (по умолчанию — последняя Studio-запись)
//   --dry      собрать страницу локально и НЕ публиковать (превью)

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(fileURLToPath(import.meta.url), '../..');
const cfg = JSON.parse(fs.readFileSync(path.join(REPO, '_tools', 'cap.config.json'), 'utf8'));
const d = cfg.deploy || {};

function die(m) { console.error('✗ ' + m); process.exit(1); }

const argv = process.argv.slice(2);
const opts = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--title') opts.title = argv[++i];
  else if (a === '--desc') opts.desc = argv[++i];
  else if (a === '--slug') opts.slug = argv[++i];
  else if (a === '--project') opts.project = argv[++i];
  else if (a === '--dry') opts.dry = true;
  else die('Неизвестная опция: ' + a);
}
if (!opts.title) die('нужен --title "Заголовок ролика"');
if (!opts.dry && (!d.host || !d.user || !d.path)) die('в _tools/cap.config.json нет блока deploy (host/user/path)');

// 1) выбрать .cap-проект (последняя Studio-запись, если не задан)
let project = opts.project;
if (!project) {
  const recs = JSON.parse(execFileSync('cap', ['recordings', 'list', '--json'], { encoding: 'utf8' }));
  const studio = recs.find(r => r.recordingType === 'studio');
  if (!studio) die('не нашёл Studio-запись — запиши в Studio Mode (Instant режет на 5 мин)');
  project = studio.path;
  console.log('• последняя Studio-запись: ' + studio.name);
}
if (!fs.existsSync(project)) die('проект не найден: ' + project);

// 2) экспорт .cap → mp4 (локально, без лимита)
const mp4 = path.join(os.tmpdir(), `cap-${Date.now()}.mp4`);
console.log('• экспорт в mp4 (может занять время на длинных записях)…');
execFileSync('cap', ['export', project, mp4], { stdio: 'inherit' });
if (!fs.existsSync(mp4)) die('экспорт не создал файл');
console.log(`• mp4 готов: ${(fs.statSync(mp4).size / 1e6).toFixed(1)} MB`);

// 3) собрать страницу-плеер (+реестр); в git едут только страница/реестр,
//    video.mp4 в .gitignore -> на GitHub не уходит
const pub = [path.join(REPO, '_tools', 'cap-publish.mjs'), mp4, '--title', opts.title, '--storage', 'repo'];
if (opts.desc) pub.push('--desc', opts.desc);
if (opts.slug) pub.push('--slug', opts.slug);
if (!opts.dry) pub.push('--deploy');
const out = execFileSync('node', pub, { encoding: 'utf8' });
process.stdout.write(out);
const m = out.match(/v\/([a-z0-9-]+)\/index\.html/);
if (!m) die('не удалось определить slug из вывода cap-publish');
const slug = m[1];

if (opts.dry) {
  console.log(`\n✓ DRY: страница собрана локально, НЕ опубликована.`);
  console.log(`  превью: cd ${REPO} && python3 -m http.server 8080 → http://localhost:8080/v/${slug}/`);
  console.log(`  mp4: ${mp4}`);
  process.exit(0);
}

// 4) залить тяжёлый mp4 напрямую на сервер (мимо git)
const key = (d.key || '~/.ssh/id_ed25519').replace(/^~/, os.homedir());
const sshHost = `${d.user}@${d.host}`;
const remoteDir = `${d.path}/v/${slug}`;
console.log(`• заливаю видео на сервер: ${sshHost}:${remoteDir}/video.mp4`);
execFileSync('ssh', ['-i', key, sshHost, `mkdir -p '${remoteDir}'`], { stdio: 'inherit' });
execFileSync('scp', ['-i', key, mp4, `${sshHost}:${remoteDir}/video.mp4`], { stdio: 'inherit' });

fs.unlinkSync(mp4);
const url = `https://business.hakku.ai/v/${slug}/`;
console.log(`\n✓ опубликовано: ${url}`);
console.log(`  (та же страница и на https://os.business.hakku.ai/v/${slug}/)`);
