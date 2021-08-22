import { toCanvas } from 'qrcode'

export default {
  name: 'VQrcode',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // canvas
    value: String,
    width: {
      type: [String, Number],
      default: 250
    },
    height: {
      type: [String, Number],
      default: 250
    },
    margin: {
      type: [String, Number],
      default: 2
    }
  },
  watch: {
    value: {
      handler: '$_generate',
      immediate: true
    }
  },
  methods: {
    $_generate() {
      this.$nextTick(async () => {
        const { width, height, margin } = this
        const value = String(this.value)
        toCanvas(this.$el, value, { width, height, margin }, (error) => {
          if (error) {
            throw error
          }
        })
        const canvas = this.$el
        this.$emit('load', canvas.toDataURL())
      })
    }
  },
  render(h) {
    return h('canvas', this.$slots.default)
  }
}