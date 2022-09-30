import { ElInput } from "element-ui/types/input";
import { useInput } from '../src/components/input'

export declare class EInput extends ElInput {
  exclude: string | number | RegExp
}
export declare type useInput = typeof useInput
