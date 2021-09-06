export default {
  name: 'VStepper',
  inheritAttrs: false,
  props: {
    value: [String, Number],
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
    return (
      <van-field
        {...data}
        class="v-stepper"
      >
        <van-stepper
          {...data}
          slot="input"
          input-width="28px"
          button-size="24px"
          value={this.value}
          onInput={this.$_inputChange}
        />
      </van-field>
    )
  }
}