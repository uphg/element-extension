import { ExtractPropTypes, PropType } from "vue"
import { ObjectLike } from "../../../types/object-like"
import { commonProps, empty } from "../../../shared/_commonProps"

export interface SelectOption {
  value: string | number | ObjectLike;
  label: string | number;
  disabled: boolean;
}

export type SelectOptionGroup = {
  label: string;
  disabled: boolean;
  options: SelectOption
}[]

export type SelectOptions = SelectOption[]

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
  options: {
    type: [Array] as PropType<SelectOptions>
  },
  optionGroups: {
    type: [Array] as PropType<SelectOptionGroup>
  }
}