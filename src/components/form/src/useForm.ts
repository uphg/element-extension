import { h, SetupContext } from "vue"
import { ElForm } from "element-ui/types/form"
import { FormProps } from "./formProps"
import { useElForm } from "../../../composables/useElForm"
import { Form } from "element-ui"

export function useForm(props: FormProps, context: SetupContext<{}>) {
  const { elForm, validate, validateField, clearValidate } = useElForm()

  function setRef(el: ElForm) {
    elForm.value = el
  }

  context.expose({
    validate,
    validateField,
    clearValidate,
    get elForm() { return elForm.value }
  })

  return () => h(Form, {
    ref: setRef as unknown as string,
    props: {
      model: props.model,
      rules: props.rules,
      labelPosition: props.labelPosition,
      labelWidth: props.labelWidth,
      labelSuffix: props.labelSuffix,
      inline: props.inline,
      inlineMessage: props.inlineMessage,
      statusIcon: props.statusIcon,
      showMessage: props.showMessage,
      size: props.size,
      disabled: props.disabled,
      validateOnRuleChange: props.validateOnRuleChange,
      hideRequiredAsterisk: props.hideRequiredAsterisk
    },
    on: {
      validate(value: unknown){
        context.emit('validate', value)
      }
    },
    scopedSlots: {
      default: () => context.slots.default?.()
    }
  })
}