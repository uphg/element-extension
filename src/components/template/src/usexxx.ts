import { h, ref, SetupContext } from "vue"
import { xxx } from "element-ui"
import { Elxxx } from "element-ui/types/radio-group"
import { xxxProps } from "./xxxProps"
import { Globalxxx } from "../../config-provider/src/configProviderProps"
import pick from "../../../utils/pick"
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { useGlobalProps } from "../../../composables/useGlobalProps"

const propNames = ['']
const globalPropNames = ['']

export function usexxx(props: xxxProps, context: SetupContext<{}>) {
  const elxxx = ref<Elxxx | null>(null)
  const globalxxxProps = useGlobalProps<Globalxxx>('xxx')

  const setRef = function(el: Elxxx) {
    elxxx.value = el
  } as unknown as string
  const input = (value: string | number | boolean) => {
    context.emit('input', value)
  }
  const change = (value: string | number | boolean) => {
    context.emit('change', value)
  }

  return {
    render: () => h(xxx, {
      ref: setRef,
      props: {
        ...pick(props, propNames),
        ...withDefaultProps(props, globalxxxProps,globalPropNames)
      },
      on: { input, change }
    }, [])
  }
}