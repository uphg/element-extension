import { h, SetupContext } from 'vue'
import { FormItem } from 'element-ui'
import { useCustomInput } from './useCustomInput'
import { useElFormItem } from '../../../composables/useElFormItem'
import { ElFormItem } from "../../../../types/_element-ui"
import { formItemBaseProps, FormItemProps, FormItemType, GlobalFormItemProps } from "./formItemProps"
import { pick, isUndefined, renderSlot, keys } from '../../../utils'
import { useGlobalProps } from '../../../composables/useGlobalProps'

function handleType(type: FormItemType | undefined, globalType?: string) {
  const _type = isUndefined(type) ? globalType : type
  const result = _type === 'input' ? 'text' : _type
  return result as (FormItemType | undefined)
}

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
  const type = handleType(props.type, globalProps?.type)

  const { render: renderInput, expose: customInputExpose } = (
    context
      && type
      && !(type === 'text' && context.slots.default))
      && useCustomInput(props, { context, type }
    ) || {}


  const expose = {
    ...(customInputExpose || {}),
    clearValidate,
    get elFormItem() { return elFormItem.value }
  }

  const handleRef = ((el: ElFormItem) => elFormItem.value = el) as unknown as string

  return {
    expose,
    render: () =>  {
      const slotDefault = context?.slots.default && (props.type === 'text' || !props.type) ? context.slots.default : renderInput

      return h(FormItem, {
        ref: handleRef,
        props: pick(props, propNames),
        scopedSlots: {
          error: context?.slots?.error && ((params) => context.slots.error?.(params)),
        }
      }, context?.slots && [
        renderSlot(context, 'label'),
        context.slots.itemPrefix?.(),
        slotDefault?.(),
        context.slots.itemSuffix?.(),
      ])
    }
  }
}