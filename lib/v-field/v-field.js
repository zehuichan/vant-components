// mixins
import field from '../mixins/field'
// utils
import { $_formatValue } from '../utils/formate-value'

export default {
  name: 'VField',
  mixins: [field],
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
      attrs: {
        ...field.transform(this),
        ...this.$attrs,
      },
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
        right-icon={this.rightIcon}
        formatter={this.formatter}
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