// vite.docs.ts
import { defineConfig } from "vite";
import path2 from "path";
import vue from "@vitejs/plugin-vue2";
import Markdown from "vite-plugin-md";

// plugins/markdownItSetup.ts
import path from "path";
import fs from "fs";
import mdContainer from "markdown-it-container";

// plugins/highlight.ts
import escapeHtml from "escape-html";
import prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";
loadLanguages(["markup", "css", "javascript"]);
function wrap(code, lang) {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<pre v-pre><code>${code}</code></pre>`;
}
var highlight = (str, lang) => {
  if (!lang) {
    return wrap(str, "text");
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  if (lang === "vue" || lang === "html") {
    lang = "markup";
  }
  if (lang === "md") {
    lang = "markdown";
  }
  if (lang === "ts") {
    lang = "typescript";
  }
  if (lang === "py") {
    lang = "python";
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch {
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, "text");
};

// plugins/markdownItSetup.ts
var demoPath = `${path.resolve("./docs/demo")}`;
function getComponentName(sourceFile) {
  const names = sourceFile.split("/");
  return names.map((item) => item.replace(/^(\w)/, (_, c) => c ? c.toUpperCase() : "")).join("");
}
function markdownItSetup(md) {
  md.use(mdContainer, "code", {
    validate(params) {
      return !!params.trim().match(/^code\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^code\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const sourceFileToken = tokens[idx + 2];
        if (!sourceFileToken)
          return;
        let source = "";
        const sourceFile = sourceFileToken.children?.[0].content ?? "";
        if (sourceFileToken.type === "inline") {
          source = fs.readFileSync(
            path.resolve(demoPath, `${sourceFile}.vue`),
            "utf-8"
          );
        }
        const componentName = getComponentName(sourceFile);
        const names = sourceFile.split("/");
        return `<s-code
          class="demo-${names[0]}"
          source="${encodeURIComponent(
          highlight(source, "vue")
        )}"
          :part="${componentName}"
        >`;
      } else {
        return "</s-code>";
      }
    }
  });
}
var markdownItSetup_default = markdownItSetup;

// vite.docs.ts
var toPath = (p) => `${path2.resolve("D:\\Coding\\Project\\sim-element", p)}/`;
var vite_docs_default = defineConfig({
  resolve: {
    alias: [
      {
        find: "src/",
        replacement: toPath("./src")
      },
      {
        find: "docs/",
        replacement: toPath("./docs")
      },
      {
        find: "demo/",
        replacement: toPath("./demo")
      }
    ]
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({ markdownItSetup: markdownItSetup_default })
  ]
});
export {
  vite_docs_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5kb2NzLnRzIiwgInBsdWdpbnMvbWFya2Rvd25JdFNldHVwLnRzIiwgInBsdWdpbnMvaGlnaGxpZ2h0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUyJ1xyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tbWQnXHJcbmltcG9ydCBtYXJrZG93bkl0U2V0dXAgZnJvbSAnLi9wbHVnaW5zL21hcmtkb3duSXRTZXR1cCdcclxuXHJcbmNvbnN0IHRvUGF0aCA9IChwKSA9PiBgJHtwYXRoLnJlc29sdmUoXCJEOlxcXFxDb2RpbmdcXFxcUHJvamVjdFxcXFxzaW0tZWxlbWVudFwiLCBwKX0vYFxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ3NyYy8nLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiB0b1BhdGgoJy4vc3JjJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnZG9jcy8nLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiB0b1BhdGgoJy4vZG9jcycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ2RlbW8vJyxcclxuICAgICAgICByZXBsYWNlbWVudDogdG9QYXRoKCcuL2RlbW8nKSxcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLCAvLyA8LS1cclxuICAgIH0pLFxyXG4gICAgTWFya2Rvd24oeyBtYXJrZG93bkl0U2V0dXAgfSksXHJcbiAgXVxyXG59KVxyXG4iLCAiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgbWRDb250YWluZXIgZnJvbSAnbWFya2Rvd24taXQtY29udGFpbmVyJ1xyXG5pbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tICcuL2hpZ2hsaWdodCdcclxuXHJcbmNvbnN0IGRlbW9QYXRoID0gYCR7cGF0aC5yZXNvbHZlKCcuL2RvY3MvZGVtbycpfWBcclxuXHJcbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUoc291cmNlRmlsZSkge1xyXG4gIGNvbnN0IG5hbWVzID0gc291cmNlRmlsZS5zcGxpdCgnLycpXHJcbiAgcmV0dXJuIG5hbWVzLm1hcCgoaXRlbSkgPT4gaXRlbS5yZXBsYWNlKC9eKFxcdykvLCAoXywgYykgPT4gKGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJykpKS5qb2luKCcnKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrZG93bkl0U2V0dXAobWQpIHtcclxuICBtZC51c2UobWRDb250YWluZXIsICdjb2RlJywge1xyXG4gICAgdmFsaWRhdGUocGFyYW1zKSB7XHJcbiAgICAgIHJldHVybiAhIXBhcmFtcy50cmltKCkubWF0Y2goL15jb2RlXFxzKiguKikkLylcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyKHRva2VucywgaWR4KSB7XHJcbiAgICAgIGNvbnN0IG0gPSB0b2tlbnNbaWR4XS5pbmZvLnRyaW0oKS5tYXRjaCgvXmNvZGVcXHMqKC4qKSQvKVxyXG4gICAgICBpZiAodG9rZW5zW2lkeF0ubmVzdGluZyA9PT0gMSAvKiBtZWFucyB0aGUgdGFnIGlzIG9wZW5pbmcgKi8pIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VGaWxlVG9rZW4gPSB0b2tlbnNbaWR4ICsgMl1cclxuICAgICAgICBpZiAoIXNvdXJjZUZpbGVUb2tlbikgcmV0dXJuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9ICcnXHJcbiAgICAgICAgY29uc3Qgc291cmNlRmlsZSA9IHNvdXJjZUZpbGVUb2tlbi5jaGlsZHJlbj8uWzBdLmNvbnRlbnQgPz8gJydcclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZUZpbGVUb2tlbi50eXBlID09PSAnaW5saW5lJykge1xyXG4gICAgICAgICAgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoZGVtb1BhdGgsIGAke3NvdXJjZUZpbGV9LnZ1ZWApLFxyXG4gICAgICAgICAgICAndXRmLTgnXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZShzb3VyY2VGaWxlKVxyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gc291cmNlRmlsZS5zcGxpdCgnLycpXHJcbiAgICAgICAgcmV0dXJuIGA8cy1jb2RlXHJcbiAgICAgICAgICBjbGFzcz1cImRlbW8tJHtuYW1lc1swXX1cIlxyXG4gICAgICAgICAgc291cmNlPVwiJHtlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICBoaWdobGlnaHQoc291cmNlLCAndnVlJylcclxuICAgICAgICApfVwiXHJcbiAgICAgICAgICA6cGFydD1cIiR7Y29tcG9uZW50TmFtZX1cIlxyXG4gICAgICAgID5gXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICc8L3MtY29kZT4nXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFya2Rvd25JdFNldHVwIiwgIi8vIHJlZiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdml0ZXByZXNzL2Jsb2IvbWFpbi9zcmMvbm9kZS9tYXJrZG93bi9wbHVnaW5zL2hpZ2hsaWdodC50c1xyXG5pbXBvcnQgZXNjYXBlSHRtbCBmcm9tICdlc2NhcGUtaHRtbCdcclxuaW1wb3J0IHByaXNtIGZyb20gJ3ByaXNtanMnXHJcbi8vIGltcG9ydCBjb25zb2xhIGZyb20gJ2NvbnNvbGEnXHJcbmltcG9ydCBsb2FkTGFuZ3VhZ2VzIGZyb20gJ3ByaXNtanMvY29tcG9uZW50cy9pbmRleC5qcydcclxuXHJcbi8vIHByaXNtIGlzIGxpc3RlZCBhcyBhY3R1YWwgZGVwIHNvIGl0J3Mgb2sgdG8gcmVxdWlyZVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xyXG4vLyBjb25zdCBsb2FkTGFuZ3VhZ2VzID0gcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL2luZGV4JylcclxuXHJcbi8vIHJlcXVpcmVkIHRvIG1ha2UgZW1iZWRkZWQgaGlnaGxpZ2h0aW5nIHdvcmsuLi5cclxubG9hZExhbmd1YWdlcyhbJ21hcmt1cCcsICdjc3MnLCAnamF2YXNjcmlwdCddKVxyXG5cclxuZnVuY3Rpb24gd3JhcChjb2RlLCBsYW5nKSB7XHJcbiAgaWYgKGxhbmcgPT09ICd0ZXh0Jykge1xyXG4gICAgY29kZSA9IGVzY2FwZUh0bWwoY29kZSlcclxuICB9XHJcbiAgcmV0dXJuIGA8cHJlIHYtcHJlPjxjb2RlPiR7Y29kZX08L2NvZGU+PC9wcmU+YFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKHN0ciwgbGFuZykgPT4ge1xyXG4gIGlmICghbGFuZykge1xyXG4gICAgcmV0dXJuIHdyYXAoc3RyLCAndGV4dCcpXHJcbiAgfVxyXG4gIGxhbmcgPSBsYW5nLnRvTG93ZXJDYXNlKClcclxuICBjb25zdCByYXdMYW5nID0gbGFuZ1xyXG4gIGlmIChsYW5nID09PSAndnVlJyB8fCBsYW5nID09PSAnaHRtbCcpIHtcclxuICAgIGxhbmcgPSAnbWFya3VwJ1xyXG4gIH1cclxuICBpZiAobGFuZyA9PT0gJ21kJykge1xyXG4gICAgbGFuZyA9ICdtYXJrZG93bidcclxuICB9XHJcbiAgaWYgKGxhbmcgPT09ICd0cycpIHtcclxuICAgIGxhbmcgPSAndHlwZXNjcmlwdCdcclxuICB9XHJcbiAgaWYgKGxhbmcgPT09ICdweScpIHtcclxuICAgIGxhbmcgPSAncHl0aG9uJ1xyXG4gIH1cclxuICBpZiAoIXByaXNtLmxhbmd1YWdlc1tsYW5nXSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbG9hZExhbmd1YWdlcyhbbGFuZ10pXHJcbiAgICB9IGNhdGNoIHtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHByaXNtLmxhbmd1YWdlc1tsYW5nXSkge1xyXG4gICAgY29uc3QgY29kZSA9IHByaXNtLmhpZ2hsaWdodChzdHIsIHByaXNtLmxhbmd1YWdlc1tsYW5nXSwgbGFuZylcclxuICAgIHJldHVybiB3cmFwKGNvZGUsIHJhd0xhbmcpXHJcbiAgfVxyXG4gIHJldHVybiB3cmFwKHN0ciwgJ3RleHQnKVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPQSxXQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7OztBQ0hyQixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxpQkFBaUI7OztBQ0R4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFdBQVc7QUFFbEIsT0FBTyxtQkFBbUI7QUFPMUIsY0FBYyxDQUFDLFVBQVUsT0FBTyxZQUFZLENBQUM7QUFFN0MsU0FBUyxLQUFLLE1BQU0sTUFBTTtBQUN4QixNQUFJLFNBQVMsUUFBUTtBQUNuQixXQUFPLFdBQVcsSUFBSTtBQUFBLEVBQ3hCO0FBQ0EsU0FBTyxvQkFBb0I7QUFDN0I7QUFFTyxJQUFNLFlBQVksQ0FBQyxLQUFLLFNBQVM7QUFDdEMsTUFBSSxDQUFDLE1BQU07QUFDVCxXQUFPLEtBQUssS0FBSyxNQUFNO0FBQUEsRUFDekI7QUFDQSxTQUFPLEtBQUssWUFBWTtBQUN4QixRQUFNLFVBQVU7QUFDaEIsTUFBSSxTQUFTLFNBQVMsU0FBUyxRQUFRO0FBQ3JDLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxTQUFTLE1BQU07QUFDakIsV0FB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
