import { addClass, getStyle, removeClass, setStyle } from "../../utils/dom"
import { defineComponent, h } from "vue"

const staggeredProps = {
  tag: {
    type: String,
    default: 'div'
  }
}

const transitionClass = 'e-staggered-transition-fade'
const transitionTime = 800
const interval = 150

function beforeEnter(el: HTMLElement) {
  addClass(el, transitionClass)
  setStyle(el, { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' })
}

function enter(el: HTMLElement, done: () => void) {
  const delayed = getInterval(el)
  setTimeout(() => {
    setStyle(el, { opacity: 1, height: `${el.scrollHeight}px`, marginTop: '', marginBottom: ''})
    setTimeout(() => {
      done()
    }, transitionTime)
  }, delayed)
}

function afterEnter(el: HTMLElement) {
  clearStyle(el)
}

function beforeLeave(el: HTMLElement) {
  addClass(el, transitionClass)
  setStyle(el, { opacity: 1, height: `${el.scrollHeight}px`, marginTop: '', marginBottom: '', })
}

function leave(el: HTMLElement, done: () => void) {
  const delayed = getInterval(el)
  setTimeout(() => {
    setStyle(el, { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' })
    setTimeout(() => {
      done()
    }, transitionTime)
  }, delayed)
}

function afterLeave(el: HTMLElement) {
  clearStyle(el)
}

function clearStyle(el: HTMLElement) {
  removeClass(el, transitionClass)
  setStyle(el, { opacity: '', height: '', marginTop: '', marginBottom: '', overflow: '' })
}

function getInterval(el: HTMLElement) {
  return Number(el.getAttribute('data-index')) * interval
}

export default defineComponent({
  name: 'EStaggeredTransitionGroup',
  props: staggeredProps,
  setup(props, context) {
    return () => h('transition-group', {
      props: {
        tag: props.tag,
        name: 'staggered-fade',
        css: false
      },
      on: {
        beforeEnter,
        enter,
        afterEnter,
        beforeLeave,
        leave,
        afterLeave
      }
    }, context.slots.default?.().map((item) => {
      return item
    }))
  }
})
