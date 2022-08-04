import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue2'

// const srcPath = `${path.resolve(__dirname, './src')}/`

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SimElement',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'element-ui'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'element-ui': 'ELEMENT'
        }
      }
    }
  },
  plugins: [vue({
    include: [/\.vue$/], // <--
  })]
})
