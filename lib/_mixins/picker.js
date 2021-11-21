import { isEmpty } from '../utils'

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    title: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    isEmpty
  },
}