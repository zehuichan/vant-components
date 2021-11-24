import './index.less'
import VCheckerItem from './item'

export default {
  name: 'VChecker',
  inheritAttrs: false,
  provide() {
    return {
      'checker': this
    }
  },
  components: {
    VCheckerItem
  },
  props: {
    value: {
      required: true
    },
    title: String,
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    lazyLoad: Boolean,
    prop: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' })
    }
  },
  data() {
    return {
      formattedColumns: [],
      options: [],
      currentValue: this.value
    }
  },
  computed: {
    _dataType() {
      const firstColumn = this.columns[0] || {}

      if (firstColumn.values) {
        return 'object'
      }

      return 'text'
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true,
    },
    value(val) {
      this.currentValue = val
    }
  },
  methods: {
    format() {
      if (this._dataType === 'text') {
        this.formattedColumns = [{ values: this.getColumns(this.columns) }]
      } else {
        this.formattedColumns = this.columns.map(item => ({ ...item, values: this.getColumns(item.values) }))
      }
    },
    getColumns(values) {
      return values.map((item) => ({
        text: item[this.prop.label],
        value: item[this.prop.value],
        ...item
      }))
    },
    onOptionSelect(option, byClick) {
      const value = (this.currentValue || []).slice()
      const pos = value.indexOf(option.value)

      if (pos > -1) {
        value.splice(pos, 1)
      } else if (this.multiple) {
        value.push(option.value)
      } else {
        value.splice(0, 1, option.value)
      }

      this.currentValue = value

      this.$emit('change', this.currentValue)
    },
    onConfirm() {
      this.$emit('input', this.currentValue)
      this.$emit('confirm', this.currentValue)
    },
    onCancel() {
      this.$emit('cancel')
    }
  },
  render() {
    const renderToolbar = () => (
      <div class="v-checker__toolbar">
        <button type="button" class="van-picker__cancel" onClick={this.onCancel}>取消</button>
        <div class="van-ellipsis van-picker__title">{this.title}</div>
        <button type="button" class="van-picker__confirm" onClick={this.onConfirm}>确认</button>
      </div>
    )

    const renderColumns = () => (
      <div class="v-checker__content">
        {
          this.formattedColumns.map((item, columnIndex) => (
            <div class="v-checker__group">
              {item.title ? <div class="v-checker__title">{item.title}</div> : null}
              {renderOptions(item)}
            </div>
          ))
        }
      </div>
    )

    const renderOptions = (item) => (
      item.values.map((option) => (
        <v-checker-item
          label={option.label}
          value={option.value}
          imgUrl={option.imgUrl}
          disabled={option.disabled || item.disabled}
          onClick={this.onOptionSelect}
        />
      ))
    )

    return (
      <div class="v-checker">
        {renderToolbar()}
        {renderColumns()}
      </div>
    )
  }
}