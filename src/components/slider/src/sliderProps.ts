import { ExtractPropTypes } from "vue"
import { empty } from "../../../shared/commonProps"

export type GlobalSliderProps = ExtractPropTypes<typeof globalSliderProps>
export type SliderProps = ExtractPropTypes<typeof sliderProps>

export const globalSliderProps = {
  min: {
    type: Number,
    default: empty // 0
  },
  max: {
    type: Number,
    default: empty // 100
  },
  step: {
    type: Number,
    default: empty // 1
  },
  showInput: {
    type: Boolean,
    default: empty // false
  },
  showInputControls: {
    type: Boolean,
    default: empty // true
  },
  inputSize: {
    type: String,
    default: empty // 'small'
  },
  showStops: {
    type: Boolean,
    default: empty // false
  },
  showTooltip: {
    type: Boolean,
    default: empty // true
  },
  formatTooltip: {
    type: Function,
    default: empty
  },
  range: {
    type: Boolean,
    default: empty // false
  },
  vertical: {
    type: Boolean,
    default: empty // false
  },
  height: {
    type: String,
    default: empty
  },
  label: {
    type: String,
    default: empty
  },
  debounce: {
    type: Number,
    default: empty // 300
  },
  tooltipClass: {
    type: String,
    default: empty
  },
  marks: {
    type: Object,
    default: empty
  }
}

export const sliderBaseProps = {
  value: {
    type: [Number, Array],
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export const sliderProps = {
  ...sliderBaseProps,
  ...globalSliderProps
}