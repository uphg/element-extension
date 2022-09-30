import { QueryChangeHandler } from "element-ui/types/select";
import { ExtractPropTypes, PropType } from "vue"
import { ObjectLike } from "../../../../types/_common"
import { commonProps, empty } from "../../../shared/commonProps"

export interface SelectOption {
  value: string | number | ObjectLike;
  label: string | number;
  disabled: boolean;
}
export type SelectOptionGroup = {
  label: string;
  disabled: boolean;
  options: SelectOptions
}[]
export type SelectOptions = SelectOption[]
export type SelectProps = ExtractPropTypes<typeof selectProps>
export type GlobalSelectProps = ExtractPropTypes<typeof globalSelectProps>

const booleanProp = Boolean as PropType<boolean>
const stringProp = String as PropType<string>
const queryChangeHandler = Function as PropType<QueryChangeHandler>

export const globalSelectProps = {
  valueKey: {
    type: stringProp,
    default: empty
  },
  size: {
    type: stringProp,
    default: empty
  },
  multiple: {
    type: booleanProp,
    default: empty
  },
  multipleLimit: {
    type: Number as PropType<number>,
    default: empty
  },
  clearable: {
    type: booleanProp,
    default: empty
  },
  popperClass: {
    type: stringProp,
    default: empty
  },
  popperAppendToBody: {
    type: booleanProp,
    default: empty
  }
}

export const selectProps = {
  value: {
    required: true
  },
  name: stringProp,
  id: stringProp,
  autocomplete: {
    type: stringProp,
    default: 'off'
  },
  automaticDropdown: booleanProp,
  disabled: booleanProp,
  loading: booleanProp,
  filterable: booleanProp,
  allowCreate: booleanProp,
  remote: booleanProp,
  loadingText: stringProp,
  noMatchText: stringProp,
  noDataText: stringProp,
  remoteMethod: queryChangeHandler,
  filterMethod: queryChangeHandler,
  placeholder: stringProp,
  defaultFirstOption: booleanProp,
  reserveKeyword: booleanProp,
  collapseTags: booleanProp,
  ...globalSelectProps,

  // customize props
  options: {
    type: [Array] as PropType<SelectOptions>
  },
  optionGroups: {
    type: [Array] as PropType<SelectOptionGroup>
  }
}