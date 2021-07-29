const VFormItem = {
  name: 'VFormItem',
  props: {
    item: Object,
  },
  render() {
    console.log(this.$attrs)
    const data = {
      props: {
        ...this.$attrs,
      },
      on: {
        ...this.$listeners
      },
    }
    return (
      ['field', 'tel', 'password', 'digit', 'number', 'textarea'].includes(this.item.type)
        ? <v-field
          {...data}
          name={this.item.key}
        />
        : null
    )
  },
}

export default VFormItem