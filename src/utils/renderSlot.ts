import { h, SetupContext } from "vue";

export function renderSlot(context: SetupContext<{}>, slotName: string) {
  return context.slots[slotName] && h('slot', { slot: slotName }, context.slots[slotName]!())
}