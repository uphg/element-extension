/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module 'element-ui/src/utils/date-util' {
  const formatDate: (date: string | number, format: string) => string
  export {
    formatDate
  }
}

declare module 'element-ui/src/utils/types' {
  const isFunction: (value: unknown) => boolean
  export {
    isFunction
  }
}

declare module 'element-ui/src/locale' {
  const t: (path: string, options?: any) => string
  const use: (l: string) => void
  const i18n: (fn: () => void) => void
  export {
    t,
    use,
    i18n
  }
}
