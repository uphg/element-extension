import { h, SetupContext } from "vue"
import { ElForm } from "element-ui/types/form"
import { FormProps, GlobalFormProps } from "./formProps"
import { useElForm } from "../../../composables/useElForm"
import { Form } from "element-ui"
import { generateEmits } from "../../../utils/generateEmits"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { globalFormPropNames } from "../../../shared/configPropertyMap"
import { ObjectLike } from "../../../types/object-like"

const propNames = ['model', 'rules', 'labelSuffix', 'statusIcon', 'showMessage', 'disabled', 'validateOnRuleChange', 'hideRequiredAsterisk']
const emitNames = ['validate']

export function useForm(
  props: FormProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<FormProps | ObjectLike, GlobalFormProps>
) {
  const { handleProps } = options || {}
  const { elForm, validate, validateField, clearValidate } = useElForm()
  
  const { createProps } = useComponentProps(props, 'form', { propNames, globalPropNames: globalFormPropNames, handleProps })

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
      props: createProps(),
      on,
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
}