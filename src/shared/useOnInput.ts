import { toString } from "../utils"
import { CustomInputValue } from "../types/customInput"
import { InputExclude } from "../types/input"
import { createExclude } from "./createExclude"
import { SetupContext } from "vue"

export function useOnInput<T extends { exclude: InputExclude }>(props: T, context: SetupContext<{}>) {
  const onInput = props.exclude ? (value: CustomInputValue) => {
    const exclude = createExclude(props.exclude)
    const newVal = toString(value).replace(exclude, '')
    context.emit('input', newVal)
  } : (value: CustomInputValue) => {
    context.emit('input', value)
  }

  return onInput
}