import { h, SetupContext } from 'vue'
import { FormItem } from 'element-ui'
import { useCustomInput } from './useCustomInput'
import { useElFormItem } from '../../../composables/useElFormItem'
import { ElFormItem } from "element-ui/types/form-item"
import { FormItemProps } from "./formItemProps"
import { pick } from '../../../utils'
import { renderSlot } from '../../../utils/renderSlot'

const propNames = ['label', 'labelWidth', 'prop', 'required', 'rules', 'error', 'validateStatus', 'for', 'inlineMessage', 'showMessage', 'size']

export function useFormItem(props: FormItemProps, context?: SetupContext<{}>) {
  const { elFormItem, clearValidate } = useElFormItem()
  // const { render, expose: customInputExpose } = useCustomInput(props, context, {
  //   onKeyup(event) {
  //     if (event.keyCode === 13) {
  //       // enter
  //     }
  //   }
  // })

  const { render: renderInput, expose: customInputExpose } = context && useCustomInput(props, context) || {}

  const expose = {
    ...(customInputExpose ? customInputExpose : {}),
    clearValidate,
    get elFormItem() { return elFormItem.value }
  }

  const handleRef = function(el: ElFormItem) {
    elFormItem.value = el
  } as unknown as string

  return {
    expose,
    render() {
      const slots = context && [
        renderSlot(context, 'label'),
        context.slots.itemPrefix?.(),
        (context.slots.default && (props.type === 'text' || !props.type) && context.slots.default?.()) || [renderInput?.()],
        context.slots.itemSuffix?.(),
      ]
      return h(FormItem, {
        ref: handleRef,
        props: pick(props, propNames),
        scopedSlots: {
          error: context && ((params) => context.slots.error?.(params)),
        }
      }, slots)
    }
  }
}