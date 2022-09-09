import { computed, h, onMounted, ref, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload as _ElUpload, ElUploadInternalFileDetail } from "element-ui/types/upload"
import { UploadProps } from "./uploadProps"
import { generateProps } from "../../../utils/generateProps"
import UploadList from "./UploadList"
import { renderSlot } from "../../../utils/renderSlot"
import { ElUploadFile } from "./uploadListProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { GlobalUploadProps } from "../../config-provider/src/configProviderProps"
import { handleDefaultProps } from "src/utils/handleDefaultProps"

const propNames = ['name', 'dragger', 'withCredentials', 'type', 'beforeUpload', 'beforeRemove', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'fileList',   'disabled', 'limit', 'onExceed']
const globalPropNames = ['action', 'headers', 'multiple', 'data', 'drag', 'accept', 'listType', 'autoUpload', 'httpRequest']
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

  const globalUploadProps = useGlobalProps<GlobalUploadProps>('upload')

  const uploadFiles = computed(() => elUpload.value?.uploadFiles)
  const uploadDisabled = computed(() => elUpload.value?.uploadDisabled)

  return {
    expose: {
      get elUpload() {
        return elUpload.value
      },
      clearFiles() {
        elUpload.value!.clearFiles()
      },
      abort(file: ElUploadInternalFileDetail) {
        elUpload.value!.abort(file)
      },
      submit() {
        elUpload.value!.submit()
      },
      removeFile(file: ElUploadFile, raw?: string) {
        elUpload.value?.handleRemove(file, raw)
      },
      get uploadFiles() {
        return elUpload.value?.uploadFiles
      }
    },
    render: () => {
      const showFileList = globalUploadProps?.showFileList || props.showFileList
      const uploadList = h(UploadList, {
        props: {
          disabled: uploadDisabled.value,
          files: uploadFiles.value,
          listType: props.listType,
          handlePreview: props.onPreview
        },
        on: {
          remove(file: ElUploadFile) {
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
          ...handleDefaultProps<GlobalUploadProps>(props as GlobalUploadProps, globalUploadProps, globalPropNames),
          showFileList: props.listType === 'picture-card' ? showFileList : false
        },
      },
        props.listType === 'picture-card'
          ? [
              renderSlot(context, 'trigger'),
              renderSlot(context, 'default'),
              renderSlot(context, 'tip'),
            ]
          : [
              h('slot', { slot: 'trigger' }, context.slots.default ? context.slots.default() : [null]),
              ...context.slots.tip?.()!,
              showFileList && uploadList
            ]
      )
    }
  }
}