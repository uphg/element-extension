import Slider from './src/Slider'
import { sliderProps } from './src/sliderProps'
import { useSlider } from './src/useSlider'

Slider.install = function (Vue) {
  Vue.component(Slider.name, Slider);
}

export { Slider, sliderProps, useSlider }
