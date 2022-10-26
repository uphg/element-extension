import Pagination from './src/Pagination'
import { paginationProps } from './src/paginationProps'
import { usePagination } from './src/usePagination'
import { withInstall } from '../../utils'

const EPagination = withInstall(Pagination)

export { Pagination, EPagination, paginationProps, usePagination }
