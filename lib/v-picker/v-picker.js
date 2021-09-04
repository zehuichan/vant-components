import { isEmpty } from '../utils'

import { createTreeMate, createIndexGetter } from 'treemate'

export default {
  name: 'VPicker',
  inheritAttrs: false,
  props: {
    value: [String, Number, Array],
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
    separator: {
      type: String,
      default: '-'
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
    _text() {
      return this.getText(this.formattedColumns)
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && !isEmpty(this.value) ? 'clear' : 'arrow'
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
    _treemate(data) {
      return createTreeMate(data, {
        getKey: (node) => node.value,
      })
    },
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
        // 是否有子，并递归处理
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
        const flattenedNodes = this._treemate(values).getFlattenedNodes()
        const getIndex = createIndexGetter(flattenedNodes)
        this.value.forEach((key) => {
          ret.push(flattenedNodes[getIndex(key)].index)
        })
      }
      return ret
    },
    getText(values) {
      if (isEmpty(this.value)) {
        return ''
      }

      const ret = []

      if (this._dataType === 'text' || this._dataType === 'object') {
        for (let [index, item] of values.entries()) {
          ret.push(item.values.find((val) => val[this.prop.value] === (this.value[index] ?? this.value)))
        }
        return ret.map(item => item[this.prop.label]).join(this.separator)
      } else {
        const flattenedNodes = this._treemate(values).getFlattenedNodes()
        const getIndex = createIndexGetter(flattenedNodes)
        this.value.forEach((key) => {
          ret.push(flattenedNodes[getIndex(key)].rawNode[this.prop.label])
        })
        return ret.join(this.separator)
      }
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
          const flattenedNodes = this._treemate([this.columns[index[0]]]).getFlattenedNodes()
          values = value.map(item => {
            return flattenedNodes.find(v => v.rawNode[this.prop.label] === item).key
          })
        }
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
      attrs: { ...this.$props, ...this.$attrs },
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
        readonly
        clickable
      >
        <van-popup slot="extra" vModel={this.show} position="bottom" get-container="body">
          <van-picker
            ref="picker"
            title={this.title}
            show-toolbar
            columns={this.formattedColumns}
            value-key={this.prop.label}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        </van-popup>
      </van-field>
    )
  }
}