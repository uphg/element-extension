import { VueConstructor } from 'vue';
import Table from './src/table'

// @ts-ignore
Table.install = function (Vue: VueConstructor) {
  Vue.component(Table.name, Table);
}

export default Table
