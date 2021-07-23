import VCard from './v-card'

VCard.install = function (Vue) {
  Vue.component(VCard.name, VCard)
}

export default VCard
