# Jffect lib

Библиотека веб-эффектов (Vite + Vanilla JS + CSS).

## Запуск
```bash
npm install
npm run dev     # демо-сайт на http://localhost:5173
npm run build   # сборка ядра в dist/jffect.js (ES-модуль)
```

## Контроль веса бандла
Лимит задаётся в `vite.config.js` (`SIZE_LIMIT_KB`).
Сейчас стоит 1.0 КБ — сборка намеренно падает с `process.exit(1)` (демонстрация сбоя).
Для нормальной сборки поставьте `50`.

## Эффекты
- `.jf-hover-scale` — масштабирование при наведении
- `.jf-fade` — плавное появление при прокрутке (IntersectionObserver)
