import Upload from './src/Upload'
import { useUpload } from './src/useUpload'
import { uploadProps } from './src/uploadProps'
import { ComponentPlugin } from '../../types/component-plugin';

(Upload  as ComponentPlugin<typeof Upload>).install = function (Vue) {
  Vue.component(Upload.name, Upload);
}

export { Upload, uploadProps, useUpload }
