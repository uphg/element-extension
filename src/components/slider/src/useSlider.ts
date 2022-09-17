import { h, ref, SetupContext } from "vue";
import { Slider } from "element-ui";
import { ElSlider } from "element-ui/types/slider";
import { GlobalSliderProps, SliderProps } from "./sliderProps";
import { configPropertyMap } from "../../../shared/configPropertyMap";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";

const propNames = ['value', 'disabled']
const globalPropNames = configPropertyMap.slider.propNames

export function useSlider(
  props: SliderProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<SliderProps, GlobalSliderProps>
) {
  const elSlider = ref<ElSlider | null>(null)
  const { handleProps } = options || {}
  const { createProps } = useComponentProps(props, 'slider', { propNames, globalPropNames, handleProps })
  const on = {
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