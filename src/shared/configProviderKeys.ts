export type ConfigPropKeys = keyof (typeof configMap)

export const configInputKey = Symbol('config-input')
export const configFormKey = Symbol('config-form')
export const configTableKey = Symbol('config-table')

export const configMap = {
  input: configInputKey,
  form: configFormKey,
  table: configTableKey
}