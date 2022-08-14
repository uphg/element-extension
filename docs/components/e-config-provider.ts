import { defineComponent, h, provide } from "vue";

const Config = Symbol('e-config')

export default defineComponent({
  setup(props, context) {
    provide(Config, { name: 'Jack' })
    return () => context.slots.default?.()
  }
})