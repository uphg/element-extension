import { empty } from "./_commonProps";

export type ConfigPropertyMap = typeof configPropertyMap

export const configPropInputKey = Symbol('config-input')
export const configPropFormKey = Symbol('config-form')
export const configPropTableKey = Symbol('config-table')
export const configPropTableColumnKey = Symbol('config-table-column')
export const configPropPaginationKey = Symbol('config-pagination')
export const configPropUploadKey = Symbol('config-upload')
export const configPropRadioGroupKey = Symbol('config-radio-group')
export const configPropCheckboxGroup = Symbol('config-checkbox-group')
export const configPropInputNumber = Symbol('config-input-number')

export const configPropertyMap = {
  input: {
    key: configPropInputKey,
    default: {
      clearable: empty, // false
      showWordLimit: empty, // false
      autosize: empty, // false
      size: empty,
      maxlength: empty,
    }
  },
  form: {
    key: configPropFormKey,
    default: {
      inline: empty, // false
      labelPosition: empty, // 'right'
      labelWidth: empty,
      inlineMessage: empty,
      size: empty
    }
  },
  table: {
    key: configPropTableKey,
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
    key: configPropTableColumnKey,
    default: {
      stripe: empty,
      border: empty,
      size: empty,
      showOverflowTooltip: empty
    }
  },
  pagination: {
    key: configPropPaginationKey,
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
    key: configPropUploadKey,
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
    key: configPropRadioGroupKey,
    default: {
      size: empty,
      textColor: empty,
      fill: empty,
    }
  },
  checkboxGroup: {
    key: configPropCheckboxGroup,
    default: {
      min: empty,
      max: empty,
      size: empty,
      textColor: empty,
      fill: empty,
    }
  },
  inputNumber: {
    key: configPropInputNumber,
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
  }
}

