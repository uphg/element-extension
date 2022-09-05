import { defineComponent, h } from "vue"

const transitionClass = 'staggered-fade'
const interval = 150

const staggeredProps = {
  tag: {
    type: String,
    default: 'div'
  }
}

function getInterval(el: HTMLElement) {
  return Number(el.getAttribute('data-index')) * interval
}

export default defineComponent({
  name: 'EStaggeredTransitionGroup',
  props: staggeredProps,
  setup(props, context) {

    function beforeEnter(el: HTMLElement) {
      el.style.opacity = `${0}`
      el.style.height = `${0}`
    }
    
    function enter(el: HTMLElement, done: () => void) {
      const delayed = getInterval(el)
      setTimeout(() => {
        el.style.opacity = `${1}`
        el.style.height = `${el.scrollHeight}px`
        done()
      }, delayed)
    }
    
    function afterEnter(el: HTMLElement) {
    }
    
    function beforeLeave(el: HTMLElement) {
      el.style.opacity = `${1}`
      el.style.height = `${el.scrollHeight}px`
    }
    
    function leave(el: HTMLElement, done: () => void) {
      const delayed = getInterval(el)
      setTimeout(() => {
        // void el.scrollHeight
        el.style.opacity = `${0}`
        el.style.height = `${0}`
        setTimeout(() => {
          done()
        }, 1000)
      }, delayed)
    }
    
    function afterLeave(el: HTMLElement) {
    }

    function renderChildren() {
      const defaults =  context.slots.default?.()
      console.log(defaults)
    }
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
