import { VueConstructor } from 'vue';
import Upload from './upload'

// @ts-ignore
Upload.install = function (Vue: VueConstructor) {
  Vue.component(Upload.name, Upload);
}

export default Upload
