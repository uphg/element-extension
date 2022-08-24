import { defineComponent, h, SetupContext } from "vue"
import { FormItem } from "element-ui"
import { useCustomInput } from "./useCustomInput"
import useElFormItem from "../../composables/useElFormItem"
import { ElFormItem } from "element-ui/types/form-item"
import { FormItemProps, formItemProps } from "./formItemProps"

export function useFormItem(props: FormItemProps, context: SetupContext<{}>) {
  const { elFormItem, clearValidate } = useElFormItem()
    const { render, expose } = useCustomInput(props, context, {
      onKeyup(event) {
        if (event.keyCode !== 13) return
        // 执行回车
      }
    })

    context.expose({
      ...(expose ? expose : {}),
      clearValidate,
      get elFormItem() {
        return elFormItem.value
      }
    })

    return () => h(FormItem, {
      // @ts-ignore
      ref: (el: ElFormItem) => elFormItem.value = el,
      props: {
        label: props.label,
        labelWidth: props.labelWidth,
        prop: props.prop,
        required: props.required,
        rules: props.rules,
        error: props.error,
        validateStatus: props.validateStatus,
        for: props.for,
        inlineMessage: props.inlineMessage,
        showMessage: props.showMessage,
        size: props.size
      },
      scopedSlots: {
        error: (params) => context.slots.error?.(params),
      }
    }, [
      context.slots.label && h('slot', {
        slot: 'label'
      }, context.slots.label()),
      context.slots.itemPrefix?.(),
      (context.slots.default && props.type === 'text' && context.slots.default?.()) || render(),
      context.slots.itemSuffix?.(),
    ])
}