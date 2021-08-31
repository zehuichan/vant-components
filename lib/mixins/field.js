class FieldMixins {
  model = {
    prop: 'value',
    event: 'input'
  }

  props = {
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    rules: Array,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  }

  transform(ctx) {
    const map = {}
    Object.keys(this.props).forEach(key => {
      map[key] = ctx[key]
    })
    return map
  }
}

export default new FieldMixins()