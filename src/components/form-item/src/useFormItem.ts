import { h, SetupContext } from 'vue'
import { FormItem } from 'element-ui'
import { useCustomInput } from './useCustomInput'
import { useElFormItem } from '../../../composables/useElFormItem'
import { ElFormItem } from "element-ui/types/form-item"
import { formItemBaseProps, FormItemProps, GlobalFormItemProps } from "./formItemProps"
import { pick, isUndefined, renderSlot, keys } from '../../../utils'
import { useGlobalProps } from '../../../composables/useGlobalProps'

export function useFormItem(props: FormItemProps, context?: SetupContext<{}>) {
  const { elFormItem, clearValidate } = useElFormItem()
  // const { render, expose: customInputExpose } = useCustomInput(props, context, {
  //   onKeyup(event) {
  //     if (event.keyCode === 13) {
  //       // enter
  //     }
  //   }
  // })
  const propNames = keys(formItemBaseProps)
  const globalProps = useGlobalProps<GlobalFormItemProps>('formItem')
  const type = isUndefined(props.type) ? globalProps?.type : props.type 

  const { render: renderInput, expose: customInputExpose } = (context && type) && useCustomInput(props, { context, type }) || {}

  const expose = {
    ...(customInputExpose || {}),
    clearValidate,
    get elFormItem() { return elFormItem.value }
  }

  const handleRef = function(el: ElFormItem) {
    elFormItem.value = el
  } as unknown as string

  return {
    expose,
    render() {
      const slots = context?.slots && [
        renderSlot(context, 'label'),
        context.slots.itemPrefix?.(),
        (context.slots.default && (props.type === 'text' || !props.type) && context.slots.default?.()) || [renderInput?.()],
        context.slots.itemSuffix?.(),
      ]
      return h(FormItem, {
        ref: handleRef,
        props: pick(props, propNames),
        scopedSlots: {
          error: context?.slots?.error && ((params) => context.slots.error?.(params)),
        }
      }, slots)
    }
  }
}