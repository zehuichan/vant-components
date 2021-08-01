import { Field } from 'vant'

export default  {
  name: 'VRadioButton',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    ...Field.props,
    value: [String, Number],
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    color: {
      type: String,
      default: 'primary' // primary、info、warning、danger
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
    }
  },
  methods: {
    onClick(item, index) {
      this.$emit('input', item.value, index)
    },
    active(item, index) {
      return item.value === this.value ? this.color : 'default'
    }
  },
  render() {
    const data = {
      attrs: { ...this.$attrs },
    }
    return (
      <van-field
        {...data}
        value={this.value}
        input-align="right"
        center={true}
      >
        <template slot="input">
          {
            this._options.map((item, index) => {
              return (
                <van-button
                  type={this.active(item, index)}
                  size="mini"
                  disabled={this.$props.disabled || this.$props.readonly || item.disabled}
                  onClick={() => this.onClick(item, index)}
                >
                  {item.label}
                </van-button>
              )
            })
          }
        </template>
      </van-field>
    )
  }
}

