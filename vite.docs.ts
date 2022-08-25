import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue2'
import Markdown from 'vite-plugin-md'
import markdownItSetup from './plugins/markdownItSetup'
import { highlight } from './plugins/highlight';

const toPath = (p) => `${path.resolve(__dirname, p)}/`

// https://vitejs.dev/config/
export default defineConfig({
  base: '/element-part/',
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
    Markdown({
      markdownItOptions: {
        highlight(str, lang) {
          if (lang) {
            try {
              return highlight(str, lang)
            } catch (__) {}
          }
      
          return ''; // use external default escaping
        }
      },
      markdownItSetup
    }),
  ]
})
