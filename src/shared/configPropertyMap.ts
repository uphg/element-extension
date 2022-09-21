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

export const globalUploadPropNames = ['withCredentials', 'drag', 'beforeUpload', 'beforeRemove', 'limit', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'onExceed', 'action', 'headers', 'multiple', 'data', 'drag', 'accept', 'listType', 'autoUpload', 'httpRequest']
const publicDatePropNames = ['size', 'editable', 'clearable', 'placeholder', 'startPlaceholder', 'endPlaceholder', 'format', 'align', 'rangeSeparator', 'defaultValue', 'defaultTime', 'valueFormat', 'unlinkPanels', 'popperClass', 'pickerOptions', 'prefixIcon', 'clearIcon', 'validateEvent']

export const configPropertyMap = {
  radioGroup: {
    key: globalRadioGroupKey,
    propNames: ['size', 'textColor', 'fill', 'withBorder', 'withButton']
  },
  checkboxGroup: {
    key: globalCheckboxGroupKey,
    propNames: ['min', 'max', 'size', 'textColor', 'fill', 'withBorder', 'withButton']
  },
  input: {
    key: globalInputKey,
    propNames: ['clearable', 'showWordLimit', 'autosize', 'size', 'maxlength', 'suffixIcon', 'prefixIcon', 'maxlength']
  },
  inputNumber: {
    key: globalInputNumberKey,
    propNames: ['min', 'max', 'step', 'stepStrictly', 'precision', 'size', 'controls', 'controlsPosition']
  },
  select: {
    key: globalSelectKey,
    propNames: ['valueKey', 'size', 'multiple', 'multipleLimit', 'clearable', 'popperClass', 'popperAppendToBody']
  },
  cascader: {
    key: globalCascaderKey,
    propNames: ['options', 'props', 'size', 'clearable', 'popperClass', 'separator', 'showAllLevels', 'collapseTags']
  },
  switch: {
    key: globalSwitchKey,
    propNames: ['width', 'activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor', 'validateEvent']
  },
  slider: {
    key: globalSliderKey,
    propNames: ['min', 'max', 'step', 'showInput', 'showInputControls', 'inputSize', 'showStops', 'showTooltip', 'formatTooltip', 'range', 'vertical', 'height', 'label', 'debounce', 'tooltipClass', 'marks']
  },
  datePicker: {
    key: globalDatePickerKey,
    propNames: publicDatePropNames
  },
  timePicker: {
    key: globalTimePickerKey,
    propNames: publicDatePropNames
  },
  timeSelect: {
    key: globalTimeSelectKey,
    propNames: publicDatePropNames
  },
  upload: {
    key: globalUploadKey,
    propNames: globalUploadPropNames.concat(['showFileList'])
  },
  form: {
    key: globalFormKey,
    propNames: ['inline', 'labelPosition', 'labelWidth', 'inlineMessage', 'size']
  },
  table: {
    key: globalTableKey,
    propNames: ['maxHeight', 'stripe', 'border', 'size', 'fit', 'showHeader', 'highlightCurrentRow']
  },
  tableColumn: {
    key: globalTableColumnKey,
    propNames: ['className', 'resizable', 'showOverflowTooltip']
  },
  pagination: {
    key: globalPaginationKey,
    propNames: ['small', 'background', 'pagerCount', 'layout', 'pageSizes', 'popperClass', 'prevText', 'nextText', 'hideOnSinglePage']
  }
}
