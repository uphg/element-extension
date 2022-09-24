import { ElUpload } from "element-ui/types/upload"
import { ExtractPropTypes, PropType } from "vue"
import { empty } from "../../../shared/_commonProps"

export type GlobalUploadProps = ExtractPropTypes<typeof globalUploadProps>
export type UploadProps = ExtractPropTypes<typeof uploadProps>

function noop() {}

export const globalUploadProps = {
  action: {
    type: String,
    // required: true
  },
  headers: {
    type: Object,
    default: empty // {}
  },
  multiple: {
    type: Boolean,
    default: empty
  },
  data: {
    type: Object,
    default: empty
  },
  showFileList: {
    type: Boolean,
    default: empty // true
  },
  drag: {
    type: Boolean,
    default: empty
  },
  accept: {
    type: String,
    default: empty
  },
  listType: {
    type: String,
    default: empty // 'text' // text,picture,picture-card
  },
  autoUpload: {
    type: Boolean,
    default: empty // true
  },
  httpRequest: {
    type: Function as PropType<ElUpload["httpRequest"]>,
    default: empty
  },
}

export const uploadProps = {
  name: {
    type: String,
    default: 'file'
  },
  dragger: Boolean,
  withCredentials: Boolean,
  type: {
    type: String,
    default: 'select'
  },
  beforeUpload: Function,
  beforeRemove: Function,
  onRemove: {
    type: Function,
    default: noop
  },
  onChange: {
    type: Function,
    default: noop
  },
  onPreview: {
    type: Function
  },
  onSuccess: {
    type: Function,
    default: noop
  },
  onProgress: {
    type: Function,
    default: noop
  },
  onError: {
    type: Function,
    default: noop
  },
  fileList: {
    type: Array,
    default() {
      return [];
    }
  },
  disabled: Boolean,
  limit: Number,
  onExceed: {
    type: Function,
    default: noop
  },
  ...globalUploadProps
}