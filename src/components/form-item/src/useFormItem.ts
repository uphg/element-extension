import { h, SetupContext } from 'vue'
import { FormItem } from 'element-ui'
import { useElFormItem } from '../../../composables/useElFormItem'
import { ElFormItem } from "../../../../types/_element-ui"
import { elFormItemProps, FormItemProps } from "./formItemProps"
import { pick, renderSlot, keys } from '../../../utils'

export function useFormItem(
  props: FormItemProps,
  context?: SetupContext<{}>
) {
  const { elFormItem, clearValidate } = useElFormItem()
  const propNames = keys(elFormItemProps)
  const handleRef = ((el: ElFormItem) => elFormItem.value = el) as unknown as string

  return {
    expose: {
      clearValidate,
      get elFormItem() { return elFormItem.value }
    },
    render: () => h(FormItem, {
      ref: handleRef,
      props: pick(props, propNames),
      scopedSlots: {
        error: context?.slots?.error && ((params) => context.slots.error?.(params)),
      }
    }, context?.slots && [renderSlot(context, 'label'), context.slots.default?.()])
  }
}