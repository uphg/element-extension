import { ElForm } from "element-ui/types/form";
import { FormulateDataProps } from "../src/components/formulate/src/formulateProps";
import { FormData, FormulateFields, MapRules } from "../src/components/formulate/src/interface";
import { CustomInputValue } from "./_common";

export declare class EFormulate extends ElForm {
  fields: FormulateFields | FormulateFields[];
  gutter: number;
  withEnterNext: boolean;
  mapRules: MapRules;
  data: FormulateDataProps;
  readonly formData: FormData;
  readonly elForm: ElForm;
  resetValues: () => void;
  setValues: (object: FormData) => void;
  getValues: () => { [key: string]: CustomInputValue };
}
