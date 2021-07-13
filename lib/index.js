// lib
import dayjs from 'dayjs'
import VForm from './components/VForm'
import VPicker from './components/VPicker'
import VDatetimePicker from './components/VDatetimePicker'
import VToolBar from './components/VToolBar'
import VSvgIcon from './components/VSvgIcon'
import VBadge from './components/VBadge'
import VCard from './components/VCard'

const components = [
  VForm,
  VPicker,
  VDatetimePicker,
  VToolBar,
  VSvgIcon,
  VBadge,
  VCard,
]

const install = (Vue, opts = {}) => {
  if (install.installed) {
    return
  }
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