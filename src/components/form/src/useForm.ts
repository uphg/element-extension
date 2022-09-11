import { h, SetupContext } from "vue"
import { ElForm } from "element-ui/types/form"
import { FormProps } from "./formProps"
import { useElForm } from "../../../composables/useElForm"
import { Form } from "element-ui"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { GlobalFormProps } from "../../../components/config-provider/src/configProviderProps"
import { withDefaultProps } from "../../../utils/withDefaultProps"
import { generateEmits } from "../../../utils/generateEmits"
import pick from "../../../utils/pick"

const propNames = ['model', 'rules', 'labelSuffix', 'statusIcon', 'showMessage', 'disabled', 'validateOnRuleChange', 'hideRequiredAsterisk']
const globalPropNames = ['labelPosition', 'labelWidth', 'inline', 'inlineMessage', 'size']
const emitNames = ['validate']

export function useForm(props: FormProps, context: SetupContext<{}>) {
  const { elForm, validate, validateField, clearValidate } = useElForm()
  const globalFormProps = useGlobalProps<GlobalFormProps>('form')
  const on = generateEmits(context.emit, emitNames)
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
        ...pick(props, propNames),
        ...withDefaultProps(props as GlobalFormProps, globalFormProps, globalPropNames)
      },
      on,
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
}