import { h, ref, SetupContext } from "vue";
import { Slider } from "element-ui";
import { ElSlider } from "element-ui/types/slider";
import { GlobalSliderProps, SliderProps } from "./sliderProps";
import { globalSliderPropNames } from "../../../shared/configPropertyMap";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { ObjectLike } from "../../../types/object-like";

const disabledName = 'disabled'

export function useSlider<T extends ObjectLike>(
  props: SliderProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SliderProps | ObjectLike, GlobalSliderProps>
) {
  const elSlider = ref<ElSlider | null>(null)
  const { handleProps } = options || {}
  const setRef = (options?.setRef || ((el: ElSlider) => { elSlider.value = el })) as unknown as string
  const propNames = options?.status === 1 ? [disabledName] : ['value', disabledName]
  const { createProps } = useComponentProps(props, 'slider', { propNames, globalPropNames: globalSliderPropNames, handleProps })
  const on = context ? {
    change(value: number) {
      context.emit('change', value)
    },
    input(value: number) {
      context.emit('input', value)
    }
  } : options?.on
  
  return {
    expose: {
      get elSlider() {
        return elSlider.value
      }
    },
    render() {
      return h(Slider, { ref: setRef, props: createProps(), on })
    }
  }
}