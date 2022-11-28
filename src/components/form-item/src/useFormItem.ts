import { h, SetupContext } from 'vue'
import { FormItem } from 'element-ui'
import { baseFormItemProps, FormItemProps, globalFormItemProps, GlobalFormItemProps } from "./formItemProps"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { useElFormItem } from '../../../composables/useElFormItem'
import { renderSlot, keys } from '../../../utils'
import { ElFormItem } from "../../../../types/_element-ui"
import { ObjectLike } from '../../../../types/_common'

export function useFormItem(
  props: FormItemProps,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<FormItemProps | ObjectLike, GlobalFormItemProps>
) {
  const { handleProps, handleRef: _handleRef, handleScopedSlots, renderChildren: _renderChildren } = options || {}
  const { elFormItem, clearValidate } = useElFormItem()

  const propNames = keys(baseFormItemProps)
  const globalPropNames = keys(globalFormItemProps)
  const { createProps } = useComponentProps(props, 'formItem', { propNames, globalPropNames, handleProps })
  const handleRef = (_handleRef || ((el: ElFormItem) => elFormItem.value = el)) as unknown as string
  const scopedSlots = handleScopedSlots?.(context?.slots)

  return {
    expose: {
      clearValidate,
      get elFormItem() { return elFormItem.value }
    },
    render: () => h(FormItem, {
      ref: handleRef,
      props: createProps(),
      scopedSlots: scopedSlots || {
        error: context?.slots?.error && ((params) => context.slots.error?.(params)),
      }
    }, context?.slots && [renderSlot(context, 'label'), context.slots.default?.()])
  }
}