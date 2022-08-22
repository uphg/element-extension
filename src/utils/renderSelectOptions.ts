import { h, SetupContext } from "vue"
import { Option, OptionGroup } from "element-ui"
import { CustomInputOptions } from "../types/customInput"

type optionProps = {
  options?: CustomInputOptions[],
  optionGroups?: CustomInputOptions[]
} 

export function renderSelectOptions<T extends optionProps>(props: T, context: SetupContext<{}>) {

  const renderOptions = (item: CustomInputOptions, index: number) => h(Option, {
    key: `e.s.opt.${index}`,
    props: {
      label: item.label,
      value: item.value,
      disabled: item.disabled
    }
  }, [context.slots.options?.(item)])

  return props.optionGroups
    ? (props.optionGroups as CustomInputOptions[])?.map(
      (group, i) => h(OptionGroup, {
        key: `e.s.opt.g${i}`,
        props: {
          label: group.label 
        }
      }, [group.options?.map(renderOptions)])
    )
    : (props.options?.map(renderOptions))
}
