import './index.less'

export default {
  name: 'VAutoComplete',
  inheritAttrs: false,
  data() {
    return {
      show: false
    }
  },
  methods: {
    $_inputChange(val) {
      this.$emit('input', val)
    },
  },
  render() {
    const data = {
      props: this.$attrs,
    }
    return (
      <van-popover
        class="v-auto-complete"
        vModel={this.show}
        placement="bottom-end"
      >
        <div>
          123132
        </div>
        <van-field
          {...data}
          slot="reference"
          onFocus={() => {
            this.show = true
          }}
        />
      </van-popover>
    )
  }
}