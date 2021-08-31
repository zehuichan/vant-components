// mixins
import field from '../mixins/field'
import picker from '../mixins/picker'

import { format } from 'date-fns'

export default {
  name: 'VDatePicker',
  mixins: [field, picker],
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
    }
  },
  data() {
    return {
      show: false,
      date: this.value
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
      if (this.value) {
        this.date = new Date(this.value)
      } else {
        this.date = new Date()
      }
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
        ...field.transform(this),
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
            vModel={this.date}
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
