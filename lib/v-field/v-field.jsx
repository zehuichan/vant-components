import { $_formatValue } from '../utils/formate-value'

export default {
  name: 'VField',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    showPassword: Boolean
  },
  data() {
    return {
      show: this.showPassword
    }
  },
  computed: {
    type() {
      return this.show ? 'password' : this.$attrs.type
    },
    rightIcon() {
      if (this.showPassword) {
        return this.show ? 'eye' : 'closed-eye'
      }
      return this.$attrs.rightIcon
    }
  },
  methods: {
    $_clickRightIcon() {
      this.show = !this.show
    },
    $_inputChange(val) {
      this.$emit('input', val)
    },
    formatter(n) {
      let o = this.value
      if (this.$attrs.type === 'tel') {
        return $_formatValue(n, o, 'phone').value
      }
      if (this.$attrs.type === 'bankCard') {
        return $_formatValue(n, o, 'bankCard').value
      }
      if (this.$attrs.type === 'money') {
        return $_formatValue(n, o, 'money').value
      }
      return n
    }
  }
}