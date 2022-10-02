import { ElUpload } from "element-ui/types/upload"
import { ExtractPropTypes, PropType } from "vue"
import { empty, booleanProp, stringProp, objectProp } from "../../../shared/commonProps"

export type GlobalUploadProps = ExtractPropTypes<typeof globalUploadProps>
export type UploadProps = ExtractPropTypes<typeof uploadProps>

function noop() {}

const functionProp = Function as PropType<Function>

export const globalUploadProps = {
  action: {
    type: String,
    default: empty
    // required: true
  },
  headers: {
    type: objectProp,
    default: empty // {}
  },
  multiple: {
    type: booleanProp,
    default: empty
  },
  data: {
    type: objectProp,
    default: empty
  },
  name: {
    type: stringProp,
    default: 'file'
  },
  dragger: {
    type: booleanProp,
    default: empty
  },
  withCredentials: {
    type: booleanProp,
    default: empty
  },
  beforeUpload: {
    type: functionProp,
    default: empty
  },
  beforeRemove: {
    type: functionProp,
    default: empty
  },
  onRemove: {
    type: functionProp,
    default: empty // noop
  },
  onChange: {
    type: functionProp,
    default: empty // noop
  },
  onPreview: {
    type: functionProp,
    default: empty
  },
  onSuccess: {
    type: functionProp,
    default: empty // noop
  },
  onProgress: {
    type: functionProp,
    default: empty // noop
  },
  onError: {
    type: functionProp,
    default: empty // noop
  },
  limit: Number,
  onExceed: {
    type: functionProp,
    default: empty // noop
  },
  showFileList: {
    type: booleanProp,
    default: empty // true
  },
  drag: {
    type: booleanProp,
    default: empty
  },
  accept: {
    type: stringProp,
    default: empty
  },
  listType: {
    type: stringProp,
    default: empty // 'text' // text,picture,picture-card
  },
  autoUpload: {
    type: booleanProp,
    default: empty // true
  },
  httpRequest: {
    type: Function as PropType<ElUpload["httpRequest"]>,
    default: empty
  },
}

export const uploadProps = {
  type: {
    type: stringProp,
    default: 'select'
  },
  fileList: {
    type: Array,
    default() {
      return [];
    }
  },
  disabled: booleanProp,
  ...globalUploadProps
}