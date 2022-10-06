import { h, ref, SetupContext } from "vue";
import { Slider } from "element-ui";
import { ElSlider } from "element-ui/types/slider";
import { globalSliderProps, GlobalSliderProps, sliderBaseProps, SliderProps } from "./sliderProps";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { ObjectLike } from "../../../../types/_common";
import { createNames, keys } from "../../../utils";

export function useSlider<T extends ObjectLike>(
  props: SliderProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SliderProps | ObjectLike, GlobalSliderProps>
) {
  const elSlider = ref<ElSlider | null>(null)
  const { handleProps, handleRef: _handleRef } = options || {}
  const handleRef = (_handleRef || ((el: ElSlider) => { elSlider.value = el })) as unknown as string
  const propNames = createNames(sliderBaseProps, options?.status)
  const globalPropNames = keys(globalSliderProps)
  const { createProps } = useComponentProps(props, 'slider', { propNames, globalPropNames, handleProps })
  const on = context?.emit ? {
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
      return h(Slider, { ref: handleRef, props: createProps(), on })
    }
  }
}