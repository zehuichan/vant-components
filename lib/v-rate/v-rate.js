export default {
  name: 'VRate',
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
      attrs: { ...this.$attrs, ...this.$props },
    }
    return (
      <van-field
        {...data}
        class="v-rate"
      >
        <van-rate
          {...data}
          slot="input"
          size={20}
          value={this.value}
          onInput={this.$_inputChange}
        />
      </van-field>
    )
  }
}