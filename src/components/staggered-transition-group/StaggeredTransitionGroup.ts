import { addClass, removeClass } from "../../utils/dom"
import { defineComponent, h } from "vue"

const transitionClass = 'e-staggered-transition-fade'
const transitionTime = 800
const interval = 150

const staggeredProps = {
  tag: {
    type: String,
    default: 'div'
  }
}

function beforeEnter(el: HTMLElement) {
  addClass(el, transitionClass)
  el.style.transition = 
  el.style.opacity = `${0}`
  el.style.height = `${0}`
}

function enter(el: HTMLElement, done: () => void) {
  const delayed = getInterval(el)
  setTimeout(() => {
    el.style.opacity = `${1}`
    el.style.height = `${el.scrollHeight}px`
    void el.scrollHeight
    setTimeout(() => {
      done()
    }, transitionTime)
  }, delayed)
}

function afterEnter(el: HTMLElement) {
  removeClass(el, transitionClass)
}

function beforeLeave(el: HTMLElement) {
  addClass(el, transitionClass)
  el.style.opacity = `${1}`
  el.style.height = `${el.scrollHeight}px`
}

function leave(el: HTMLElement, done: () => void) {
  const delayed = getInterval(el)
  setTimeout(() => {
    el.style.opacity = `${0}`
    el.style.height = `${0}`
    setTimeout(() => {
      done()
    }, transitionTime)
  }, delayed)
}

function afterLeave(el: HTMLElement) {
  removeClass(el, transitionClass)
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
    }, context.slots.default?.())
  }
})
