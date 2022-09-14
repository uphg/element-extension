import { empty } from "./_commonProps";

export type ConfigPropertyMap = typeof configPropertyMap
export type ConfigPropertyName = keyof (typeof configPropertyMap)

export const globalInputKey = Symbol('config-input')
export const globalFormKey = Symbol('config-form')
export const globalTableKey = Symbol('config-table')
export const globalTableColumnKey = Symbol('config-table-column')
export const globalPaginationKey = Symbol('config-pagination')
export const globalUploadKey = Symbol('config-upload')
export const globalRadioGroupKey = Symbol('config-radio-group')
export const globalCheckboxGroup = Symbol('config-checkbox-group')
export const globalInputNumber = Symbol('config-input-number')
export const globalSwitchKey = Symbol('config-switch')

export const configPropertyMap = {
  input: {
    key: globalInputKey,
    default: {
      clearable: empty, // false
      showWordLimit: empty, // false
      autosize: empty, // false
      size: empty,
      maxlength: empty,
    }
  },
  form: {
    key: globalFormKey,
    default: {
      inline: empty, // false
      labelPosition: empty, // 'right'
      labelWidth: empty,
      inlineMessage: empty,
      size: empty
    }
  },
  table: {
    key: globalTableKey,
    default: {
      maxHeight: empty,
      stripe: empty, // false
      border: empty, // false
      size: empty,
      fit: empty, // true
      showHeader: empty, // true
      highlightCurrentRow: empty // false
    }
  },
  tableColumn: {
    key: globalTableColumnKey,
    default: {
      stripe: empty,
      border: empty,
      size: empty,
      showOverflowTooltip: empty
    }
  },
  pagination: {
    key: globalPaginationKey,
    default: {
      small: empty, // false
      background: empty, // false
      pagerCount: empty, // 7
      layout: empty, // 'prev, pager, next, jumper, ->, total'
      pageSizes: empty, // [10, 20, 30, 40, 50, 100]
      popperClass: empty,
      prevText: empty,
      nextText: empty,
      hideOnSinglePage: empty,
    }
  },
  upload: {
    key: globalUploadKey,
    default: {
      action: empty,
      headers: empty,
      multiple: empty,
      data: empty,
      showFileList: empty,
      drag: empty,
      accept: empty,
      listType: empty,
      autoUpload: empty,
      httpRequest: empty
    }
  },
  radioGroup: {
    key: globalRadioGroupKey,
    default: {
      size: empty,
      textColor: empty,
      fill: empty,
    }
  },
  checkboxGroup: {
    key: globalCheckboxGroup,
    default: {
      min: empty,
      max: empty,
      size: empty,
      textColor: empty,
      fill: empty,
    }
  },
  inputNumber: {
    key: globalInputNumber,
    default: {
      min: empty,
      max: empty,
      step: empty,
      stepStrictly: empty,
      precision: empty,
      size: empty,
      controls: empty,
      controlsPosition: empty
    }
  },
  switch: {
    key: globalSwitchKey,
    default: {
      width: empty,
      activeIconClass: empty,
      inactiveIconClass: empty,
      activeText: empty,
      inactiveText: empty,
      activeValue: empty,
      inactiveValue: empty,
      activeColor: empty,
      inactiveColor: empty,
      validateEvent: empty
    }
  }
}

