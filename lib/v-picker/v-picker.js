import { isEmpty } from '../utils'

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
    title: String,
    separator: {
      type: String,
      default: ','
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
      return this.clearable && !isEmpty(this.value) ? 'clear' : 'arrow'
    },
    _text() {
      return this.getText(this.formattedColumns)
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
      } else if (this._dataType === 'cascade') {
        this.formattedColumns = this.formatCascade(this.columns)
      } else {
        this.formattedColumns = this.columns.map(item => ({ values: this.getColumns(item.values) }))
      }
    },
    formatCascade(values) {
      const ret = []
      values.forEach((item) => {
        const tmp = {
          text: item[this.prop.label],
          value: item[this.prop.value],
          ...item
        }
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
          // Recursion
          item.children = this.formatCascade(item.children)
        }
        ret.push(tmp)
      })
      return ret
    },
    getColumns(values) {
      return values.map((item) => ({
        text: item[this.prop.label],
        value: item[this.prop.value],
        ...item
      }))
    },
    getIndexes(values) {
      const ret = []
      if (this._dataType === 'text' || this._dataType === 'object') {
        for (let [index, item] of values.entries()) {
          ret.push(item.values.findIndex((val) => val[this.prop.value] === (this.value[index] ?? this.value)))
        }
      } else {
        return [0, 0, 1]
      }
      return ret
    },
    getValues(values, indexes) {
      for (const item of values) {
        console.log(item)
        if (item.children && item.children.length > 0) {
          this.getValues(item.children)
        }
      }
      return []
    },
    getText(values) {
      const ret = []
      if (this._dataType === 'text' || this._dataType === 'object') {
        for (let [index, item] of values.entries()) {
          ret.push(item.values.find((val) => val[this.prop.value] === (this.value[index] ?? this.value)))
        }
      } else {

      }

      if (isEmpty(this.value)) {
        return ''
      }

      return ret.map(item => item[this.prop.label]).join(this.separator)
    },
    onClear() {
      if (!this.clearable) {
        return false
      }

      if (this._dataType === 'text') {
        this.$emit('input', '')
        this.$emit('clear', '')
      } else {
        this.$emit('input', [])
        this.$emit('clear', [])
      }
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

        if (this._dataType === 'cascade') {
          values = this.getValues(this.formattedColumns, index)
        }
        console.log(values)
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
        this.$picker.setIndexes(this.getIndexes(this.formattedColumns))
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
            title={this.title}
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