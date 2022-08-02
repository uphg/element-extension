export type FormRules = {
  [key: string]: [
    {
      required?: boolean;
      message: string;
      pattern?: Regexp | string;
      trigger?: string;
      min?: number;
      max?: number
    }
  ]
}
