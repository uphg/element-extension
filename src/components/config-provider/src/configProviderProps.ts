import { ExtractPropTypes, PropType } from "vue"
import { empty } from "../../../shared/commonProps";
import { GlobalCheckboxGroupProps } from "../../checkbox-group/src/checkboxGroupProps";
import { GlobalInputProps } from "../../input/src/inputProps";
import { GlobalInputNumberProps } from "../../input-number/src/inputNumberProps";
import { GlobalFormProps } from "../../form/src/formProps";
import { GlobalPaginationProps } from "../../pagination/src/paginationProps";
import { GlobalRadioGroupProps } from "../../radio-group/src/radioGroupProps";
import { GlobalSelectProps } from "../../select/src/selectProps";
import { GlobalSwitchProps } from "../../switch/src/switchProps";
import { GlobalCascaderProps } from "../../cascader/src/cascaderProps"
import { GlobalTableProps } from "../../table/src/tableProps"
import { GlobalUploadProps } from "../../upload/src/uploadProps"
import { GlobalTableColumnProps } from "../../table-column/src/tableColumnProps"
import { GlobalSliderProps } from "../../slider/src/sliderProps"
// import { GlobalFormItemProps } from '../../form-item/src/formItemProps'
import { GlobalButtonProps } from "../../button/src/buttonProps"
import { en } from "../../../lang"
import { GlobalLinkProps } from "src/components/link/src/linkProps";
import { GlobalTagProps } from "src/components/tag/src/tagProps";

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigProviderLocale = typeof en

export const configProviderProps = {
  locale: {
    type: Object as PropType<ConfigProviderLocale>,
    default: empty
  },
  button: {
    type: Object as PropType<GlobalButtonProps>,
    default: empty
  },
  radioGroup: {
    type: Object as PropType<GlobalRadioGroupProps>,
    default: empty
  },
  checkboxGroup: {
    type: Object as PropType<GlobalCheckboxGroupProps>,
    default: empty
  },
  input: {
    type: Object as PropType<GlobalInputProps>,
    default: empty
  },
  inputNumber: {
    type: Object as PropType<GlobalInputNumberProps>,
    default: empty
  },
  select: {
    type: Object as PropType<GlobalSelectProps>,
    default: empty
  },
  cascader: {
    type: Object as PropType<GlobalCascaderProps>,
    default: empty
  },
  switch: {
    type: Object as PropType<GlobalSwitchProps>,
    default: empty
  },
  slider: {
    type: Object as PropType<GlobalSliderProps>,
    default: empty
  },
  upload: {
    type: Object as PropType<GlobalUploadProps>,
    default: empty
  },
  form: {
    type: Object as PropType<GlobalFormProps>,
    default: empty
  },
  // formItem: {
  //   type: Object as PropType<GlobalFormItemProps>,
  //   default: empty
  // },
  table: {
    type: Object as PropType<GlobalTableProps>,
    default: empty
  },
  tableColumn: {
    type: Object as PropType<GlobalTableColumnProps>,
    default: empty
  },
  pagination: {
    type: Object as PropType<GlobalPaginationProps>,
    default: empty
  },
  link: {
    type: Object as PropType<GlobalLinkProps>,
    default: empty
  },
  tag: {
    type: Object as PropType<GlobalTagProps>,
    default: empty
  }
}
