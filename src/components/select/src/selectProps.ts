import { ExtractPropTypes, PropType } from "vue"
import { commonProps, empty } from "../../../shared/_commonProps"
import { CustomInputOptions } from "../../../types/customInput"

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type GlobalSelectProps = ExtractPropTypes<typeof globalSelectProps>

export const globalSelectProps = {
  valueKey: {
    type: String as PropType<string>,
    default: empty
  },
  size: {
    type: String as PropType<string>,
    default: empty
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: empty
  },
  multipleLimit: {
    type: Number as PropType<number>,
    default: empty
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: empty
  },
  popperClass: {
    type: String as PropType<string>,
    default: empty
  },
  popperAppendToBody: {
    type: Boolean as PropType<boolean>,
    default: empty
  }
}

export const selectProps = {
  value: commonProps.value,
  name: commonProps.name,
  id: commonProps.id,
  autocomplete: commonProps.autocomplete,
  automaticDropdown: commonProps.automaticDropdown,
  disabled: commonProps.disabled,
  filterable: commonProps.filterable,
  allowCreate: commonProps.allowCreate,
  loading: commonProps.loading,
  remote: commonProps.remote,
  loadingText: commonProps.loadingText,
  noMatchText: commonProps.noMatchText,
  noDataText: commonProps.noDataText,
  remoteMethod: commonProps.remoteMethod,
  filterMethod: commonProps.filterMethod,
  placeholder: commonProps.placeholder,
  defaultFirstOption: commonProps.defaultFirstOption,
  reserveKeyword: commonProps.reserveKeyword,
  collapseTags: commonProps.collapseTags,
  ...globalSelectProps,

  // customize props
  options: [Object, Array] as PropType<CustomInputOptions[]>,
  optionGroups: commonProps.optionGroups
}