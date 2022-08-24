import { ExtractPropTypes, PropType } from "vue"
import { commonProps } from "../../../shared/_commonProps"
import { CustomInputOptions } from "../../../types/customInput"

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectProps = {
  value: commonProps.value,
  name: commonProps.name,
  id: commonProps.id,
  autocomplete: commonProps.autocomplete,
  automaticDropdown: commonProps.automaticDropdown,
  size: commonProps.size,
  disabled: commonProps.disabled,
  clearable: commonProps.clearable,
  filterable: commonProps.filterable,
  allowCreate: commonProps.allowCreate,
  loading: commonProps.loading,
  popperClass: commonProps.popperClass,
  remote: commonProps.remote,
  loadingText: commonProps.loadingText,
  noMatchText: commonProps.noMatchText,
  noDataText: commonProps.noDataText,
  remoteMethod: commonProps.remoteMethod,
  filterMethod: commonProps.filterMethod,
  multiple: commonProps.multiple,
  multipleLimit: commonProps.multipleLimit,
  placeholder: commonProps.placeholder,
  defaultFirstOption: commonProps.defaultFirstOption,
  reserveKeyword: commonProps.reserveKeyword,
  valueKey: commonProps.valueKey,
  collapseTags: commonProps.collapseTags,
  popperAppendToBody: commonProps.popperAppendToBody,
  options: [Object, Array] as PropType<CustomInputOptions[]>,
  optionGroups: commonProps.optionGroups
}