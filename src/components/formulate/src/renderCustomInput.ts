import { Button, Input, Select, Cascader, Option, RadioGroup, Radio, CheckboxGroup, Checkbox, InputNumber, Switch, Slider } from 'element-ui'
import { Upload } from '../../upload/index'
import { h, Ref, SetupContext } from 'vue'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { ElForm } from 'element-ui/types/form'
import { FormData } from '../../../types/form'
import { CustomInputOptions } from '../../../types/customInput'
import renderDate from './renderDate'
import { FormulateField } from './formulateProps'
import { VNode } from 'vue/types/umd'
import { GlobalInputProps } from '../../../components/config-provider/src/configProviderProps'
import { createExclude } from '../../../utils/createExclude'
import toString from '../../../utils/toString'

function renderCustomInput(
  props: FormulateField,
  _options: {
    elForm: Ref<HTMLElement | ElForm | null>;
    formData: Ref<FormData>;
    context: SetupContext<{}>;
    globalInputProps?: GlobalInputProps;
  }
) {
  const { elForm, formData, context, globalInputProps } = _options
  switch (props.type || 'text') {
    case 'text':
    case 'password':
    case 'textarea':
      return h(Input, {
        ref: props.ref,
        props: {
          type: props.type,
          value: formData.value[props.key],
          autocomplete: props.autocomplete,
          clearable: props.clearable,
          showPassword: props.showPassword,
          disabled: props.disabled,
          size: props.size,
          suffixIcon: props.suffixIcon,
          prefixIcon: props.prefixIcon,
          showWordLimit: props.showWordLimit,
          tabindex: props.tabindex,
          validateEvent: props.validateEvent,
        },
        attrs: {
          placeholder: props.placeholder,
          name: props.name,
          readonly: props.readonly,
          step: props.step,
          autofocus: props.autofocus,
          form: props.form,
          rows: props.rows,
          autosize: props.autosize,
          maxlength: props.maxlength || globalInputProps?.maxlength,
          minlength: props.minlength,
          max: props.max,
          min: props.min,
        },
        on: {
          input(value: any) {
            if (props.exclude) {
              const exclude = createExclude(props.exclude!)
              const newVal = toString(value).replace(exclude, '')
              formData.value[props.key] = newVal
            } else {
              formData.value[props.key] = value
            }            
          }
        },
        scopedSlots: props.scopedSlots
      }, props?.children)

    case 'number':
    case 'input-number':
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
        throw new Error('[ElementPart] "options" attribute is required when type="radio"');
      }
      return h(RadioGroup, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
          size: props.size
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
        throw new Error('[ElementPart] "options" attribute is required when type="checkbox"');
      }
      return h(CheckboxGroup, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
          size: props.size
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
        throw new Error('[ElementPart] "options" attribute is required when type="select"');
      }
      return h(Select, {
        ref: props.ref,
        props: {
          value: formData.value[props.key],
          disabled: props.disabled,
          placeholder: props.placeholder,
          size: props.size
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
          options: props.options,
          props: props.props,
          size: props.size,
          placeholder: props.placeholder ,
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
          size: props.size,
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
          marks: props.marks,
          size: props.size,
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
    case 'date-picker':
      return renderDate(props, _options, 1)

    case 'file':
    case 'upload':
      if (!props.action) {
        throw new Error('[ElementPart] upload component "action" attribute is required');
      }
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
          props.children ? (props.children as VNode[]) : [props.button] && [h(Button, {
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
      }, props?.children?.length ? props.children : [props.text])
  }
}

export default renderCustomInput