import './index.less'
import { getValueByPath } from '../utils'
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
      options: []
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
    }
  },
  methods: {
    format() {
      if (this._dataType === 'text') {
        this.formattedColumns = [{ values: this.getColumns(this.columns) }]
      } else {
        this.formattedColumns = this.columns.map(item => ({ title: item.title, values: this.getColumns(item.values) }))
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
      if (this.multiple) {
        const value = (this.value || []).slice()
        const optionIndex = this.getValueIndex(value, option.value)
        if (optionIndex > -1) {
          value.splice(optionIndex, 1)
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value)
        }
        this.$emit('input', value)
      } else {
        this.$emit('input', option.value)
      }
    },
    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      if (!isObject) {
        return arr.indexOf(value)
      } else {
        const valueKey = this.prop.value
        let index = -1
        arr.some((item, i) => {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
            index = i
            return true
          }
          return false
        })
        return index
      }
    }
  },
  render() {
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
          disabled={option.disabled}
          onClick={this.onOptionSelect}
        />
      ))
    )

    return (
      <div class="v-checker">
        {renderColumns()}
      </div>
    )
  }
}