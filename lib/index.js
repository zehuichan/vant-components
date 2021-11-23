// lib
import './style/index.less'
import locale from './locale'
import Fragment from './fragment'
import VForm from './v-form'
import VField from './v-field'
import VRadioButton from './v-radio-button'
import VPicker from './v-picker'
import VDatePicker from './v-date-picker'
import VToolBar from './v-tool-bar'
import VSvgIcon from './v-svg-icon'
import VBadge from './v-badge'
import VCard from './v-card'
import VPrice from './v-price'
import VQrcode from './v-qrcode'
import VBarcode from './v-barcode'
import VTime from './v-time'
import VF2 from './v-f2'
import VSwitch from './v-switch'
import VStepper from './v-stepper'
import VAutoComplete from './v-auto-complete'
import VRate from './v-rate'
import VSlider from './v-slider'
import VCalendar from './v-calendar'
import VCascader from './v-cascader'
import VArea from './v-area'
import VEllipsis from './v-ellipsis'
import VSpace from './v-space'
import VProp from './v-checker'

const components = [
  Fragment,
  VForm,
  VField,
  VRadioButton,
  VPicker,
  VDatePicker,
  VToolBar,
  VSvgIcon,
  VBadge,
  VCard,
  VPrice,
  VQrcode,
  VBarcode,
  VTime,
  VF2,
  VSwitch,
  VStepper,
  VAutoComplete,
  VRate,
  VSlider,
  VCalendar,
  VCascader,
  VArea,
  VEllipsis,
  VSpace,
  VProp,
]

const install = (Vue, opts = {}) => {
  if (install.installed) {
    return
  }
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: APP_VERSION,
  APP_VERSION,
  GIT_HASH,
  install,
  ...components
}