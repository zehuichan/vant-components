export default {
  name: 'VSlider',
  inheritAttrs: false,
  props: {
    value: [Number, Array],
  },
  methods: {
    $_inputChange(val) {
      this.$emit('input', val)
    },
  },
  render() {
    const data = {
      attrs: { ...this.$attrs, ...this.$props },
    }

    // fix field value 错误
    delete data.attrs.value

    return (
      <van-field
        {...data}
        class="v-slider"
      >
        <van-slider
          {...data}
          slot="input"
          button-size="20px"
          value={this.value}
          onInput={this.$_inputChange}
          scopedSlots={{
            button: this.$scopedSlots.button,
          }}
        />
      </van-field>
    )
  }
}