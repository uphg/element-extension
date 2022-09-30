import { h, SetupContext } from "vue"
import { Option, OptionGroup } from "element-ui"
import { SelectOptionGroup, SelectOption } from "src/components/select/src/selectProps"

interface OptionProps {
  options?: SelectOption[];
  optionGroups?: SelectOptionGroup;
} 

export function renderSelectOptions<T extends OptionProps>(props: T, context: SetupContext<{}> | undefined) {

  const renderOptions = (item: SelectOption, index: number) => h(Option, {
    key: `e.s.opt.${index}`,
    props: {
      label: item.label,
      value: item.value,
      disabled: item.disabled
    }
  }, context && [context.slots.options?.(item)])

  return props.optionGroups
    ? props.optionGroups?.map(
      (group, i) => h(OptionGroup, {
        key: `e.s.opt.g${i}`,
        props: {
          label: group.label 
        }
      }, [group.options?.map(renderOptions)])
    )
    : (props.options?.map(renderOptions))
}
