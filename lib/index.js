// lib
import dayjs from 'dayjs'
import locale from './locale'
import Fragment from './fragment'
import VForm from './v-form'
import VFormItem from './v-form-item'
import VField from './v-field'
import VRadioButton from './v-radio-button'
import VPicker from './v-picker'
import VDatetimePicker from './v-datetime-picker'
import VToolBar from './v-tool-bar'
import VSvgIcon from './v-svg-icon'
import VBadge from './v-badge'
import VCard from './v-card'
import VPrice from './v-price'

const components = [
  Fragment,
  VForm,
  VFormItem,
  VField,
  VRadioButton,
  VPicker,
  VDatetimePicker,
  VToolBar,
  VSvgIcon,
  VBadge,
  VCard,
  VPrice,
]

const install = (Vue, opts = {}) => {
  if (install.installed) {
    return
  }
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.map(component => Vue.component(component.name, component))

  Vue.prototype.$D = dayjs
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION || require('../package.json').version,
  install,
  ...components
}