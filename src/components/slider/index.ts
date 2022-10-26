import Slider from './src/Slider'
import { sliderProps } from './src/sliderProps'
import { useSlider } from './src/useSlider'
import { withInstall } from '../../utils'

const ESlider = withInstall(Slider)

export { Slider, ESlider, sliderProps, useSlider }
