import { defineComponent, h, PropType, ExtractPropTypes } from "vue"
import { FormItem } from "element-ui"
import { useCustomInput } from "./useCustomInput"
import { CustomInputProps, customInputProps } from "../../shared/customInputProps"
import { pick } from "../../utils"
import useElFormItem from "../../composables/useElFormItem"
import { ElFormItem } from "element-ui/types/form-item"
import { elFormItemProps } from "../../shared/elFormItemProps"

export type ElFormItemProps = ExtractPropTypes<typeof elFormItemProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

const propNames = ['label', 'labelWidth', 'prop', 'required', 'rules', 'error', 'validateStatus', 'for', 'inlineMessage', 'showMessage', 'size']

const formItemProps = {
  ...elFormItemProps,
  ...customInputProps
}



export default defineComponent({
  name: 'EFormItem',
  props: formItemProps,
  setup(props, context) {
    const { elFormItem, clearValidate } = useElFormItem()
    const { render, expose } = useCustomInput(props, context, {
      onKeyup(event) {
        if (event.keyCode !== 13) return
        // 执行回车
      }
    })

    context.expose({
      ...(expose ? expose : {}),
      get elFormItem() {
        return elFormItem.value
      },
      clearValidate
    })

    
    return () => h(FormItem, {
      // @ts-ignore
      ref: (el: ElFormItem) => elFormItem.value = el,
      props: pick(props, propNames),
      scopedSlots: {
        error: (params) => context.slots.error?.(params),
      }
    }, [
      context.slots.itemPrefix?.(),
      context.slots.default?.() || render(),
      context.slots.itemSuffix?.(),
    ])
  }
})
