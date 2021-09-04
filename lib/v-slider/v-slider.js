export default {
  name: 'VSlider',
  inheritAttrs: false,
  props: {
    value: Number,
  },
  methods: {
    $_inputChange(val) {
      this.$emit('input', val)
    },
  },
  render() {
    const data = {
      attrs: { ...this.$props, ...this.$attrs },
    }
    return (
      <van-field
        {...data}
        class="v-slider"
      >
        <van-slider
          {...data}
          slot="input"
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