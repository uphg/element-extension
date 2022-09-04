import { ExtractPropTypes } from "vue";

export type UploadProps = ExtractPropTypes<typeof uploadProps>

function noop() {}

export const uploadProps = {
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
  data: Object,
  multiple: Boolean,
  name: {
    type: String,
    default: 'file'
  },
  drag: Boolean,
  dragger: Boolean,
  withCredentials: Boolean,
  showFileList: {
    type: Boolean,
    default: true
  },
  accept: String,
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
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String,
    default: 'text' // text,picture,picture-card
  },
  httpRequest: Function,
  disabled: Boolean,
  limit: Number,
  onExceed: {
    type: Function,
    default: noop
  }
}