import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue2'
import Markdown from 'vite-plugin-md'
import markdownItSetup from './plugins/markdownItSetup'

const toPath = (p) => `${path.resolve(__dirname, p)}/`

// https://vitejs.dev/config/
export default defineConfig({
  base: '/small-element/',
  build: {
    outDir: 'dist-docs'
  },
  resolve: {
    alias: [
      {
        find: 'src/',
        replacement: toPath('./src'),
      },
      {
        find: 'docs/',
        replacement: toPath('./docs'),
      },
      {
        find: 'demo/',
        replacement: toPath('./demo'),
      }
    ]
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown({ markdownItSetup }),
  ]
})
