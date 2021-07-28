const VRadioButton = {
  name: 'VRadioButton',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    label: String,
    disabled: {
      type: Boolean,
      default: false
    },
    prop: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' })
    }
  },
  computed: {
    _options() {
      return Array.from(this.options).map((item) => ({
        ...item,
        text: item[this.prop.label],
        value: item[this.prop.value],
      }))
    },
  },
  methods: {
    onClick(item, index) {
      this.$emit('input', item.value, index)
    },
    active(item, index) {
      return item.value === this.value ? 'primary' : 'default'
    }
  },
  render() {
    return (
      <van-cell title={this.label} center>
        {
          this._options.map((item, index) => {
            return (
              <van-button
                type={this.active(item, index)}
                size="mini"
                disabled={this.disabled || item.disabled}
                onClick={() => this.onClick(item, index)}
              >
                {item.label}
              </van-button>
            )
          })
        }
      </van-cell>
    )
  }
}


export default VRadioButton