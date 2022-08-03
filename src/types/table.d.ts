export type TableColumnOptions = {
  value: any;
  label: string;
}

export type TableColumnProps = {
  options?: TableColumnOptions[];
  children?: TableColumnProps[];
  [key: string]: any;
}