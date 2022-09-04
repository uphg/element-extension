import { h, ref, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload, ElUploadInternalFileDetail } from "element-ui/types/upload"
import { UploadProps } from "./uploadProps"
import { generateProps } from "../../../utils/generateProps"

const propNames = ['action', 'headers', 'data', 'multiple', 'name', 'drag', 'dragger', 'withCredentials', 'accept', 'type', 'beforeUpload', 'beforeRemove', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'fileList', 'autoUpload', 'listType', 'httpRequest', 'disabled', 'limit', 'onExceed']

export function useUpload(props: UploadProps, context:  SetupContext<{}>) {
  const elUpload = ref<ElUpload | null>(null)
  const setRef = function(el: ElUpload) {
    elUpload.value = el
  } as unknown as string

  return {
    expose: {
      clearFiles() {
        elUpload.value!.clearFiles()
      },
      abort(file: ElUploadInternalFileDetail) {
        elUpload.value!.abort(file)
      },
      submit() {
        elUpload.value!.submit()
      },
      get elUpload() {
        return elUpload.value
      }
    },
    render: () => h(Upload, {
      ref: setRef,
      props: {
        ...generateProps(props, propNames),
        showFileList: false
      },
    }, context.slots.default?.().concat([]))
  }
}