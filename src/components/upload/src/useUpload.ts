import { computed, h, SetupContext } from "vue"
import { Upload } from "element-ui"
import { ElUpload as _ElUpload } from "element-ui/types/upload"
import { GlobalUploadProps, UploadProps } from "./uploadProps"
import UploadList from "./UploadList"
import { FakeSlot, renderSlot } from "../../../utils/renderSlot"
import { ElUploadFile } from "./uploadListProps"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { useElUpload } from "../../../composables/useElUpload"
import { ObjectLike } from "../../../../types/_common"
import { globalUploadPropNames } from "../../../shared/configPropertyMap"
import { ElUpload } from "../../../../types/_element-ui"

const _propNames = ['name', 'dragger', 'type', 'fileList', 'disabled']
const globalPropNames = globalUploadPropNames

export function useUpload<T extends ObjectLike>(
  props: UploadProps | T,
  context?: Partial<SetupContext<{}>>,
  options?: UseComponentParamsOptions<UploadProps | ObjectLike, GlobalUploadProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elUpload, clearFiles, abort, submit } = useElUpload()
  const handleRef = (_handleRef || ((el: ElUpload) => elUpload.value = el)) as unknown as string
  const { createProps, globalProps } = useComponentProps(props, 'upload', { propNames: [..._propNames, 'showFileList'], globalPropNames, handleProps })
  const uploadFiles = computed(() => elUpload.value?.uploadFiles)
  const uploadDisabled = computed(() => elUpload.value?.uploadDisabled)

  const uploadListOn = context?.emit && {
    remove(file: ElUploadFile) {
      elUpload.value?.handleRemove(file)
    }
  }

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
    render() {
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
        on: uploadListOn,
        scopedSlots: {
          default: context?.slots && ((props: ObjectLike) => {
            if (context.slots?.file) {
              return context.slots.file({ file: props.file })
            }
          })
        }
      })

      const slots = context?.slots && (listType === 'picture-card'
        ? [
            renderSlot(context as SetupContext<{}>, 'tip'),
            renderSlot(context as SetupContext<{}>, 'trigger'),
            renderSlot(context as SetupContext<{}>, 'default'),
          ]
        : [
            context.slots?.default && (
              context.slots?.trigger
                ? context.slots.default().concat(renderSlot(context as SetupContext<{}>, 'trigger')!)
                : h(FakeSlot, { slot: 'trigger' }, context.slots.default ? context.slots.default() : [null])
            ),
            context.slots?.tip?.(),
          ])

      return h(Upload, {
        ref: handleRef,
        props: {
          ...uploadProps,
          showFileList: listType === 'picture-card' ? showFileList : false
        },
      }, slots?.concat((listType === 'picture-card' ? [] : showFileList && uploadList )))
    }
  }
}
