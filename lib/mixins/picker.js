import { isEmpty } from '../utils'

export default {
  props: {
    title: String,
  },
  computed: {
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && !isEmpty(this.value) ? 'clear' : 'arrow'
    }
  }
}