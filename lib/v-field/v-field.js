// utils
import { $_formatValue } from '../utils/formate-value'

export default {
  name: 'VField',
  inheritAttrs: false,
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
    _type() {
      return this.show ? 'password' : this.$attrs.type
    },
    _icon() {
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
    $_formatter(n) {
      let o = this.value || ''
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
  },
  render() {
    const data = {
      attrs: { ...this.$attrs, ...this.$props },
      on: {
        ...this.$listeners,
        input: this.$_inputChange,
        'click-right-icon': this.$_clickRightIcon
      }
    }
    return (
      <van-field
        {...data}
        value={this.value}
        type={this._type}
        right-icon={this._icon}
        formatter={this.$_formatter}
        scopedSlots={{
          label: this.$scopedSlots.label,
          input: this.$scopedSlots.input,
          'left-icon': this.$scopedSlots.leftIcon,
          'right-icon': this.$scopedSlots.rightIcon,
          button: this.$scopedSlots.button,
          extra: this.$scopedSlots.extra,
        }}
      />
    )
  }
}