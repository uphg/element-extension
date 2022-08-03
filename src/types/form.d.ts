export type FormRule = [
  {
    required?: boolean;
    message: string;
    pattern?: Regexp | string;
    trigger?: string;
    min?: number;
    max?: number
  }
]

export type FormRules = {
  [key: string]: FormRule
}

