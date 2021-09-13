import VCalendar from './v-calendar'

VCalendar.install = function (Vue) {
  Vue.component(VCalendar.name, VCalendar)
}

export default VCalendar
