import { ElSelect } from "element-ui/types/select"
import { commonProps } from "../../shared/_commonProps"
import { CustomInputOptions } from "../../types/customInput"
import { defineComponent, h, PropType, ref } from "vue"
import { Select } from "element-ui"
import { renderSelectOptions } from '../../utils/renderSelectOptions'

const selectProps = {
  value: commonProps.value,
  name: commonProps.name,
  id: commonProps.id,
  autocomplete: commonProps.autocomplete,
  automaticDropdown: commonProps.automaticDropdown,
  size: commonProps.size,
  disabled: commonProps.disabled,
  clearable: commonProps.clearable,
  filterable: commonProps.filterable,
  allowCreate: commonProps.allowCreate,
  loading: commonProps.loading,
  popperClass: commonProps.popperClass,
  remote: commonProps.remote,
  loadingText: commonProps.loadingText,
  noMatchText: commonProps.noMatchText,
  noDataText: commonProps.noDataText,
  remoteMethod: commonProps.remoteMethod,
  filterMethod: commonProps.filterMethod,
  multiple: commonProps.multiple,
  multipleLimit: commonProps.multipleLimit,
  placeholder: commonProps.placeholder,
  defaultFirstOption: commonProps.defaultFirstOption,
  reserveKeyword: commonProps.reserveKeyword,
  valueKey: commonProps.valueKey,
  collapseTags: commonProps.collapseTags,
  popperAppendToBody: commonProps.popperAppendToBody,
  options: [Object, Array] as PropType<CustomInputOptions[]>,
  optionGroups: commonProps.optionGroups
}

export default defineComponent({
  name: 'ESelect',
  props: selectProps,
  setup(props, context) {

    const elSelect = ref<ElSelect | null>(null)

    context.expose({
      focus() {
        elSelect.value?.focus()
      },
    
      blur() {
        elSelect.value?.blur()
      },

      get elSelect() {
        return elSelect.value
      }
    })

    return () => h(Select, {
      // @ts-ignore
      ref: (el) => elSelect.value = el,
      props: {
        name: props.name,
        id: props.id,
        value: props.value,
        autocomplete: props.autocomplete,
        automaticDropdown: props.automaticDropdown,
        size: props.size,
        disabled: props.disabled,
        clearable: props.clearable,
        filterable: props.filterable,
        allowCreate: props.allowCreate,
        loading: props.loading,
        popperClass: props.popperClass,
        remote: props.remote,
        loadingText: props.loadingText,
        noMatchText: props.noMatchText,
        noDataText: props.noDataText,
        remoteMethod: props.remoteMethod,
        filterMethod: props.filterMethod,
        multiple: props.multiple,
        multipleLimit: props.multipleLimit,
        placeholder: props.placeholder,
        defaultFirstOption: props.defaultFirstOption,
        reserveKeyword: props.reserveKeyword,
        valueKey: props.valueKey,
        collapseTags: props.collapseTags,
        popperAppendToBody: props.popperAppendToBody
      },
      on: {
        input(value: unknown) {
          context.emit('input', value)
        },
        change(value: unknown) {
          context.emit('change', value)
        },
        visibleChange(value: unknown) {
          context.emit('visible-change', value)
        },
        blur(value: unknown) {
          context.emit('blur', value)
        },
        clear() {
          context.emit('clear')
        }
      }
    }, [
      context.slots?.prefix && h('slot', { slot: 'prefix' }, context.slots.prefix()),
      context.slots?.empty && h('slot', { slot: 'empty' }, context.slots.empty()),
      ...renderSelectOptions(props, context)!,
    ])
  }
})