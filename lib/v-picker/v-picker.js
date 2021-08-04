export default {
  name: 'VPicker',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number, Array],
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    separator: {
      type: String,
      default: '-'
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
  data() {
    return {
      show: false,
      formattedColumns: []
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
    _dataType() {
      const firstColumn = this.columns[0] || {}

      if (firstColumn.children) {
        return 'cascade'
      }

      if (firstColumn.values) {
        return 'object'
      }

      return 'text'
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && this.value ? 'clear' : 'arrow'
    },
    _text() {
      if (this._dataType === 'text') {
        const curr = Array.from(this.formattedColumns[0].values).find(item => item.value === this.value)
        return curr?.[this.prop.label]
      } else {

      }
    },
    index() {
      return this.getIndexes(this.formattedColumns)
    },
    $picker() {
      return this.$refs.picker
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true,
    },
  },
  methods: {
    format() {
      if (this._dataType === 'text') {
        this.formattedColumns = [{ values: this.getColumns(this.columns) }]
      } else {
        this.formattedColumns = this.columns.map(item => ({ values: this.getColumns(item.values) }))
      }
    },
    getColumns(values) {
      return values.map((item) => ({
        text: item[this.prop.label],
        value: item[this.prop.value],
        ...item
      }))
    },
    getIndexes(values) {
      if (this._dataType === 'text') {

      } else {
      }
    },
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
      if (this._dataType === 'text') {
        this.$emit('input', value[0][this.prop.value], index)
        this.$emit('change', value[0][this.prop.value], index)
      } else {
        let values = value.map(item => item[this.prop.value])

        this.$emit('input', values, index)
        this.$emit('change', values, index)
      }
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
        'click': () => {
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
            columns={this.formattedColumns}
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