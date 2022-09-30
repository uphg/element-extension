import { ElForm } from "element-ui/types/form";
import { useFormulate } from '../src/components/formulate'
import { FormulateDataProps, FormulateFields, MapRules } from "../src/components/formulate/src/formulateProps";

export declare class EFormulate extends ElForm {
  fields: FormulateFields | FormulateFields[];
  gutter: number;
  withEnterNext: boolean;
  mapRules: MapRules;
  data: FormulateDataProps;
}
export declare type useFormulate = typeof useFormulate
