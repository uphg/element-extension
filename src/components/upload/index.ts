import Upload from './src/Upload'
import { useUpload } from './src/useUpload'
import { uploadProps } from './src/uploadProps'
import { withInstall } from '../../utils'

const EUpload = withInstall(Upload)

export { Upload, EUpload, uploadProps, useUpload }
