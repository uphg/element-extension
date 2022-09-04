import { defineComponent, h } from "vue"

const staggeredProps = {
  tag: {
    type: String,
    default: 'div'
  }
}

export default defineComponent({
  name: 'EStaggeredTransitionGroup',
  props: staggeredProps,
  setup(props, context) {

    function beforeEnter() {

    }

    function enter() {

    }

    function leave() {

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
        leave
      }
    }, context.slots.default?.())
  }
})
