# Hakku.ai / Бизнес — preview лендинга

Превью-лендинг для нового продукта **Hakku.ai / Бизнес** — закрытого клуба для собственников малого и среднего бизнеса, которые внедряют ИИ в свои компании.

**Запуск продукта:** 8 июня 2026 (День предпринимательства).

## Стек

- HTML + React (через Babel-инлайн) — без сборки, открывается напрямую.
- Дизайн-система: community track из `hakku.ai Design System` (Tektur + Inter, чёрный канвас, holographic PNG-объекты).

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
