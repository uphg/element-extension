import Pagination from './src/Pagination'
import { paginationProps } from './src/paginationProps'
import { usePagination } from './src/usePagination'
import { ComponentPlugin } from '../../types/component-plugin';

(Pagination as ComponentPlugin<typeof Pagination>).install = function (Vue) {
  Vue.component(Pagination.name, Pagination);
}

export { Pagination, paginationProps, usePagination }
