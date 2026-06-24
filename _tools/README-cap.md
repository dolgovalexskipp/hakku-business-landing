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
| `--private` | закрытый ролик за код-гейтом LMS (требует storage=yc/r2) |
| `--storage yc\|repo\|r2` | где видео (по умолчанию **yc**, если задан `yc_storage`; иначе repo) |
| `--push` | git add+commit+push в GitHub (без деплоя на сервер) |
| `--deploy` | push **и** `git reset --hard` на Яндекс-сервере (полный деплой) |

## Хранилище видео

- **`storage=yc` (по умолчанию):** видео льётся в **YC Object Storage**
  (публичный бакет `video.business.hakku.ai`), в git попадает только лёгкая
  страница плеера. Доступы — в gitignored `cap.config.json` → `yc_storage`.
  Заливка через `boto3` (`uv run --with boto3`, нужен `uv` в PATH) —
  системный `aws cli` НЕ требуется. Это основной путь.
- **`storage=repo`:** видео коммитится в репо рядом со страницей. Только для
  совсем коротких публичных роликов — лимит GitHub 100 МБ/файл.
- **`storage=r2`:** Cloudflare R2 (legacy-опция, требует `aws cli` и блок `r2`).
- `--private` гейтит страницу тем же кодом доступа, что и база знаний
  (`os/app.jsx` → `AUTH_PROBE`). Бакет публичный → приватность «мягкая»
  (URL видео в открытом доступе для того, кто его извлечёт). Реально-приватные
  ссылки — следующий шаг (подписанные URL).

## Реестр

Каждая публикация пишется в `v/_registry.json` — основа для каталога роликов
и блока «Loom-разборы» в базе знаний.
