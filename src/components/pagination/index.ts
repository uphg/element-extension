import Pagination from './src/pagination'
import { paginationProps } from './src/paginationProps'
import { usePagination } from './src/usePagination'

// @ts-ignore
Pagination.install = function (Vue) {
  Vue.component(Pagination.name, Pagination);
}

export { Pagination, paginationProps, usePagination }
