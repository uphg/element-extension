import { VueConstructor } from 'vue';
import Upload from './src/Upload'

// @ts-ignore
Upload.install = function (Vue: VueConstructor) {
  Vue.component(Upload.name, Upload);
}

export {
  Upload
}
