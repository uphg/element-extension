import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import { highlight } from './highlight'

const demoPath = `${path.resolve('./docs/demo')}`

function getComponentName(sourceFile) {
  const names = sourceFile.split('/')
  return names.map((item) => item.replace(/^(\w)/, (_, c) => (c ? c.toUpperCase() : ''))).join('')
}

function markdownItSetup(md) {
  md.use(mdContainer, 'code', {
    validate(params) {
      return !!params.trim().match(/^code\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^code\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const sourceFileToken = tokens[idx + 2]
        if (!sourceFileToken) return
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(demoPath, `${sourceFile}.vue`),
            'utf-8'
          )
        }

        const componentName = getComponentName(sourceFile)
        const names = sourceFile.split('/')
        return `<e-code
          class="demo-${names[0]}"
          component-name="${componentName}"
          source="${encodeURIComponent(
          highlight(source, 'vue')
        )}"
          :part="${componentName}"
        >`
      } else {
        return '</e-code>'
      }
    },
  })
}

export default markdownItSetup