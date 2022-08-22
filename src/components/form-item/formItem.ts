import { defineComponent, h } from "vue"
import { FormItem } from "element-ui"
import { useCustomInput } from "./useCustomInput"
import { pick } from "../../utils"
import useElFormItem from "../../composables/useElFormItem"
import { ElFormItem } from "element-ui/types/form-item"
import { formItemProps } from "../../shared/formItemProps"

const propNames = ['label', 'labelWidth', 'prop', 'required', 'rules', 'error', 'validateStatus', 'for', 'inlineMessage', 'showMessage', 'size']

export default defineComponent({
  name: 'EFormItem',
  props: formItemProps,
  inheritAttrs: false,
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
      context.slots.label && h('slot', {
        slot: 'label'
      }, context.slots.label()),
      context.slots.itemPrefix?.(),
      (context.slots.default && props.type === 'text' && context.slots.default?.()) || render(),
      context.slots.itemSuffix?.(),
    ])
  }
})
