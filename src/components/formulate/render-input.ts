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
  TimePicker
} from 'element-ui'
import { h, Ref, SetupContext } from 'vue'
import { isArray } from '../../utils'
import { PartialInputProps } from '../../types/formulate'
import { FormData } from '../../types/form'
import { CustomInputOptions } from 'src/types/custom-input'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { ElForm } from 'element-ui/types/form'
import renderDate from './render-date'

function renderInput(props: PartialInputProps, _options: { formRef: Ref<HTMLElement | ElForm>, formData: Ref<FormData>, context: SetupContext<{}> }) {
  const { formRef, formData, context } = _options
  // if (props.vIf && typeof props.vIf === 'function' && !props.vIf(formData.value)) {
  //   return null
  // }
  switch (props.type || 'text') {
    case 'text':
    case 'password':
    case 'textarea':
      return h(Input, {
        ref: props.ref,
        props: {
          type: props.type,
          value: formData.value[props.key],
          disabled: props.disabled,
          clearable: props.clearable,
          suffixIcon: props.suffixIcon,
          prefixIcon: props.prefixIcon,
          showWordLimit: props.showWordLimit,
          showPassword: props.showPassword,
          rows: props.rows,
          placeholder: props.placeholder,
          autosize: props.autosize
        },
        attrs: {
          minlength: props.minlength,
          maxlength: props.maxlength,
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        },
        scopedSlots: props.scopedSlots
      }, props?.children)
    case 'number':
      return h(InputNumber, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
          step: props.step,
          stepStrictly: props.stepStrictly,
          precision: props.precision,
          controls: props.controls,
          controlsPosition: props.controlsPosition,
          size: props.size,
          min: props.min,
          max: props.max,
          placeholder: props.placeholder,
          name: props.name,
        },
        on: {
          input(newVal: any) {
            if (props.value === newVal) return
            formData.value[props.key] = newVal
          }
        }
      })
    case 'radio':
      if (!props.options) {
        throw new Error('[SimElement] "options" attribute is required when type="radio"');
      }
      return h(RadioGroup, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        }
      }, props.options.map(
        (item: CustomInputOptions, index: number) => h(Radio, {
          key: `sim.radio.options.${index}`,
          props: {
            label: item.value,
            disabled: item.disabled,
          }
        }, [item.label])
      ))
    case 'checkbox':
      if (!props.options) {
        throw new Error('[SimElement] "options" attribute is required when type="checkbox"');
      }
      return h(CheckboxGroup, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        }
      }, props.options.map(
        (item: CustomInputOptions, index: number) => h(Checkbox, {
          key: `sim.checkbox.options.${index}`,
          props: {
            label: item.value,
            disabled: item.disabled,
          },
        }, [item.label])
      ))

    case 'select':
      if (!props.options) {
        throw new Error('[SimElement] "options" attribute is required when type="select"');
      }
      return h(Select, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
          placeholder: props.placeholder
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        }
      }, props.options.map(
        (item: CustomInputOptions, index: number) => h(Option, {
          key: `sim.select.options.${index}`,
          props: {
            label: item.label,
            value: item.value,
            disabled: item.disabled,
          }
        }, item.children)
      ))

    case 'cascader':
      return h(Cascader, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
          options: props.options,
          clearable: props.clearable,
          showAllLevels: props.showAllLevels,
          props: props.props,
          collapseTags: props.collapseTags,
          placeholder: props.placeholder
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        },
        scopedSlots: props.scopedSlots
      })

    case 'switch':
      return h(Switch, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
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
          placeholder: props.placeholder
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        }
      })

    case 'slider':
      return h(Slider, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          min: props.min,
          max: props.max,
          step: props.step,
          showInput: props.showInput,
          showInputControls: props.showInputControls,
          inputSize: props.inputSize,
          showStops: props.showStops,
          showTooltip: props.showTooltip,
          formatTooltip: props.formatTooltip,
          disabled: props.disabled,
          range: props.range,
          vertical: props.vertical,
          height: props.height,
          debounce: props.debounce,
          label: props.label,
          tooltipClass: props.tooltipClass,
          marks: props.marks
        },
        on: {
          input(value: any) {
            formData.value[props.key] = value
          }
        }
      })

    case 'date':
    case 'year':
    case 'month':
    case 'dates':
    case 'week':
    case 'daterange':
    case 'monthrange':
    case 'datetime':
    case 'datetimerange':
      return renderDate(props, _options, 1)

    case 'file':
    case 'upload':
      return h(Upload, {
        ref: props.ref,
        props: {
          disabled: props.disabled,
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
          onSuccess: (response: any, file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) => {
            formData.value[props.key] = fileList
            props.onSuccess && props.onSuccess(response, file, fileList)
          },
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
          name: props.name
        },
        scopedSlots: props.scopedSlots
      }, [
        ...(
          props.children ? props.children : props.button && [h(Button, {
            props: {
              type: props.button?.hue || 'primary',
              size: props.button?.size || 'small',
              plain: props.button?.plain,
              round: props.button?.round,
              circle: props.button?.circle,
              icon: props.button?.icon
            }
          }, [props.button?.text])]
        ),
        props.tips && h('div', {
            class: props.tipClass || 'el-upload__tip',
            slot: 'tip',
          }, props.tips.map((item: string) => h('div', {
            class: props.tipItemClass || 'el-upload__tip-item',
          }, [item]))
        )
      ]
      )

    case 'time':
    case 'time-select':
      return renderDate(props, _options, 2)

    case 'time-picker':
      return renderDate(props, _options, 3)

    case 'button':
      return h(Button, {
        ref: props.ref,
        props: {
          disabled: props.disabled,
          type: props.hue
        },
        on: {
          click(event: MouseEvent) {
            props.onClick(event)
          }
        },
        scopedSlots: props.scopedSlots
      }, props?.children?.length || [props.text])
  }
}

export default renderInput