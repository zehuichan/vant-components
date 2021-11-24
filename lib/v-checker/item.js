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
      if (this.checker.currentValue) {
        return this.checker.currentValue.indexOf(this.value) > -1
      }
      return false
    },
    limitReached() {
      if (this.checker.multiple) {
        return !this.selected && (this.checker.currentValue || []).length >= this.checker.multipleLimit && this.checker.multipleLimit > 0
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
    }
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