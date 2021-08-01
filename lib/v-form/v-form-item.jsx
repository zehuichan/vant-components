export default {
  name: 'VFormItem',
  props: {
    item: Object,
  },
  render() {
    const data = {
      attrs: {
        ...this.$attrs,
      },
      on: {
        ...this.$listeners
      },
    }
    return (
      ['field', 'tel', 'bankCard', 'money', 'password', 'digit', 'number', 'textarea'].includes(this.item.type)
        ? <v-field
          {...data}
          vModel={this.$attrs.value}
          label={this.item.label}
          placeholder={this.item.placeholder}
          type={this.item.type}
          name={this.item.key}
          required={this.item.required}
          rules={this.item.rules}
        />
        : null
    )
  },
}