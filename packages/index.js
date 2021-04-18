// components
import VForm from './VForm'
import VPicker from './VPicker'
import VDatetimePicker from './VDatetimePicker'
import VToolBar from './VToolBar'
import VSvgIcon from './VSvgIcon'
import VBadge from './VBadge'
import VCard from './VCard'

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
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}