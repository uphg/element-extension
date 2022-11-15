import Link from './src/Link'
import { linkProps } from './src/linkProps'
import { useLink } from './src/useLink'
import { withInstall } from '../../utils'

const ELink = withInstall(Link)

export { Link, ELink, linkProps, useLink }
