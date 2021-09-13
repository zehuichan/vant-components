import picker from '../_mixins/picker'
import { format } from 'date-fns'

export default {
  name: 'VCalendar',
  inheritAttrs: false,
  mixins: [picker],
  props: {
    value: [String, Number, Array, Date],
    multiple: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    valueFormat: String,
  },
  computed: {
    _separator() {
      return this._type === 'range' ? '至' : ','
    },
    _text() {
      if (this.value) {
        if (this._type === 'range' || this._type === 'multiple') {
          return this.value.map(item => format(new Date(item), this.format)).join(this._separator)
        }
        return format(new Date(this.value), this.format)
      }
      return null
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'calendar-o'
      }
      return this.clearable && !this.isEmpty(this.value) ? 'clear' : 'calendar-o'
    },
    _type() {
      if (this.multiple) {
        return 'multiple'
      }
      if (this.range) {
        return 'range'
      }
      return 'single'
    },
    _date() {
      const { value, _type } = this

      if (_type === 'range') {
        const [startDay, endDay] = value.map(item => new Date(item))
        return [startDay, endDay]
      }

      if (_type === 'multiple') {
        return value.map(item => new Date(item))
      }

      return value ? new Date(value) : new Date()
    }
  },
  methods: {
    onClear() {
      if (!this.clearable) {
        return false
      }
      this.$emit('input', this._type === 'single' ? '' : [])
      this.$emit('clear', this._type === 'single' ? '' : [])
    },
    onConfirm(value) {
      let d

      if (this._type === 'single') {
        d = this.valueFormat ? format(new Date(value), this.valueFormat) : value
      }

      if (this._type === 'multiple' || this._type === 'range') {
        d = this.valueFormat ? value.map(item => format(new Date(item), this.valueFormat)) : value
      }

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
  },
  render() {
    const data = {
      attrs: { ...this.$attrs },
    }

    return (
      <van-field
        class="v-picker"
        {...data}
        {...{
          on: {
            'click': (event) => {
              this.onClick()
            },
            'click-right-icon': (event) => {
              event.stopPropagation()
              this.onClear()
            }
          }
        }}
        value={this._text}
        right-icon={this._icon}
        readonly
        clickable
      >
        <van-calendar
          slot="extra"
          vModel={this.show}
          type={this._type}
          default-date={this._date}
          get-container="body"
          onConfirm={this.onConfirm}
          scopedSlots={{
            title: this.$scopedSlots.title,
            footer: this.$scopedSlots.footer,
            'top-info': (day) => this.$scopedSlots['top-info'] && this.$scopedSlots['top-info']({ day }),
            'bottom-info': (day) => this.$scopedSlots['bottom-info'] && this.$scopedSlots['bottom-info']({ day }),
          }}
        />
      </van-field>
    )
  }
}