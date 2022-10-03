import { h, SetupContext } from "vue"
import { ElForm } from "element-ui/types/form"
import { FormProps, GlobalFormProps } from "./formProps"
import { useElForm } from "../../../composables/useElForm"
import { Form } from "element-ui"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { globalFormPropNames } from "../../../shared/configPropertyMap"
import { ObjectLike } from "../../../../types/_common"

const propNames = ['model', 'rules', 'labelSuffix', 'statusIcon', 'disabled']

export function useForm(
  props: FormProps,
  context: SetupContext<{}> | undefined,
  options?: UseComponentParamsOptions<FormProps | ObjectLike, GlobalFormProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elForm, validate, validateField, clearValidate } = useElForm()
  const { createProps } = useComponentProps(props, 'form', { propNames, globalPropNames: globalFormPropNames, handleProps })

  const on = context?.emit ? {
    validate(prop: string, errors: boolean, validateMessage: string | null) {
      context.emit('validate', prop, errors, validateMessage)
    }
  } : options?.on
  const handleRef = (_handleRef || ((el: ElForm) => elForm.value = el)) as unknown as string

  return {
    expose: {
      validate,
      validateField,
      clearValidate,
      get elForm() { return elForm.value }
    },
    render() {
      const slots = context?.slots && (() => context.slots.default?.())
      return h(Form, { ref: handleRef, props: createProps(), on, scopedSlots: { default: slots } })
    }
  }
}