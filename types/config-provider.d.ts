import { GlobalCascaderProps } from '../src/components/cascader/src/cascaderProps';
import { GlobalCheckboxGroupProps } from '../src/components/checkbox-group/src/checkboxGroupProps'
import { GlobalFormProps } from '../src/components/form/src/formProps';
import { GlobalInputNumberProps } from '../src/components/input-number/src/inputNumberProps';
import { GlobalInputProps } from '../src/components/input/src/inputProps'
import { GlobalPaginationProps } from '../src/components/pagination/src/paginationProps';
import { GlobalRadioGroupProps } from '../src/components/radio-group/src/radioGroupProps'
import { GlobalSelectProps } from '../src/components/select/src/selectProps';
import { GlobalSliderProps } from '../src/components/slider/src/sliderProps';
import { GlobalSwitchProps } from '../src/components/switch/src/switchProps';
import { GlobalTableColumnProps } from '../src/components/table-column/src/tableColumnProps';
import { GlobalTableProps } from '../src/components/table/src/tableProps';
import { GlobalUploadProps } from '../src/components/upload/src/uploadProps';
import { useConfigProvider } from '../src/components/config-provider'

export declare class EConfigProvider {
  radioGroup: GlobalRadioGroupProps;
  checkboxGroup: GlobalCheckboxGroupProps;
  input: GlobalInputProps;
  inputNumber: GlobalInputNumberProps;
  select: GlobalSelectProps;
  cascader: GlobalCascaderProps;
  switch: GlobalSwitchProps;
  slider: GlobalSliderProps;
  upload: GlobalUploadProps;
  form: GlobalFormProps;
  table: GlobalTableProps;
  tableColumn: GlobalTableColumnProps;
  pagination: GlobalPaginationProps;
}
export declare type useConfigProvider = typeof useConfigProvider
