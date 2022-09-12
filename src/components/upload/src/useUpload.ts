import { computed, h, ref, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload as _ElUpload, ElUploadInternalFileDetail } from "element-ui/types/upload"
import { UploadProps } from "./uploadProps"
import pick from "../../../utils/pick"
import UploadList from "./UploadList"
import { FakeSlot, renderSlot } from "../../../utils/renderSlot"
import { ElUploadFile } from "./uploadListProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { GlobalUploadProps } from "../../config-provider/src/configProviderProps"
import { withDefaultProps } from "../../../utils/withDefaultProps"

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
          ...pick(props, propNames),
          ...withDefaultProps(props, globalUploadProps, globalPropNames),
          showFileList: props.listType === 'picture-card' ? showFileList : false
        },
      },
        props.listType === 'picture-card'
          ? [
              renderSlot(context, 'tip'),
              renderSlot(context, 'trigger'),
              renderSlot(context, 'default'),
            ]
          : [
              context.slots.default && (
                context.slots.trigger
                  ? context.slots.default().concat(renderSlot(context, 'trigger')!)
                  : h(FakeSlot, { slot: 'trigger' }, context.slots.default ? context.slots.default() : [null])
              ),
              context.slots.tip?.(),
              showFileList && uploadList
            ]
      )
    }
  }
}

// trigger
// default