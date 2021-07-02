// components
import VForm from './VForm'
import VPicker from './VPicker'
import VDatetimePicker from './VDatetimePicker'
import VToolBar from './VToolBar'
import VSvgIcon from './VSvgIcon'
import VBadge from './VBadge'
import VCard from './VCard'
import VField from './VField'
import VFakeInput from './VFakeInput'
import VDropdown from './VDropdown'
import VUploader from './VUploader'
import VEmpty from './VEmpty'

const components = [
  VForm,
  VPicker,
  VDatetimePicker,
  VToolBar,
  VSvgIcon,
  VBadge,
  VCard,
  VField,
  VFakeInput,
  VDropdown,
  VUploader,
  VEmpty,
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
  version: process.env.VERSION || require('../package.json').version,
  install: install,
  ...components
}