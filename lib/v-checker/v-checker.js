import './index.less'
import { getValueByPath } from '../utils'
import VOption from './v-option'

export default {
  name: 'VChecker',
  inheritAttrs: false,
  provide() {
    return {
      'checker': this
    }
  },
  components: {
    VOption
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
      currentValue: this.value,
      kw: ''
    }
  },
  computed: {
    _dataType() {
      const firstColumn = this.columns[0] || {}

      if (firstColumn.values) {
        return 'object'
      }

      return 'text'
    },
    _rawData() {
      const value = (this.currentValue || []).slice()
      const result = []
      value.forEach(value => {
        result.push(this.getOption(value))
      })
      return result.map(item => ({ label: item.label, value: item.value }))
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true,
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
    getOption(value) {
      let option
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]'
      const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]'
      const valueKey = this.prop.value

      for (let i = this.options.length - 1; i >= 0; i--) {
        const cachedOption = this.options[i]
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, valueKey) === getValueByPath(value, valueKey)
          : cachedOption.value === value
        if (isEqual) {
          option = cachedOption
          break
        }
      }
      if (option) return option
      const label = (!isObject && !isNull && !isUndefined)
        ? String(value) : ''
      let newOption = {
        value: value,
        currentLabel: label
      }
      if (this.multiple) {
        newOption.hitState = false
      }
      return newOption
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

      this.$emit('change', this.currentValue, this._rawData)
    },
    onConfirm() {
      this.$emit('input', this.currentValue)
      this.$emit('confirm', this.currentValue, this._rawData)
    },
    onCancel() {
      this.$emit('cancel')
    }
  },
  render() {
    const renderHeader = () => (
      <div class="v-checker__header">
        <div class="van-ellipsis">{this.title}</div>
        <van-icon class="v-checker__header-close" name="cross" onClick={this.onCancel}/>
      </div>
    )

    const renderToolbar = () => (
      <div class="v-checker__toolbar">
        <van-search vModel={this.kw} placeholder="关键字"/>
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
        <v-option
          label={option.label}
          value={option.value}
          imgUrl={option.imgUrl}
          disabled={option.disabled || item.disabled}
          onClick={this.onOptionSelect}
        />
      ))
    )

    const renderActions = () => (
      <div class="v-checker__actions">
        <van-button type="default" size="large" onClick={this.onCancel}>取消</van-button>
        <van-button type="danger" size="large" onClick={this.onConfirm}>确认</van-button>
      </div>
    )

    return (
      <div class="v-checker">
        {renderHeader()}
        {renderToolbar()}
        {renderColumns()}
        {renderActions()}
      </div>
    )
  }
}