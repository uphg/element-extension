import { h, SetupContext } from 'vue'
import { FormItem } from 'element-ui'
import { useCustomInput } from './useCustomInput'
import { useElFormItem } from '../../../composables/useElFormItem'
import { ElFormItem } from "element-ui/types/form-item"
import { FormItemProps } from "./formItemProps"
import { generateProps } from 'src/utils/generateProps'

const propNames = ['label', 'labelWidth', 'prop', 'required', 'rules', 'error', 'validateStatus', 'for', 'inlineMessage', 'showMessage', 'size']

export function useFormItem(props: FormItemProps, context: SetupContext<{}>) {
  const { elFormItem, clearValidate } = useElFormItem()
  const { render, expose: customInputExpose } = useCustomInput(props, context, {
    onKeyup(event) {
      if (event.keyCode === 13) {
        // enter
      }
    }
  })

  const expose = {
    ...(customInputExpose ? customInputExpose : {}),
    clearValidate,
    get elFormItem() { return elFormItem.value }
  }

  const setRef = function(el: ElFormItem) {
    elFormItem.value = el
  } as unknown as string

  return {
    expose,
    render: () => h(FormItem, {
      ref: setRef,
      props: generateProps(props, propNames),
      scopedSlots: {
        error: (params) => context.slots.error?.(params),
      }
    }, [
      context.slots.label && h('slot', {
        slot: 'label'
      }, context.slots.label()),
      context.slots.itemPrefix?.(),
      (context.slots.default && props.type === 'text' && context.slots.default?.()) || [render()],
      context.slots.itemSuffix?.(),
    ])
  }
}