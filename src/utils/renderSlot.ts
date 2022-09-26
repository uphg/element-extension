import { defineComponent, h, SetupContext } from "vue";

export const FakeSlot = defineComponent({
  name: 'FakeSlot',
  setup(_props, context) {
    return () => context.slots.default?.()
  }
})

export function renderSlot(context: SetupContext<{}>, slotName: string) {
  const slots = context?.slots?.[slotName]?.()
  const data = { slot: slotName }
  return slots && (
    slots?.length === 1
      ? h(FakeSlot, data, slots)
      : slots?.length > 1
        ? slots.map((item) => h(FakeSlot, data, [item]))
        : slots && h(FakeSlot, data, slots)
  )
}

export function renderSlots(context: SetupContext<{}>, slotNames: string[]) {
  return slotNames.map((name) => context.slots[name] && renderSlot(context, name))
}