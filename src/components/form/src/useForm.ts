import { h, SetupContext } from "vue"
import { ElForm } from "element-ui/types/form"
import { FormProps } from "./formProps"
import { useElForm } from "../../../composables/useElForm"
import { Form } from "element-ui"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { GlobalFormProps } from "../../../components/config-provider/src/configProviderProps"
import { handleDefaultProps } from "../../../utils/handleDefaultProps"

export function useForm(props: FormProps, context: SetupContext<{}>) {
  const { elForm, validate, validateField, clearValidate } = useElForm()

  const globalFormProps = useGlobalProps<GlobalFormProps>('form')

  const setRef = function(el: ElForm) {
    elForm.value = el
  } as unknown as string

  return {
    expose: {
      validate,
      validateField,
      clearValidate,
      get elForm() { return elForm.value }
    },
    render: () => h(Form, {
      ref: setRef,
      props: {
        model: props.model,
        rules: props.rules,
        labelSuffix: props.labelSuffix,
        statusIcon: props.statusIcon,
        showMessage: props.showMessage,
        disabled: props.disabled,
        validateOnRuleChange: props.validateOnRuleChange,
        hideRequiredAsterisk: props.hideRequiredAsterisk,
        ...handleDefaultProps<GlobalFormProps>(props as GlobalFormProps, globalFormProps, ['labelPosition', 'labelWidth', 'inline', 'inlineMessage', 'size'])
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
}