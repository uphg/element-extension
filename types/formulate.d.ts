import { ElForm } from "element-ui/types/form";
import { FormulateDataProps } from "../src/components/formulate/src/formulateProps";
import { FormulateFields, MapRules } from "../src/components/formulate/src/interface";

export declare class EFormulate extends ElForm {
  fields: FormulateFields | FormulateFields[];
  gutter: number;
  withEnterNext: boolean;
  mapRules: MapRules;
  data: FormulateDataProps;
}
