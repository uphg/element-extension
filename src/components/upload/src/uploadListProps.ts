import { PropType } from "vue";

export type ElUploadFile = {
  uid: string | number;
  status: string;
  url: string;
  name: string;
  percentage: string;
}

export const UploadListProps = {
  files: {
    type: Array as PropType<ElUploadFile[]>,
    default() {
      return [];
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  handlePreview: Function,
  listType: String
}