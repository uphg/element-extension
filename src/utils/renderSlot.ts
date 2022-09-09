import { defineComponent, h, SetupContext } from "vue";

export const FakeSlot = defineComponent({
  name: 'FakeSlot',
  setup(props, context) {
    return () => context.slots.default?.()
  }
})

export function renderSlot(context: SetupContext<{}>, slotName: string) {
  return context.slots[slotName] && h(FakeSlot, { slot: slotName }, context.slots[slotName]!())
}