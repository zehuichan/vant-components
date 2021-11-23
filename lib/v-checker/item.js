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
    imgUrl: String,
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
      if (this.disabled !== true && this.limitReached !== true) {
        this.$emit('click', this, true)
      }
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
        src={this.imgUrl}
        class="v-checker__item-img"
        lazyLoad={this.checker.lazyLoad}
      />
    )
    return (
      <div
        class={[
          'v-checker__item',
          {
            'v-checker__item--disabled': this.disabled || this.limitReached,
            'v-checker__item--active': this.selected,
          }
        ]}
        onClick={this.optionClick}
      >
        {this.imgUrl ? renderImage() : null}
        <span class="v-checker__item-name">{this.label}</span>
      </div>
    )
  }
}