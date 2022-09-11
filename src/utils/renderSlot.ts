import { defineComponent, h, SetupContext } from "vue";

export const FakeSlot = defineComponent({
  name: 'FakeSlot',
  setup(_props, context) {
    return () => context.slots.default?.()
  }
})

export function renderSlot(context: SetupContext<{}>, slotName: string) {
  return context.slots[slotName] && h(FakeSlot, { slot: slotName }, context.slots[slotName]!())
}

export function renderSlots(context: SetupContext<{}>, slotNames: string[]) {
  return slotNames.map((name) => context.slots[name] && h(FakeSlot, { slot: name }, context.slots[name]!()))
}