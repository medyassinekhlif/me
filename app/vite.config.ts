import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserPageRepo = repository.toLowerCase().endsWith('.github.io')

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? (isUserPageRepo ? '/' : `/${repository}/`) : '/',
  plugins: [react()],
})
