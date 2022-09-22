import { h, ref, SetupContext } from "vue";
import { Slider } from "element-ui";
import { ElSlider } from "element-ui/types/slider";
import { GlobalSliderProps, SliderProps } from "./sliderProps";
import { globalSliderPropNames } from "../../../shared/configPropertyMap";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { ObjectLike } from "../../../types/object-like";

const propNames = ['value', 'disabled']

export function useSlider<T extends ObjectLike>(
  props: SliderProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SliderProps | ObjectLike, GlobalSliderProps>
) {
  const elSlider = ref<ElSlider | null>(null)
  const { handleProps } = options || {}
  const { createProps } = useComponentProps(props, 'slider', { propNames, globalPropNames: globalSliderPropNames, handleProps })
  const on = context && {
    change(value: number) {
      context.emit('change', value)
    },
    input(value: number) {
      context.emit('input', value)
    }
  }
  return {
    expose: {
      get elSlider() {
        return elSlider.value
      }
    },
    render() {
      return h(Slider, { props: createProps(), on })
    }
  }
}