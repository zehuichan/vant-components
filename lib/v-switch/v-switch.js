export default {
  name: 'VSwitch',
  inheritAttrs: false,
  props: {
    value: [String, Number, Boolean],
  },
  methods: {
    $_inputChange(val) {
      this.$emit('input', val)
    },
  },
  render() {
    const data = {
      attrs: { ...this.$attrs },
    }

    // fix field value 错误
    delete data.attrs.value

    return (
      <van-field
        {...data}
        class="v-switch"
      >
        <van-switch
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