export type ConfigPropKeys = keyof (typeof configMap)

export const configInputKey = Symbol('config-input')
export const configFormKey = Symbol('config-form')
export const configTableKey = Symbol('config-table')
export const configTableColumnKey = Symbol('config-table-column')
export const configPaginationKey = Symbol('config-pagination')
export const configUploadKey = Symbol('config-upload')

export const configMap = {
  input: configInputKey,
  form: configFormKey,
  table: configTableKey,
  tableColumn: configTableColumnKey,
  pagination: configPaginationKey,
  upload: configUploadKey,
}