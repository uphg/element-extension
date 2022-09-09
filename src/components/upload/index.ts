import { VueConstructor } from 'vue';
import Upload from './src/Upload'
import { useUpload } from './src/useUpload'
import { uploadProps } from './src/uploadProps'

// @ts-ignore
Upload.install = function (Vue: VueConstructor) {
  Vue.component(Upload.name, Upload);
}

export { Upload, uploadProps, useUpload }
