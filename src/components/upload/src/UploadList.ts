import { defineComponent, h } from "vue"
import { StaggeredTransitionGroup } from "../../staggered-transition-group";

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
    return h(StaggeredTransitionGroup, {
      class: [
        'e-upload-list',
        'e-upload-list--' + props.listType,
        { 'is-disabled': props.disabled }
      ],
      props: {
        tag: 'ul'
      }
    })
  }
})