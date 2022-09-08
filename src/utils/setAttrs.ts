import { each } from "./each"

type Attrs = { [key: string]: string }

function setAttrs(el: Element | HTMLElement, attrs: Attrs) {
  each(attrs, (value, key) => el.setAttribute(key as string, value))
}

export default setAttrs