import { Button, Input, Select, Cascader, Option, RadioGroup, Radio, CheckboxGroup, Checkbox, InputNumber, Switch, Slider, TimeSelect, DatePicker, TimePicker, OptionGroup } from 'element-ui'
import { Upload } from '../../upload/index'
import { h, Ref, ref, SetupContext } from 'vue'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { find, omitBy } from '../../../utils'
import { CustomInputOptions, CustomInputValue } from '../../../types/customInput'
import { useOnInput } from '../../../composables/useOnInput'
import { EmitFn } from 'vue/types/v3-setup-context'
import { FormItemProps } from './formItemProps'
import { renderSelectOptions } from '../../../utils/renderSelectOptions'
import { GlobalInputProps } from '../../../components/config-provider/src/configProviderProps'
import { useGlobalProps } from '../../../composables/useGlobalProps'
import { renderSlot } from '../../../utils/renderSlot'

type CustomInputParamsOptions = {
  onKeyup?: (event: any) => void;
  onInput?: (event: any) => void;
}

const useEvents = (emit: EmitFn) => ({
  onClick(event: MouseEvent | InputEvent) {
    emit('click', event)
  },

  onChange(value: CustomInputValue) {
    emit('change', value)
  },

  onVisibleChange(value: CustomInputValue) {
    emit('visible-change', value)
  },

  onBlur(value: CustomInputValue) {
    emit('blur', value)
  },

  onFocus(event: CustomInputValue) {
    emit('focus', event)
  },

  onClear() {
    emit('clear')
  }
})

const useExpose = (inputRef: Ref<any>) => ({
  focus() {
    inputRef.value?.focus()
  },

  blur() {
    inputRef.value?.blur()
  },

  select() {
    // @ts-ignore
    inputRef.value?.select()
  }
})

export function useCustomInput<T extends FormItemProps>(
  props: T,
  context: SetupContext<{}>,
  options?: CustomInputParamsOptions
) {
  const { onKeyup } = options || {}
  const { emit } = context

  const nativeOn = omitBy({ keyup: onKeyup }, (item) => !item)
  const inputRef = ref<any>(null)
  const _onInput = useOnInput(props, context)
  const onInput = options?.onInput ? options.onInput : _onInput

  const { onClick, onChange, onVisibleChange, onBlur, onFocus, onClear } = useEvents(emit)
  const { focus, blur, select } = useExpose(inputRef)
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')

  const setRef = function(el: HTMLInputElement) {
    inputRef.value = el
  } as unknown as string

  const inputMap = [{
    type: 'button',
    expose: {
      click() {
        inputRef.value?.$el.click()
      },
      focus() {
        inputRef.value?.$el.focus()
      }
    },
    render: () => h(Button, {
      ref: setRef,
      props: {
        type: props.hue,
        size: props.size,
      },
      on: {
        click: onClick,
      },
      nativeOn: {
        focus: onFocus,
        blur: onBlur,
        ...nativeOn
      },
    }, [props.text ? props.text : context.slots.default?.()])
  }, {
    type: 'radio',
    render: () => h(RadioGroup, {
      props: {
        value: props.value,
        disabled: props.disabled,
        size: props.size,
      },
      on: {
        input: onInput,
        change: onChange
      }
    }, props.options?.map(
      (item, index) => h(Radio, {
        key: `s.r.opt.${index}`,
        props: {
          label: item.value,
          disabled: item.disabled
        }
      }, [context.slots.options ? context.slots.options(item) : item.label])
    ))
  }, {
    type: 'checkbox',
    render: () => h(CheckboxGroup, {
      props: {
        value: props.value,
        disabled: props.disabled,
        size: props.size,
      },
      on: {
        input: onInput,
        change: onChange
      }
    }, props.options?.map(
      (item: CustomInputOptions, index) => h(Checkbox, {
        key: `s.c.opt.${index}`,
        props: {
          label: item.value,
          disabled: item.disabled
        },
        attrs: {
          name: item.name
        }
      }, [context.slots.options ? context.slots.options(item) : item.label]) || null
    ))
  }, {
    type: ['text', 'password', 'textarea'],
    expose: {
      focus,
      blur,
      select
    },
    render: () => h(Input, {
      ref: setRef,
      props: {
        type: props.type,
        value: props.value,
        autocomplete: context.attrs.autocomplete,
        clearable: props.clearable,
        showPassword: props.showPassword,
        disabled: props.disabled,
        size: props.size,
        suffixIcon: props.extends.suffixIcon,
        prefixIcon: props.extends.prefixIcon,
        showWordLimit: props.showWordLimit,
        tabindex: context.attrs.tabindex,
        validateEvent: props.validateEvent
      },
      attrs: {
        placeholder: context.attrs.placeholder,
        name: context.attrs.name,
        readonly: context.attrs.readonly,
        step: context.attrs.step,
        autofocus: context.attrs.autofocus,
        form: context.attrs.form,
        rows: context.attrs.rows,
        autosize: context.attrs.autosize,
        maxlength: context.attrs.maxlength || globalInputProps?.maxlength,
        minlength: context.attrs.minlength,
        max: context.attrs.max,
        min: context.attrs.min,
      },
      on: {
        input: onInput,
        change: onChange,
        blur: onBlur,
        clear: onClear
      },
      nativeOn,
    }, [
      renderSlot(context, 'suffix'),
      renderSlot(context, 'prefix'),
      renderSlot(context, 'prepend'),
      renderSlot(context, 'append')
    ])
  }, {
    type: ['number', 'input-number'],
    expose: {
      focus,
      blur() {
        const number = inputRef.value?.$el
        const input = number.querySelector('.el-input__inner')
        input.blur()
      },
      select
    },
    render: () => h(InputNumber, {
      ref: setRef,
      props: {
        value: props.value,
        disabled: props.disabled,
        step: context.attrs.step,
        stepStrictly: props.extends.stepStrictly,
        precision: props.extends.precision,
        controls: props.extends.controls,
        controlsPosition: props.extends.controlsPosition,
        size: props.size,
        min: context.attrs.min,
        max: context.attrs.max,
        placeholder: context.attrs.placeholder,
        name: context.attrs.name,
      },
      on: {
        input(newVal: string | number) {
          if (props.value === newVal) return
          onInput(newVal)
        },
        change: onChange,
        blur: onBlur,
      }
    })
  }, {
    type: 'select',
    expose: {
      focus,
      blur
    },
    render: () => h(Select, {
      ref: setRef,
      props: {
        name: context.attrs.name,
        id: context.attrs.id,
        value: props.value,
        autocomplete: context.attrs.autocomplete,
        automaticDropdown: props.extends.automaticDropdown,
        size: props.size,
        disabled: props.disabled,
        clearable: props.clearable,
        filterable: props.extends.filterable,
        allowCreate: props.extends.allowCreate,
        loading: props.extends.loading,
        popperClass: props.extends.popperClass,
        remote: props.extends.remote,
        loadingText: props.extends.loadingText,
        noMatchText: props.extends.noMatchText,
        noDataText: props.extends.noDataText,
        remoteMethod: props.extends.remoteMethod,
        filterMethod: props.extends.filterMethod,
        multiple: props.multiple,
        multipleLimit: props.extends.multipleLimit,
        placeholder: context.attrs.placeholder,
        defaultFirstOption: props.extends.defaultFirstOption,
        reserveKeyword: props.extends.reserveKeyword,
        valueKey: props.extends.valueKey,
        collapseTags: props.extends.collapseTags,
        popperAppendToBody: props.extends.popperAppendToBody
      },
      on: {
        input: onInput,
        change: onChange,
        visibleChange: onVisibleChange,
        blur: onBlur,
        clear: onClear
      },
      nativeOn
    }, renderSelectOptions(props, context))
  }, {
    type: 'cascader',
    render: () => h(Cascader, {
      props: {
        value: props.value,
        options: props.options,
        props: props.extends.props,
        size: props.size,
        placeholder: context.attrs.placeholder,
        disabled: props.disabled,
        clearable: props.clearable,
        filterable: props.extends.filterable,
        filterMethod: props.extends.filterMethod,
        separator: props.extends.separator,
        showAllLevels: props.extends.showAllLevels,
        collapseTags: props.extends.collapseTags,
        debounce: props.extends.debounce,
        beforeFilter: props.extends.beforeFilter,
        popperClass: props.extends.popperClass,

        // PopperMixin
        placement: props.extends.placement,
        appendToBody: props.extends.appendToBody,
        visibleArrow: props.extends.visibleArrow,
        arrowOffset: props.extends.arrowOffset,
        offset: props.extends.offset,
        boundariesPadding: props.extends.boundariesPadding,
        popperOptions: props.extends.popperOptions,
        transformOrigin: props.extends.transformOrigin
      },
      on: {
        input: onInput,
        change: onChange,
        blur: onBlur,
      }
    })
  }, {
    type: [
      'date', 'year', 'month', 'dates', 'week', 'daterange', 'monthrange',
      'datetime', 'datetimerange'
    ],
    expose: {
      focus
    },
    render: () => h(DatePicker, getDataAttrs())
  }, {
    // 时间选择器
    type: ['time', 'time-select'],
    expose: {
      focus
    },
    render: () => h(TimeSelect, getDataAttrs(true))
  }, {
    // 时间范围选择器
    type: ['timerange', 'time-picker'],
    expose: {
      focus
    },
    render: () => h(TimePicker, getDataAttrs(true))
  }, {
    type: 'switch',
    expose: {
      focus
    },
    render: () => h(Switch, {
      ref: setRef,
      props: {
        value: props.value,
        disabled: props.disabled,
        width: props.extends.width,
        activeIconClass: props.extends.activeIconClass,
        inactiveIconClass: props.extends.inactiveIconClass,
        activeText: props.extends.activeText,
        inactiveText: props.extends.inactiveText,
        activeColor: props.extends.activeColor,
        inactiveColor: props.extends.inactiveColor,
        activeValue: props.extends.activeValue,
        inactiveValue: props.extends.inactiveValue,
        validateEvent: props.validateEvent,
        size: props.size,
      },
      on: {
        input: onInput,
        change: onChange
      }
    })
  }, {
    type: 'slider',
    render: () => h(Slider, {
      props: {
        value: props.value || 0,
        disabled: props.disabled,
        min: context.attrs.min || 0,
        max: context.attrs.max || 100,
        step: context.attrs.step,
        size: context.attrs.size,
        showInput: props.extends.showInput,
        showInputControls: props.extends.showInputControls,
        inputSize: props.extends.inputSize,
        showStops: props.extends.showStops,
        showTooltip: props.extends.showTooltip,
        formatTooltip: props.extends.formatTooltip,
        range: props.extends.range,
        vertical: props.extends.vertical,
        height: props.extends.height,
        debounce: props.extends.debounce,
        tooltipClass: props.extends.tooltipClass,
        marks: props.extends.marks,
      },
      on: {
        input: onInput,
        change: onChange
      }
    })
  }, {
    type: ['file', 'upload'],
    expose: {
      clearFiles() {
        inputRef.value.clearFiles()
      },
      abort(file: ElUploadInternalFileDetail) {
        inputRef.value.abort(file)
      },
      submit() {
        inputRef.value.submit()
      }
    },
    render: () => h(Upload, {
      ref: setRef,
      props: {
        value: props.value,
        disabled: props.disabled,
        size: props.size,
        action: props.action,
        headers: props.headers,
        multiple: props.multiple,
        data: props.extends.data,
        withCredentials: props.extends.withCredentials,
        showFileList: props.extends.showFileList,
        drag: props.extends.drag,
        accept: props.accept, // accept="image/png, image/jpeg"
        onPreview: props.extends.onPreview,
        onRemove: props.extends.onRemove,
        onSuccess: props.extends.onSuccess,
        onError: props.extends.onError,
        onProgress: props.extends.onProgress,
        onChange: props.extends.onChange,
        beforeUpload: props.extends.beforeUpload,
        beforeRemove: props.extends.beforeRemove,
        listType: props.extends.listType,
        autoUpload: props.extends.autoUpload,
        fileList: props.fileList,
        httpRequest: props.extends.httpRequest,
        limit: props.extends.limit,
        onExceed: props.extends.onExceed,
        name: context.attrs.name,
      },
      scopedSlots: {
        file: props => context.slots.file && context.slots.file({ file: props.file })
      }
    }, [
      renderSlot(context, 'default'),
      renderSlot(context, 'trigger'),
      renderSlot(context, 'tip'),
    ])
  }]

  const getDataAttrs = (isTime: boolean = false) => ({
    ref: setRef,
    props: {
      value: props.value,
      ...(isTime ? {} : { type: props.type }),
      format: props.format,
      valueFormat: props.extends.valueFormat,
      readonly: context.attrs.readonly,
      disabled: props.disabled,
      clearable: props.clearable,
      size: props.size,
      validateEvent: props.validateEvent,
      startPlaceholder: props.extends.startPlaceholder,
      endPlaceholder: props.extends.endPlaceholder,
      prefixIcon: props.extends.prefixIcon,
      clearIcon: props.extends.clearIcon,
      popperClass: props.extends.popperClass,
      editable: props.extends.editable,
      align: props.extends.align,
      defaultValue: props.extends.defaultValue,
      defaultTime: props.extends.defaultTime,
      rangeSeparator: props.extends.rangeSeparator,
      pickerOptions: props.pickerOptions,
      unlinkPanels: props.extends.unlinkPanels,

      // ElTimePicker
      isRange: props.extends.isRange,
      arrowControl: props.extends.arrowControl,

      // ElDatePicker
      timeArrowControl: props.extends.timeArrowControl,

      // html attrs
      name: context.attrs.name,
      placeholder: context.attrs.placeholder,
    },
    on: {
      input: onInput,
      change: onChange,
      blur: onBlur,
      focus: onFocus
    }
  })
  const propsType = props.type || 'text'
  const template = find(inputMap, ({ type }) => (
    typeof type === 'string' ? propsType === type : type.indexOf(propsType) !== -1
  ))

  return template!
}
