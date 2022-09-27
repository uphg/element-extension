import { addClass, removeClass, setStyle } from "../../utils/dom"
import { defineComponent, h } from "vue"
import { ElementPartComponent } from "../../types"
import { VNodeData } from "vue/types/umd"

const staggeredProps = {
  tag: {
    type: String,
    default: 'div'
  },
  appear: {
    type: Boolean,
    default: false
  },
  stop: {
    type: Boolean,
    default: false
  }
}

const transitionClass = 'e-staggered-transition-fade'
const transitionTime = 800
const interval = 150

function revertStyle(el: HTMLElement) {
  setStyle(el, { opacity: 1, height: `${el.scrollHeight}px`, paddingTop: '', paddingBottom: '', borderTopWidth: '', borderBottomWidth: '', marginTop: '', marginBottom: '', })
}

function resetStyle(el: HTMLElement) {
  setStyle(el, { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' })
}

function clearStyle(el: HTMLElement) {
  removeClass(el, transitionClass)
  setStyle(el, { opacity: '', height: '', paddingTop: '', paddingBottom: '', borderTopWidth: '', borderBottomWidth: '', marginTop: '', marginBottom: '', overflow: '' })
}

function getInterval(el: HTMLElement) {
  return Number(el.getAttribute('data-index')) * interval
}

const EStaggeredTransitionGroup = defineComponent({
  name: 'EStaggeredTransitionGroup',
  props: staggeredProps,
  setup(props, context) {
    function beforeEnter(el: HTMLElement) {
      addClass(el, transitionClass)
      resetStyle(el)
    }
    
    function enter(el: HTMLElement, done: () => void) {
      const delayed = getInterval(el)
      setTimeout(() => {
        revertStyle(el)
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
      revertStyle(el)
    }
    
    function leave(el: HTMLElement, done: () => void) {
      const delayed = getInterval(el)
      setTimeout(() => {
        resetStyle(el)
        setTimeout(() => {
          done()
        }, transitionTime)
      }, delayed)
    }
    
    function afterLeave(el: HTMLElement) {
      clearStyle(el)
    }    

    return () => {
      const on: VNodeData['on'] | undefined = props.stop ? void 0 : {
        beforeEnter,
        enter,
        afterEnter,
        beforeLeave,
        leave,
        afterLeave
      }
      const _props = props.stop ? {} : {
        name: 'staggered-fade',
        css: false,
        appear: props.appear
      }
      const tag = props.stop ? props.tag : 'transition-group'
      return h(tag, {
        props: {
          tag: props.tag,
          ..._props
        },
        on
      }, context.slots.default?.().map((item) => item))
    }
  }
})

export default EStaggeredTransitionGroup as ElementPartComponent<typeof EStaggeredTransitionGroup>
