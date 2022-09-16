import { computed, h, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload as _ElUpload } from "element-ui/types/upload"
import { GlobalUploadProps, UploadProps } from "./uploadProps"
import UploadList from "./UploadList"
import { FakeSlot, renderSlot } from "../../../utils/renderSlot"
import { ElUploadFile } from "./uploadListProps"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { useElUpload } from "../../../composables/useElUpload"

const propNames = ['name', 'dragger', 'withCredentials', 'type', 'beforeUpload', 'beforeRemove', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'fileList',   'disabled', 'limit', 'onExceed']
const globalPropNames = ['action', 'headers', 'multiple', 'data', 'drag', 'accept', 'listType', 'autoUpload', 'httpRequest']

export function useUpload(
  props: UploadProps,
  context:  SetupContext<{}>,
  options?: UseComponentParamsOptions<UploadProps, GlobalUploadProps>
) {
  const { handleProps } = options || {}
  const { elUpload, setRef, clearFiles, abort, submit } = useElUpload()
  const { createProps, globalProps } = useComponentProps(props, 'upload', { propNames: [...propNames, 'showFileList'], globalPropNames, handleProps })

  const uploadFiles = computed(() => elUpload.value?.uploadFiles)
  const uploadDisabled = computed(() => elUpload.value?.uploadDisabled)

  return {
    expose: {
      clearFiles,
      abort,
      submit,
      removeFile(file: ElUploadFile, raw?: string) {
        elUpload.value?.handleRemove(file, raw)
      },
      get elUpload() {
        return elUpload.value
      },
      get uploadFiles() {
        return elUpload.value?.uploadFiles
      }
    },
    render: () => {
      const uploadProps = createProps()
      const showFileList = uploadProps.showFileList || globalProps?.showFileList || true
      const listType = props.listType || globalProps?.showFileList || 'text'
      const uploadList = h(UploadList, {
        props: {
          disabled: uploadDisabled.value,
          files: uploadFiles.value,
          listType,
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
          ...uploadProps,
          showFileList: listType === 'picture-card' ? showFileList : false
        },
      },
        listType === 'picture-card'
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