import { ExtractPropTypes } from "vue";

export type GlobalUploadProps = ExtractPropTypes<typeof globalUploadProps>
export type UploadProps = ExtractPropTypes<typeof uploadProps>

function noop() {}

export const globalUploadProps = {
  action: {
    type: String,
    required: true
  },
  headers: {
    type: Object,
    default() {
      return {};
    }
  },
  multiple: Boolean,
  data: Object,
  showFileList: {
    type: Boolean,
    default: true
  },
  drag: Boolean,
  accept: String,
  listType: {
    type: String,
    default: 'text' // text,picture,picture-card
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  httpRequest: Function,
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