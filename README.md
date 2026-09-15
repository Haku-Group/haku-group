# Haku Editor — лендинг

SPA-лендинг на React для SaaS-редактора сканлейта **Haku Editor**.

## Стек

- React 19 + Vite
- React Router
- Motion (пружины, жесты, `prefers-reduced-motion`)

## Запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Ссылки

В `.env` можно задать:

```
VITE_APP_URL=https://...
VITE_DOWNLOAD_URL=https://...
```

По умолчанию CTA ведут на [Boosty](https://boosty.to/aeronyx).

## GitHub Pages

Каждый пуш в `main` или `master` собирает сайт и выкладывает его через Actions.

1. Создайте репозиторий и запушьте проект.
2. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Дождитесь workflow **Deploy GitHub Pages**.

Сайт будет по адресу `https://<user>.github.io/<repo>/`. Для репозитория вида `<user>.github.io` корень будет `/`.

Если нужен свой префикс (например кастомный домен), задайте в workflow переменную `VITE_BASE` (`/` или `/subdir/`).
