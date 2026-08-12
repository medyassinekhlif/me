const fs = require('node:fs')
const path = require('node:path')

const distDir = path.resolve(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')
const fallbackPath = path.join(distDir, '404.html')

if (!fs.existsSync(indexPath)) {
  console.error('Cannot create SPA fallback because dist/index.html does not exist.')
  process.exit(1)
}

fs.copyFileSync(indexPath, fallbackPath)
