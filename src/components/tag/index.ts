import Tag from './src/Tag'
import { tagProps } from './src/tagProps'
import { useTag } from './src/useTag'
import { withInstall } from '../../utils'

const ETag = withInstall(Tag)

export { Tag, ETag, tagProps, useTag }
