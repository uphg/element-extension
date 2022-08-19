export type FormRule = {
  required?: boolean;
  message: string;
  pattern?: Regexp | string;
  trigger?: string;
  min?: number;
  max?: number;
  [key: string]: any;
}

export type FormRules = {
  [key: string]: FormRule[]
}

export type FormData = {
  [key: string]: CustomInputValue
}
