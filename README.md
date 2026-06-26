# Hakku.ai / Бизнес — preview лендинга

Превью-лендинг для нового продукта **Hakku.ai / Бизнес** — закрытого клуба для собственников малого и среднего бизнеса, которые внедряют ИИ в свои компании.

**Запуск продукта:** 8 июня 2026 (День предпринимательства).

## Стек

- HTML + React (production UMD). JSX из `components/*.jsx` **прекомпилируется** в `app.bundle.js` — в рантайме нет Babel (быстрая загрузка на мобиле).
- Дизайн-система: community track из `hakku.ai Design System` (Tektur + Inter, чёрный канвас, holographic PNG-объекты).

## Сборка

Источник правды — `components/*.jsx`. После правки нужно пересобрать бандл:

```bash
npm install          # один раз: ставит @babel и включает git-хук
node _tools/build.mjs # пересобирает app.bundle.js + кэш-бастит index.html
```

Pre-commit хук (`.githooks/pre-commit`, включается через `npm install`) делает это
автоматически на каждый коммит и стейджит `app.bundle.js` + `index.html`, так что
бандл не рассинхронизируется с исходниками. `npm install` обязателен один раз на машине.

## Структура

```
.
├── index.html                  ← точка входа
├── components/                 ← React-компоненты лендинга
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── Idea.jsx
│   ├── Inside.jsx
│   ├── Program.jsx
│   ├── Pricing.jsx
│   ├── Founders.jsx
│   ├── FinalCTA.jsx
│   └── Footer.jsx
└── design_system/
    ├── colors_and_type.css     ← токены и типографика
    ├── fonts/                  ← Tektur (TTF, локально)
    └── assets/                 ← логотип + holographic PNG для героев
```

## Локальный запуск

```bash
python3 -m http.server 8080
open http://localhost:8080
```

## Деплой

GitHub Pages из ветки `main` (root). Production URL — см. вкладку `Settings → Pages`.
