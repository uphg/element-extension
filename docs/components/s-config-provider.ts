import { defineComponent, h, provide } from "vue";

export default defineComponent({
  setup(props, context) {
    provide('s-config', { name: 'Jack' })
    return () => context.slots.default?.()
  }
})