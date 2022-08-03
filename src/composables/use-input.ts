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
  Upload
} from 'element-ui'
import { h, ref, SetupContext } from 'vue'
import { toString, find, omitBy } from '../utils'
import { InputProps } from '../shared/input-props'
// import { ElementUIComponent } from 'element-ui/types/component'
// import { ElButton } from 'element-ui/types/button'
// import { ElInput } from 'element-ui/types/input'
// import { ElSelect } from 'element-ui/types/select'
// import { ElCalendar } from 'element-ui/types/calendar'
// import { ElOption } from 'element-ui/types/option'
// import { ElRadioGroup } from 'element-ui/types/radio-group'
// import { ElRadio } from 'element-ui/types/radio'
// import { ElCheckboxGroup } from 'element-ui/types/checkbox-group'
// import { ElCheckbox } from 'element-ui/types/checkbox'
// import { ElInputNumber } from 'element-ui/types/input-number'
// import { ElSwitch } from 'element-ui/types/switch'
// import { ElSlider } from 'element-ui/types/slider'
// import { ElTimeSelect } from 'element-ui/types/time-select'
// import { ElDatePicker } from 'element-ui/types/date-picker'
import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { InputOptions, InputValue } from '../types/input'

type useInputParamsOptions = {
  onKeyup?: (event: any) => void;
  onInput?: (event: any) => void;
}

interface BaseProps extends InputProps {
  exclude?: string | number | RegExp  
}



// type InputComponents = Vue | HTMLElement | ElButton | ElInput | ElSelect | ElCalendar | ElOption | ElRadioGroup | ElRadio | ElCheckboxGroup | ElCheckbox | ElInputNumber | ElSwitch | ElSlider | ElTimeSelect | ElDatePicker | ElUpload


export function useInput<T extends BaseProps>(props: T, context: SetupContext<{}>, options?: useInputParamsOptions) {
  const { onKeyup } = options || {}
  const { emit } = context

  const nativeOn = omitBy({ keyup: onKeyup }, (item) => !item)

  const inputRef = ref<any>(null)

  function onClick(event: Event | MouseEvent | TouchEvent | InputEvent) {
    emit('click', event)
  }

  const onInput = options?.onInput ? options.onInput : props.exclude ? (value: InputValue) => {
    const newVal = toString(value).replace(props.exclude as RegExp, '')
    emit('input', newVal)
  } : (value: InputValue) => {
    emit('input', value)
  }

  function onChange(value: InputValue) {
    emit('change', value)
  }

  function onVisibleChange(value: InputValue) {
    emit('visible-change', value)
  }

  function onBlur(value: InputValue) {
    emit('blur', value)
  }

  function onFocus(event: InputValue) {
    emit('focus', event)
  }

  function onClear() {
    emit('clear')
  }

  function focus() {
    inputRef.value?.focus()
  }

  function blur() {
    inputRef.value?.blur()
  }

  function select() {
    // @ts-ignore
    inputRef.value?.select()
  }

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
      },
      on: {
        input: onInput,
        change: onChange
      }
    }, props.options?.map(
      (item) => h(Radio, {
        props: {
          label: item.value,
          disabled: item.disabled,
          size: props.size,
        }
      }, [item.label])
    ))
  }, {
    type: 'checkbox',
    render: () => h(CheckboxGroup, {
      props: {
        value: props.value,
        disabled: props.disabled,
      },
      on: {
        input: onInput,
        change: onChange
      }
    }, props.options?.map(
      (item: InputOptions) => h(Checkbox, {
        props: {
          label: item.value,
          disabled: item.disabled,
          size: props.size,
        },
        attrs: {
          name: item.name
        }
      }, [item.label])
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
        disabled: props.disabled,
        showPassword: props.showPassword,
        suffixIcon: props.suffixIcon,
        prefixIcon: props.prefixIcon,
        maxlength: props.maxlength,
        minlength: props.minlength,
        showWordLimit: props.showWordLimit,
        size: props.size,
        clear: onClear
      },
      attrs: context.attrs,
      on: {
        input: onInput,
        change: onChange,
        blur: onBlur,
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
    attrs: context.attrs,
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
        value: props.value,
        clearable: props.clearable,
        disabled: props.disabled,
        size: props.size,
        multiple: props.multiple,
        multipleLimit: props.multipleLimit,
        collapseTags: props.collapseTags,
        popperAppendToBody: props.popperAppendToBody,
        autocomplete: context.attrs.autocomplete
      },
      attrs: context.attrs,
      on: {
        input: onInput,
        change: onChange,
        visibleChange: onVisibleChange,
        blur: onBlur,
        clear: onClear
      },
      nativeOn
    }, props.options?.map(
      (item) => h(Option, {
        props: {
          label: item.label,
          value: item.value,
          disabled: item.disabled,
          size: props.size,
        }
      })
    ))
  }, {
    type: 'cascader',
    render: () => h(Cascader, {
      props: {
        value: props.value,
        disabled: props.disabled,
        options: props.options,
        clearable: props.clearable,
        showAllLevels: props.showAllLevels,
        props: props.props,
        collapseTags: props.collapseTags
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
    render: () => h(DatePicker, {
      ref: setRef,
      props: {
        value: props.value,
        type: props.type,
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
        validateEvent: props.validateEvent,
        size: props.size,
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
  }, {
    type: 'time',
    render: () => h(TimeSelect, {
      props: {
        value: props.value,
        pickerOptions: props.pickerOptions,
        disabled: props.disabled,
        size: props.size,
      },
      on: {
        input: onInput,
        change: onChange
      }
    })
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
        value: props.value,
        disabled: props.disabled,
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

  const template = find(inputMap, ({ type }) => (
    typeof type === 'string' ? props.type === type : type.indexOf(props.type) !== -1
  ))

  return template!
}
