export type ConfigPropertyMap = typeof configPropertyMap
export type ConfigPropertyName = keyof (typeof configPropertyMap)

export const globalRadioGroupKey = Symbol('config-radio-group')
export const globalCheckboxGroupKey = Symbol('config-checkbox-group')
export const globalInputKey = Symbol('config-input')
export const globalInputNumberKey = Symbol('config-input-number')
export const globalSelectKey = Symbol('config-select')
export const globalCascaderKey = Symbol('config-select')
export const globalSwitchKey = Symbol('config-switch')
export const globalSliderKey = Symbol('config-slider')
export const globalDatePickerKey = Symbol('config-date-picker')
export const globalTimePickerKey = Symbol('config-time-picker')
export const globalTimeSelectKey = Symbol('config-time-select')
export const globalUploadKey = Symbol('config-upload')
export const globalFormKey = Symbol('config-form')
export const globalTableKey = Symbol('config-table')
export const globalTableColumnKey = Symbol('config-table-column')
export const globalPaginationKey = Symbol('config-pagination')

export const globalRadioGroupPropNames = ['size', 'textColor', 'fill']
export const globalCheckboxGroupPropNames = ['min', 'max', 'textColor', 'fill', 'size']
export const globalInputPropNames = ['clearable', 'showWordLimit', 'autosize', 'size', 'suffixIcon', 'prefixIcon']
export const globalInputNumberPropNames = ['min', 'max', 'step', 'stepStrictly', 'precision', 'size', 'controls', 'controlsPosition']
export const globalSelectPropNames = ['valueKey', 'size', 'multiple', 'multipleLimit', 'clearable', 'popperClass', 'popperAppendToBody']
export const globalCascaderPropNames = ['options', 'props', 'size', 'clearable', 'popperClass', 'separator', 'showAllLevels', 'collapseTags']
export const globalSwitchPropNames = ['width', 'activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor', 'validateEvent']
export const globalSliderPropNames = ['min', 'max', 'step', 'showInput', 'showInputControls', 'inputSize', 'showStops', 'showTooltip', 'formatTooltip', 'range', 'vertical', 'height', 'label', 'debounce', 'tooltipClass', 'marks']
export const globalDatePropNames = ['size', 'editable', 'clearable', 'placeholder', 'startPlaceholder', 'endPlaceholder', 'format', 'align', 'rangeSeparator', 'defaultValue', 'defaultTime', 'valueFormat', 'unlinkPanels', 'popperClass', 'pickerOptions', 'prefixIcon', 'clearIcon', 'validateEvent']
export const globalUploadPropNames = ['withCredentials', 'drag', 'beforeUpload', 'beforeRemove', 'limit', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'onExceed', 'action', 'headers', 'multiple', 'data', 'drag', 'accept', 'listType', 'autoUpload', 'httpRequest']
export const globalFormPropNames = ['labelPosition', 'labelWidth', 'inline', 'inlineMessage', 'size']
export const globalTablePropNames = ['maxHeight', 'stripe', 'border', 'size', 'fit', 'showHeader', 'highlightCurrentRow']
export const globalTableColumnPropNames = ['className', 'resizable', 'showOverflowTooltip']
export const globalPaginationPropNames = ['small', 'background', 'pagerCount', 'layout', 'pageSizes', 'popperClass', 'prevText', 'nextText', 'hideOnSinglePage']

export const configPropertyMap = {
  radioGroup: {
    key: globalRadioGroupKey,
    propNames: globalRadioGroupPropNames.concat(['withBorder', 'withButton'])
  },
  checkboxGroup: {
    key: globalCheckboxGroupKey,
    propNames: globalCheckboxGroupPropNames.concat(['withBorder', 'withButton'])
  },
  input: {
    key: globalInputKey,
    propNames: globalInputPropNames.concat(['maxlength'])
  },
  inputNumber: {
    key: globalInputNumberKey,
    propNames: globalInputNumberPropNames
  },
  select: {
    key: globalSelectKey,
    propNames: globalSelectPropNames
  },
  cascader: {
    key: globalCascaderKey,
    propNames: globalCascaderPropNames
  },
  switch: {
    key: globalSwitchKey,
    propNames: globalSwitchPropNames
  },
  slider: {
    key: globalSliderKey,
    propNames: globalSliderPropNames
  },
  datePicker: {
    key: globalDatePickerKey,
    propNames: globalDatePropNames
  },
  timePicker: {
    key: globalTimePickerKey,
    propNames: globalDatePropNames
  },
  timeSelect: {
    key: globalTimeSelectKey,
    propNames: globalDatePropNames
  },
  upload: {
    key: globalUploadKey,
    propNames: globalUploadPropNames.concat(['showFileList'])
  },
  form: {
    key: globalFormKey,
    propNames: globalFormPropNames
  },
  table: {
    key: globalTableKey,
    propNames: globalTablePropNames
  },
  tableColumn: {
    key: globalTableColumnKey,
    propNames: globalTableColumnPropNames
  },
  pagination: {
    key: globalPaginationKey,
    propNames: globalPaginationPropNames
  }
}
