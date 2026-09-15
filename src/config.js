export const LINKS = {
  app: import.meta.env.VITE_APP_URL || 'https://boosty.to/aeronyx',
  download: import.meta.env.VITE_DOWNLOAD_URL || 'https://boosty.to/aeronyx',
  boosty: 'https://boosty.to/aeronyx',
  help: 'https://haku.featurebase.app/en',
  privacy:
    'https://haku.featurebase.app/en/help/articles/6230177-politika-konfidencialnosti',
}

export const NAV_ITEMS = [
  { id: 'product', label: 'Продукт' },
  { id: 'pipeline', label: 'Пайплайн' },
  { id: 'features', label: 'Возможности' },
  { id: 'team', label: 'Команда' },
  { id: 'pricing', label: 'Тарифы' },
]
