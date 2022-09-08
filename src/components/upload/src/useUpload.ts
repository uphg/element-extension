import { h, ref, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload as _ElUpload, ElUploadInternalFileDetail } from "element-ui/types/upload"
import { UploadProps } from "./uploadProps"
import { generateProps } from "../../../utils/generateProps"
import UploadList from "./UploadList"

const propNames = ['action', 'headers', 'data', 'multiple', 'name', 'drag', 'dragger', 'withCredentials', 'accept', 'type', 'beforeUpload', 'beforeRemove', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'fileList', 'autoUpload', 'listType', 'httpRequest', 'disabled', 'limit', 'onExceed']
interface ElUpload extends _ElUpload {
  uploadDisabled: boolean;
  uploadFiles: { [key: string]: any }[];
  handleRemove: (file: any, raw?: string) => void;
} 

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
    render: () => {
      const uploadDisabled = elUpload.value?.uploadDisabled
      const uploadFiles = elUpload.value?.uploadFiles
      const showFileList = props.showFileList
      const uploadList = h(UploadList, {
        props: {
          disabled: uploadDisabled,
          listType: props.listType,
          files: uploadFiles,
          handlePreview: props.onPreview
        },
        on: {
          remove(file) {
            elUpload.value?.handleRemove(file)
          }
        },
        scopedSlots: {
          default: (props) => {
            if (context.slots.file) {
              return context.slots.file({ file: props.file })
            }
          }
        }
      })
      return h(Upload, {
        ref: setRef,
        props: {
          ...generateProps(props, propNames),
          showFileList: false
        },
      }, [
        showFileList && props.listType === 'picture-card' && uploadList,
        ...context.slots.default?.()!,
        showFileList && props.listType !== 'picture-card' && uploadList
      ])
    }
  }
}