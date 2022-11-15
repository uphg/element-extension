import { ElForm as _ElForm } from "element-ui/types/form"
import { FormulateDataProps } from "../src/components/formulate/src/formulateProps";
import { FormData, FormulateFields, MapRules } from "../src/components/formulate/src/interface";
import { CustomInputValue } from "./_common";

export declare class EFormulate extends _ElForm {
  readonly elForm: _ElForm;
  readonly formData: FormData;
  fields: FormulateFields | FormulateFields[];
  gutter: number;
  withEnterNext: boolean;
  mapRules: MapRules;
  data: FormulateDataProps;
  resetValues: () => void;
  setValues: (object: FormData) => void;
  getValues: () => { [key: string]: CustomInputValue };
}
