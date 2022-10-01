import { SetupContext } from "vue"
import { toString, createExclude } from "../utils"
import { CustomInputValue } from "../../types/_common"

export function useOnInput<T extends { exclude?: string | number | RegExp }>(props: T, context: SetupContext<{}>) {
  const onInput = props.exclude ? (value: CustomInputValue) => {
    const exclude = createExclude(props.exclude!)
    const newVal = toString(value).replace(exclude, '')
    context.emit('input', newVal)
  } : (value: CustomInputValue) => {
    context.emit('input', value)
  }

  return onInput
}