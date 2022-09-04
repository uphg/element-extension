import { defineComponent, h } from "vue"

const UploadListProps = {
  files: {
    type: Array,
    default() {
      return [];
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  handlePreview: Function,
  listType: String
}

export default defineComponent({
  name: 'EUpload',
  props: UploadListProps,
  setup(props, context) {

    return h('transition-group', {
      class: [
        'el-upload-list',
        'el-upload-list--' + props.listType,
        { 'is-disabled': props.disabled }
      ],
      props: {
        tag: 'ul',
        name: 'el-list'
      }
    })
  }
})