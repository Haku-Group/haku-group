import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function pagesBase() {
  if (process.env.VITE_BASE) return process.env.VITE_BASE
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (!repo) return '/'
  if (repo.endsWith('.github.io')) return '/'
  return `/${repo}/`
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
})
