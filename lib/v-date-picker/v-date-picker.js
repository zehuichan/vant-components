// utils
import { isEmpty } from '../utils'

import { format } from 'date-fns'

export default {
  name: 'VDatePicker',
  inheritAttrs: false,
  props: {
    value: [String, Number, Date],
    type: {
      type: String,
      default: 'datetime'
    },
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
      if (this.$props.disabled || this.$props.readonly) {
        return 'arrow'
      }
      return this.$props.clearable && !isEmpty(this.value) ? 'clear' : 'arrow'
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
  data() {
    return {
      show: false
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
      this.show = false
      if (this.valueFormat) {
        this.$emit('input', format(new Date(value), this.valueFormat))
        this.$emit('change', format(new Date(value), this.valueFormat))
      } else {
        this.$emit('input', value)
        this.$emit('change', value)
      }
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
      attrs: {
        ...this.$attrs,
      },
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
