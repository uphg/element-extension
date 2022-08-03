import { VueConstructor } from 'vue';
import Table from './table'

// @ts-ignore
Table.install = function (Vue: VueConstructor) {
  Vue.component(Table.name, Table);
}

export default Table
