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
import { InputOptions } from 'src/types/input'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { ElForm } from 'element-ui/types/form'
import renderDate from './render-date'

function renderInput(props: PartialInputProps, _options: { formRef: Ref<HTMLElement | ElForm>, formData: Ref<FormData>, context: SetupContext<{}> }) {
  const { formRef, formData, context } = _options
  if (props.vIf && typeof props.vIf === 'function' && !props.vIf(formData.value)) {
    return null
  }
  switch (props.type || 'text') {
    case 'text':
    case 'password':
    case 'textarea':
      return h(Input, {
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
        }
      })
    case 'number':
      return h(InputNumber, {
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
      return h(RadioGroup, {
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
        (item: InputOptions) => h(Radio, {
          props: {
            label: item.value,
            disabled: item.disabled,
          }
        }, [item.label])
      ))
    case 'checkbox':
      return h(CheckboxGroup, {
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
        (item: InputOptions) => h(Checkbox, {
          props: {
            label: item.value,
            disabled: item.disabled,
          },
        }, [item.label])
      ))
    case 'select':
      return h(Select, {
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
        (item: InputOptions) => h(Option, {
          props: {
            label: item.label,
            value: item.value,
            disabled: item.disabled,
          }
        })
      ))
    case 'cascader':
      return h(Cascader, {
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
        }
      })
    case 'switch':
      return h(Switch, {
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
        props: {
          value: formData.value[props.key],
          disabled: props.disabled
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
        }
      }, [
        ...(
          props.slots ? props.slots : [h(Button, {
            props: {
              type: 'primary',
              size: 'small',
            }
          }, ['点击上传'])]
        ),
        props.tip && h('div', {
          class: props.tipClass || 'el-upload__tip',
          slot: 'tip',
        }, isArray(props.tip) ? props.tip.map((item) => h('div', {
          class: props.tipItemClass || 'el-upload__tip-item',
        }, [item])) : [h('div', {
          class: props.tipItemClass || 'el-upload__tip-item'
        }, [props.tip])])
      ]
      )

    case 'time':
    case 'time-select':
      return renderDate(props, _options, 2)
    case 'time-picker':
      return renderDate(props, _options, 3)
    case 'button':
      return h(Button, {
        props: {
          disabled: props.disabled,
          type: props.hue
        },
        on: {
          click(event: MouseEvent) {
            props.onClick(event)
          }
        }
      }, [props.text && props.text])
  }
}

export default renderInput