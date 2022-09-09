import { defineComponent, h, ref, VNodeChildren } from "vue"
import { t } from 'element-ui/src/locale';
import { Progress } from "element-ui";
import { StaggeredTransitionGroup } from "../../staggered-transition-group";
import { ElUploadFile, UploadListProps } from "./uploadListProps";
import { VNodeData } from "vue/types/umd";

export default defineComponent({
  name: 'EUpload',
  props: UploadListProps,
  emits: ['remove'],
  setup(props, context) {
    const focusing = ref(false)
    const fileOn = {
      focus() { focusing.value = true },
      blur() { focusing.value = false },
      click() { focusing.value = false }
    }

    function handleClick(file: ElUploadFile) {
      props.handlePreview && props.handlePreview(file);
    }

    function parsePercentage(val: string) {
      return parseInt(val, 10);
    }

    const liWrap = (data: VNodeData, children?: VNodeChildren) => props.listType === 'picture'
      ? h('li', { class: 'el-upload-list__item-wrap', key: data.key }, [h('div', { ...data, key: 'div' + data.key }, children)])
      : h('li', data, children)

    return () => h(
      props.listType === 'text' || props.listType === 'picture' ? StaggeredTransitionGroup : 'ul', {
      class: [
        'el-upload-list',
        'el-upload-list--' + props.listType,
        { 'is-disabled': props.disabled }
      ],
      props: props.listType === 'text' || props.listType === 'picture' ? { tag: 'ul', appear: true } : {}
    }, props.files.map(
        (file) => liWrap({
          class: ['el-upload-list__item', 'is-' + file.status, focusing.value ? 'focusing' : ''],
          key: file.uid,
          on: {
            ...fileOn,
            keydown(event: KeyboardEvent) {
              const key = event.key;
              if (/* key === 'Backspace' || */ key === "Delete") {
                !props.disabled && context.emit('remove', file)
              }
            }
          },
          scopedSlots: {
            default: () => context.slots.default && context.slots.default({ file })
          }
        }, [
          // <img class="el-upload-list__item-thumbnail">
          file.status !== 'uploading'
            && ['picture-card', 'picture'].indexOf(props.listType!) > -1
            && h('img', { class: 'el-upload-list__item-thumbnail', domProps: { src: file.url, alt: '' } }),
          
          // <a class="el-upload-list__item-name">
          h('a', { class: 'el-upload-list__item-name', on: { click: () => handleClick(file) } }, [
            h('i', { class: 'el-icon-document' }), file.name
          ]),

          // <label class="el-upload-list__item-status-label">
          h('label', { class: 'el-upload-list__item-status-label' }, [
            h('i', { class: {
              'el-icon-upload-success': true,
              'el-icon-circle-check': props.listType === 'text',
              'el-icon-check': ['picture-card', 'picture'].indexOf(props.listType!) > -1
            } })
          ]),

          // <i class="el-icon-close">
          !props.disabled && h('i', { class: 'el-icon-close', on: { click: () => context.emit('remove', file) } }),

          // <i class="el-icon-close-tip">
          !props.disabled && h('i', { class: 'el-icon-close-tip', on: { click: () => context.emit('remove', file) } }, [t('el.upload.deleteTip')]),

          // <el-progress>
          file.status === 'uploading' && h(Progress, {
            props: {
              type: props.listType === 'picture-card' ? 'circle' : 'line',
              strokeWidth: props.listType === 'picture-card' ? 6 : 2,
              percentage: parsePercentage(file.percentage)
            }
          }),

          // <span class="el-upload-list__item-actions">
          props.listType === 'picture-card' && h('span', { class: 'el-upload-list__item-actions' }, [
            // <span class="el-upload-list__item-preview">
            props.handlePreview && props.listType === 'picture-card' && h('span', { class: 'el-upload-list__item-preview', on: { click: () => props.handlePreview!(file) } }, [
              // <i class="el-icon-zoom-in">
              h('i', { class: 'el-icon-zoom-in' })
            ]),

            // <span class="el-upload-list__item-delete">
            !props.disabled && h('span', { class: 'el-upload-list__item-delete', on: { click: () => context.emit('remove', file) } }, [
              h('i', { class: 'el-icon-delete' })
            ])
          ])
        ])
      )
    )
  }
})