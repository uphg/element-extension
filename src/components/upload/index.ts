import Upload from './src/Upload'
import { useUpload } from './src/useUpload'
import { uploadProps } from './src/uploadProps'

Upload.install = function (Vue) {
  Vue.component(Upload.name, Upload);
}

export { Upload, uploadProps, useUpload }
