# cap-publish — Loom-разборы на business.hakku.ai

Превращает локальный mp4 (запись из [Cap](https://cap.so)) в страницу-плеер
`business.hakku.ai/v/{slug}` — открывается по ссылке и даёт инлайн-превью в Telegram.

## Использование

```bash
cd ~/hakku-business-landing

# публичный ролик
node _tools/cap-publish.mjs ~/Desktop/zapis.mp4 \
  --title "Как устроена база знаний сообщества" \
  --desc "Где что лежит и как искать."

# проверить локально
python3 -m http.server 8080      # → http://localhost:8080/v/{slug}/

# опубликовать + задеплоить одной командой (или добавить --deploy к команде выше)
node _tools/cap-publish.mjs ~/Desktop/zapis.mp4 --title "..." --deploy
```

Ссылку `https://business.hakku.ai/v/{slug}/` шлёшь в Telegram (развернётся
превью с постером) **или** просто кидаешь сам mp4 из Cap нативно.

## ⚠️ Деплой — НЕ GitHub Pages

`business.hakku.ai` раздаётся с **Яндекс-сервера** (nginx, git-клон в
`/var/www/hakkuai/business-landing`). `git push` обновляет только GitHub —
на прод ничего не попадает, пока на сервере не сделать `git reset --hard`.

- `--deploy` делает оба шага: push в GitHub + `git reset --hard origin/main`
  на сервере по SSH (адрес/ключ — в gitignored `cap.config.json` → блок `deploy`).
- Вручную: `ssh <user>@<host> 'cd /var/www/hakkuai/business-landing && git fetch origin -q && git reset --hard origin/main'`

## Опции

| Флаг | Что делает |
|------|-----------|
| `--title` | заголовок (обязательно) |
| `--desc` | описание для страницы и Telegram-превью |
| `--slug` | явный slug (по умолчанию — транслит из title) |
| `--private` | закрытый ролик за код-гейтом LMS (**требует R2**) |
| `--storage repo\|r2` | где видео (по умолчанию repo; r2 — если есть `cap.config.json`) |
| `--push` | git add+commit+push в GitHub (без деплоя на сервер) |
| `--deploy` | push **и** `git reset --hard` на Яндекс-сервере (полный деплой) |

## Два этапа

- **Этап 1 (сейчас):** `storage=repo` — видео коммитится в репо рядом со
  страницей. Работает без внешних сервисов. Подходит для **публичных** роликов.
  Лимит GitHub — 100 МБ/файл; держи ролики короткими или переходи на R2.
- **Этап 2 (R2 + закрытые ролики):** заведи Cloudflare R2, скопируй
  `cap.config.example.json` → `cap.config.json`, заполни доступы. Тогда видео
  льётся в R2, а `--private` гейтит страницу тем же кодом доступа, что и база
  знаний (`os/app.jsx` → `AUTH_PROBE`, читается автоматически).
  Реально-приватные ссылки (умирают при утечке) — следующий шаг через
  Cloudflare Worker + подписанные URL, заодно с Telegram-авторизацией LMS.

## Реестр

Каждая публикация пишется в `v/_registry.json` — основа для каталога роликов
и блока «Loom-разборы» в базе знаний.
