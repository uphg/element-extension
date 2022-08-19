import {
  Button,
  Input,
  Select,
  Cascader,
  Option,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  InputNumber,
  Switch,
  Slider,
  TimeSelect,
  DatePicker,
  Upload,
  TimePicker,
  OptionGroup
} from 'element-ui'
import { h, Ref, ref, SetupContext } from 'vue'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { find, omitBy } from '../../utils'
import { CustomInputProps } from '../../shared/customInputProps'
import { CustomInputOptions, CustomInputValue } from '../../types/customInput'
import { useOnInput } from '../../shared/useOnInput'
import { EmitFn } from 'vue/types/v3-setup-context'

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

export function useCustomInput<T extends CustomInputProps>(props: T, context: SetupContext<{}>, options?: CustomInputParamsOptions) {
  const { onKeyup } = options || {}
  const { emit } = context

  const nativeOn = omitBy({ keyup: onKeyup }, (item) => !item)
  const inputRef = ref<any>(null)
  const _onInput = useOnInput(props, context)
  const onInput = options?.onInput ? options.onInput : _onInput

  const { onClick, onChange, onVisibleChange, onBlur, onFocus, onClear } = useEvents(emit)
  const { focus, blur, select } = useExpose(inputRef)

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
        clearable: props.clearable,
        showPassword: props.showPassword,
        disabled: props.disabled,
        size: props.size,
        suffixIcon: props.suffixIcon,
        prefixIcon: props.prefixIcon,
        showWordLimit: props.showWordLimit,
        tabindex: props.tabindex,
        validateEvent: props.validateEvent
      },
      attrs: {
        placeholder: context.attrs.placeholder,
        autocomplete: context.attrs.autocomplete,
        name: context.attrs.name,
        readonly: context.attrs.readonly,
        step: context.attrs.step,
        autofocus: context.attrs.autofocus,
        form: context.attrs.form,
        rows: context.attrs.rows,
        autosize: context.attrs.autosize,
        maxlength: context.attrs.maxlength,
        minlength: context.attrs.minlength,
        max: props.max,
        min: props.min,
      },
      on: {
        input: onInput,
        change: onChange,
        blur: onBlur,
        clear: onClear
      },
      nativeOn,
    }, [
      context.slots?.suffix && h('slot', {
        slot: 'suffix'
      }, context.slots.suffix()),
      context.slots?.prefix && h('slot', {
        slot: 'prefix'
      }, context.slots.prefix()),
      context.slots?.prepend && h('slot', {
        slot: 'prepend'
      }, context.slots.prepend()),
      context.slots?.append && h('slot', {
        slot: 'append'
      }, context.slots.append())
    ])
  }, {
    type: 'number',
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
        step: props.step,
        stepStrictly: props.stepStrictly,
        precision: props.precision,
        controls: props.controls,
        controlsPosition: props.controlsPosition,
        size: props.size,
        min: props.min,
        max: props.max,
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
        placeholder: context.attrs.placeholder,
        defaultFirstOption: props.defaultFirstOption,
        reserveKeyword: props.reserveKeyword,
        valueKey: props.valueKey,
        collapseTags: props.collapseTags,
        popperAppendToBody: props.popperAppendToBody
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
        props: props.props,
        size: props.size,
        placeholder: context.attrs.placeholder ,
        disabled: props.disabled,
        clearable: props.clearable,
        filterable: props.filterable,
        filterMethod: props.filterMethod,
        separator: props.separator,
        showAllLevels: props.showAllLevels,
        collapseTags: props.collapseTags,
        debounce: props.debounce,
        beforeFilter: props.beforeFilter,
        popperClass: props.popperClass,

        // PopperMixin
        placement: props.placement,
        appendToBody: props.appendToBody,
        visibleArrow: props.visibleArrow,
        arrowOffset: props.arrowOffset,
        offset: props.offset,
        boundariesPadding: props.boundariesPadding,
        popperOptions: props.popperOptions,
        transformOrigin: props.transformOrigin
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
        width: props.width,
        activeIconClass: props.activeIconClass,
        inactiveIconClass: props.inactiveIconClass,
        activeText: props.activeText,
        inactiveText: props.inactiveText,
        activeColor: props.activeColor,
        inactiveColor: props.inactiveColor,
        activeValue: props.activeValue,
        inactiveValue: props.inactiveValue,
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
        min: props.min || 0,
        max: props.max || 100,
        step: props.step,
        showInput: props.showInput,
        showInputControls: props.showInputControls,
        inputSize: props.inputSize,
        showStops: props.showStops,
        showTooltip: props.showTooltip,
        formatTooltip: props.formatTooltip,
        range: props.range,
        vertical: props.vertical,
        height: props.height,
        debounce: props.debounce,
        tooltipClass: props.tooltipClass,
        marks: props.marks,
        size: props.size,
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
        data: props.data,
        withCredentials: props.withCredentials,
        showFileList: props.showFileList,
        drag: props.drag,
        accept: props.accept, // accept="image/png, image/jpeg"
        onPreview: props.onPreview,
        onRemove: props.onRemove,
        onSuccess: props.onSuccess,
        onError: props.onError,
        onProgress: props.onProgress,
        onChange: props.onChange,
        beforeUpload: props.beforeUpload,
        beforeRemove: props.beforeRemove,
        listType: props.listType,
        autoUpload: props.autoUpload,
        fileList: props.fileList,
        httpRequest: props.httpRequest,
        limit: props.limit,
        onExceed: props.onExceed,
        name: context.attrs.name,
      },
      scopedSlots: {
        file: props => context.slots.file && context.slots.file({ file: props.file })
      }
    }, [
      context.slots?.default && h('slot', {
        slot: 'default'
      }, context.slots.default()),
      context.slots?.trigger && h('slot', {
        slot: 'trigger'
      }, context.slots.trigger()),
      context.slots?.tip && h('slot', {
        slot: 'tip'
      }, context.slots.tip())
    ])
  }]

  const getDataAttrs = (isTime: boolean = false) => ({
    ref: setRef,
    props: {
      value: props.value,
      ...(isTime ? {} : { type: props.type }),
      format: props.format,
      valueFormat: props.valueFormat,
      readonly: props.readonly,
      startPlaceholder: props.startPlaceholder,
      endPlaceholder: props.endPlaceholder,
      prefixIcon: props.prefixIcon,
      clearIcon: props.clearIcon,
      disabled: props.disabled,
      clearable: props.clearable,
      popperClass: props.popperClass,
      editable: props.editable,
      align: props.align,
      defaultValue: props.defaultValue,
      defaultTime: props.defaultTime,
      rangeSeparator: props.rangeSeparator,
      pickerOptions: props.pickerOptions,
      unlinkPanels: props.unlinkPanels,
      size: props.size,
      validateEvent: props.validateEvent,

      // ElTimePicker
      isRange: props.isRange,
      arrowControl: props.arrowControl,

      // ElDatePicker
      timeArrowControl: props.timeArrowControl,

      // 原生属性
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

  const template = find(inputMap, ({ type }) => (
    typeof type === 'string' ? props.type === type : type.indexOf(props.type) !== -1
  ))

  return template!
}

function renderSelectOptions(props: CustomInputProps, context: SetupContext<{}>) {

  const renderOptions = (item: CustomInputOptions, index: number) => h(Option, {
    key: `s.s.opt.${index}`,
    props: {
      label: item.label,
      value: item.value,
      disabled: item.disabled
    }
  }, [context.slots.options?.(item)])

  return props.withOptionGroup
    ? (props.options as CustomInputOptions[])?.map(
      (group, i) => h(OptionGroup, {
        key: `s.s.opt.g${i}`,
        props: {
          label: group.label 
        }
      }, [group.options?.map(renderOptions)])
    )
    : props.options?.map(renderOptions)
}
