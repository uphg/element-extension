import camelize from './_camelize'

export const addClass = (el: Element, ...className: string[]) => {
  if (!el) return
  el.classList.add(...className)
}

export const removeClass = (el: Element, ...className: string[]) => {
  if (!el) return
  el.classList.remove(...className)
}

export const getStyle = (el: Element, styleName: string) => {
  // const style = window.getComputedStyle(el, null) as unknown as { [key: string]: string }
  // return style
  styleName = camelize(styleName)
  // see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle#defaultview
  const computed = document.defaultView?.getComputedStyle(el, '')

  // @ts-ignore
  return computed && computed?.[styleName]
}
