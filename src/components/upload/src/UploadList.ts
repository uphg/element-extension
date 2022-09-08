import { defineComponent, h, PropType, ref } from "vue"
import { StaggeredTransitionGroup } from "../../staggered-transition-group";

type ElUploadFile = {
  uid: string | number;
  status: string;
}

const UploadListProps = {
  files: {
    type: Array as PropType<ElUploadFile[]>,
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
    const focusing = ref(false)
    const listItemOn = {
      focus() { focusing.value = true },
      blur() { focusing.value = false },
      click() { focusing.value = false }
    }
    return () => h(StaggeredTransitionGroup, {
      class: [
        'el-upload-list',
        'el-upload-list--' + props.listType,
        { 'is-disabled': props.disabled }
      ],
      props: {
        tag: 'ul'
      }
    }, props.files.map(
        (file) => h('li', {
          class: ['el-upload-list__item', 'is-' + file.status, focusing.value ? 'focusing' : ''],
          key: file.uid,
          on: listItemOn
        })
      )
    )
  }
})