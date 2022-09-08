import { computed, h, onMounted, ref, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload as _ElUpload, ElUploadInternalFileDetail } from "element-ui/types/upload"
import { UploadProps } from "./uploadProps"
import { generateProps } from "../../../utils/generateProps"
import UploadList from "./UploadList"
import { renderSlot } from "../../../utils/renderSlot"
import { ElUploadFile } from "./uploadListProps"

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

  const uploadFiles = computed(() => elUpload.value?.uploadFiles)
  const uploadDisabled = computed(() => elUpload.value?.uploadDisabled)

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
      const showFileList = props.showFileList
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
          showFileList: props.listType === 'picture-card' ? props.showFileList : false
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