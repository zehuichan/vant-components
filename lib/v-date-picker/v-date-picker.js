import picker from '../_mixins/picker'
import { format } from 'date-fns'

export default {
  name: 'VDatePicker',
  inheritAttrs: false,
  mixins: [picker],
  props: {
    value: [String, Number, Date],
    type: {
      type: String,
      default: 'datetime'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    valueFormat: String,
  },
  computed: {
    _text() {
      if (this.value) {
        return format(new Date(this.value), this.format)
      }
      return null
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'clock-o'
      }
      return this.clearable && !this.isEmpty(this.value) ? 'clear' : 'clock-o'
    },
    _date: {
      get() {
        if (this.value) {
          return new Date(this.value)
        }
        return new Date()
      },
      set(val) {

      }
    }
  },
  methods: {
    onClear() {
      if (!this.clearable) {
        return false
      }

      this.$emit('input', '')
      this.$emit('clear', '')
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value) {
      let d

      d = this.valueFormat ? format(new Date(value), this.valueFormat) : value

      this.$emit('input', d)
      this.$emit('change', d)

      this.show = false
    },
    onClick() {
      if (this.disabled || this.readonly) {
        return false
      }
      this.show = true
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      } else if (type === 'minute') {
        return `${val}分`
      }
      return val
    }
  },
  render() {
    const data = {
      attrs: { ...this.$attrs },
      on: {
        ...this.$listeners,
        'click': (event) => {
          this.onClick()
        },
        'click-right-icon': (event) => {
          event.stopPropagation()
          this.onClear()
        }
      }
    }
    return (
      <van-field
        {...data}
        class="v-picker"
        value={this._text}
        right-icon={this._icon}
        readonly
        clickable
      >
        <van-popup slot="extra" vModel={this.show} position="bottom" get-container="body">
          <van-datetime-picker
            vModel={this._date}
            type={this.type}
            title={this.title}
            formatter={this.formatter}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        </van-popup>
      </van-field>
    )
  }
}
