import { Ref, SetupContext } from "vue";
import { FormulateField } from "./formulateProps";
import { useInput } from "../../input";
import { FormData } from '../../../types/form'
import { useInputNumber } from "src/components/input-number";
import { useRadioGroup } from "src/components/radio-group";
import { empty } from "../../../shared/_commonProps";
import { SetRef } from "../../../composables/useComponentProps";

function createCustomInputRender(
  props: FormulateField,
  context: SetupContext<{}>,
  _options: {
    formData: Ref<FormData>
    setRef?: SetRef
  }
) {
  const { formData, setRef } = _options
  switch (props.type) {
    case 'radio': {
      const { render } = useRadioGroup(props, empty, { setRef })
      return render
    }

    case 'text':
    case 'textarea': {
      const _props = { ...props, value: formData.value[props.key]}
      const { render } = useInput(_props, empty, {
        handleProps() {
          return () => ({

          })
        },
        handleAttrs() {
          return () => ({
            
          })
        },
        setRef
      })
      return render
    }
    
    case 'number':
    case 'input-number': {
      const _props = { ...props, value: formData.value[props.key] }
      const { render } = useInputNumber(_props, context, { setRef })
      return render
    }
      
  }
}