import { QueryChangeHandler } from "element-ui/types/select";
import { ExtractPropTypes, PropType } from "vue"
import { ObjectLike } from "../../../../types/_common"
import { empty, booleanProp, stringProp, numberProp } from "../../../shared/commonProps"

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

const queryChangeHandler = Function as PropType<QueryChangeHandler>

export const globalSelectProps = {
  autocomplete: {
    type: stringProp,
    default: 'off'
  },
  name:{
    type:  stringProp,
    default: empty
  },
  id:{
    type:  stringProp,
    default: empty
  },
  automaticDropdown:{
    type:  booleanProp,
    default: empty
  },
  filterable:{
    type:  booleanProp,
    default: empty
  },
  allowCreate:{
    type:  booleanProp,
    default: empty
  },
  remote:{
    type:  booleanProp,
    default: empty
  },
  loadingText:{
    type:  stringProp,
    default: empty
  },
  noMatchText:{
    type:  stringProp,
    default: empty
  },
  noDataText:{
    type:  stringProp,
    default: empty
  },
  remoteMethod:{
    type:  queryChangeHandler,
    default: empty
  },
  filterMethod:{
    type:  queryChangeHandler,
    default: empty
  },
  defaultFirstOption:{
    type:  booleanProp,
    default: empty
  },
  reserveKeyword:{
    type:  booleanProp,
    default: empty
  },
  collapseTags:{
    type:  booleanProp,
    default: empty
  },
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
    type: numberProp,
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

export const selectBaseProps = {
  value: {
    required: true
  },
  disabled: booleanProp,
  loading: booleanProp,
  placeholder: stringProp,
}

export const selectProps = {
  ...selectBaseProps,
  ...globalSelectProps,

  // customize props
  options: {
    type: [Array] as PropType<SelectOptions>
  },
  optionGroups: {
    type: [Array] as PropType<SelectOptionGroup>
  }
}