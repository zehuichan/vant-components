import { getValueByPath } from '../utils'

export default {
  name: 'VCheckerItem',
  inheritAttrs: false,
  inject: ['checker'],
  props: {
    value: {
      required: true
    },
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]'
    },
    selected() {
      if (!this.checker.multiple) {
        return this.isEqual(this.value, this.checker.value)
      } else {
        return this.contains(this.checker.value, this.value)
      }
    },
    limitReached() {
      if (this.checker.multiple) {
        return !this.selected && (this.checker.value || []).length >= this.checker.multipleLimit && this.checker.multipleLimit > 0
      } else {
        return false
      }
    }
  },
  methods: {
    optionClick() {
      if (this.disabled) {
        return false
      }

      this.$emit('click', this, true)
    },
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b
      } else {
        return getValueByPath(a, 'value') === getValueByPath(b, 'value')
      }
    },
    contains(arr = [], target) {
      if (!this.isObject) {
        return arr && arr.indexOf(target) > -1
      } else {
        return arr && arr.some(item => {
          return getValueByPath(item, 'value') === getValueByPath(target, 'value')
        })
      }
    },
  },
  created() {
    this.checker.options.push(this)
  },
  render() {
    const renderImage = () => (
      <van-image
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        class="v-multiple-picker__item-img"
        lazyLoad={this.checker.lazyLoad}
      />
    )
    return (
      <div
        class={[
          'v-multiple-picker__item',
          {
            'v-multiple-picker__item--disabled': this.disabled,
            'v-multiple-picker__item--active': this.selected,
          }
        ]}
        onClick={this.optionClick}
      >
        {renderImage()}
        <span class="v-multiple-picker__item-name">{this.label}</span>
      </div>
    )
  }
}