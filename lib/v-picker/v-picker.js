export default {
  name: 'VPicker',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    columns: {
      type: Array,
      default: () => [],
      required: true
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
    prop: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' })
    }
  },
  computed: {
    _columns() {
      return Array.from(this.columns).map((item) => ({
        text: item[this.prop.label],
        value: item[this.prop.value],
        ...item
      }))
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && this.value ? 'clear' : 'arrow'
    },
    _text() {
      const curr = Array.from(this._columns).find(item => item.value === this.value)
      return curr?.[this.prop.label]
    },
    index() {
      for (let i = 0; i < this._columns.length; i++) {
        const item = this._columns[i]
        if (item.value === this.value) {
          return i
        }
      }
      return 0
    },
    $picker() {
      return this.$refs.picker
    }
  },
  data() {
    return {
      show: false,
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
    onConfirm(value, index) {
      this.show = false
      this.$emit('input', value.value, index)
      this.$emit('change', value.value, index)
    },
    onClick() {
      if (this.disabled || this.readonly) {
        return false
      }
      this.show = true
      this.$nextTick(() => {
        this.$picker.setIndexes([this.index])
      })
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
          <van-picker
            ref="picker"
            show-toolbar={true}
            columns={this._columns}
            readonly={this.readonly}
            value-key={this.prop.label}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        </van-popup>
      </van-field>
    )
  }
}