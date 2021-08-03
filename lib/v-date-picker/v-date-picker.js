export default {
  name: 'VDatePicker',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number, Date],
    type: String,
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
    valueFormat: String
  },
  computed: {
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && this.value ? 'clear' : 'arrow'
    },
    _text() {
      if (this.value) {
        return this.$D(this.value).format(this.valueFormat)
      }
      return null
    }
  },
  data() {
    return {
      show: false,
      date: new Date()
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
      this.$emit('input', this.$D(value).format(this.valueFormat))
      this.$emit('change', this.$D(value).format(this.valueFormat))
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
  },
  render() {
    const data = {
      attrs: {
        ...this.$attrs,
        clearable: this.clearable,
        disabled: this.disabled,
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
        readonly={true}
        clickable={true}
      >
        <van-popup slot="extra" vModel={this.show} position="bottom" get-container="body">
          <van-datetime-picker
            vModel={this.date}
            type={this.type}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        </van-popup>
      </van-field>
    )
  }
}
