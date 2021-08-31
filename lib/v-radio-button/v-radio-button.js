export default {
  name: 'VRadioButton',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    color: {
      type: String,
      default: 'primary' // primary、info、warning、danger
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    prop: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' })
    }
  },
  computed: {
    _columns() {
      return Array.from(this.columns).map((item) => ({
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
      attrs: {
        ...this.$attrs,
        disabled: this.disabled,
        readonly: this.readonly,
      },
    }
    return (
      <van-field
        {...data}
        value={this.value}
        input-align="right"
        center
      >
        <template slot="input">
          {
            this._columns.map((item, index) => {
              return (
                <van-button
                  type={this.active(item, index)}
                  size="mini"
                  disabled={this.disabled || this.readonly || item.disabled}
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

