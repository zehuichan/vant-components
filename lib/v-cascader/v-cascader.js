import picker from '../_mixins/picker'
import { createIndexGetter, createTreeMate } from 'treemate'

export default {
  name: 'VCascader',
  inheritAttrs: false,
  mixins: [picker],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    separator: {
      type: String,
      default: '/'
    },
    prop: {
      type: Object,
      default: () => ({ text: 'text', value: 'value', children: 'children' })
    }
  },
  computed: {
    _value() {
      return Array.from(this.value).concat().pop()
    },
    _text() {
      return this.getText(this.options)
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && !this.isEmpty(this.value) ? 'clear' : 'arrow'
    },
  },
  methods: {
    _treemate(data) {
      const valueKey = this.prop.value
      return createTreeMate(data, {
        getKey: (node) => node[valueKey],
      })
    },
    getText(values) {
      if (this.isEmpty(this.value)) {
        return ''
      }

      const ret = []

      const flattenedNodes = this._treemate(values).getFlattenedNodes()
      const getIndex = createIndexGetter(flattenedNodes)
      Array.from(this.value).forEach((key) => {
        ret.push(flattenedNodes[getIndex(key)].rawNode[this.prop.text])
      })
      return ret.join(this.separator)
    },
    onClear() {
      if (!this.clearable) {
        return false
      }

      this.$emit('input', [])
      this.$emit('clear', [])
    },
    onClick() {
      if (this.disabled || this.readonly) {
        return false
      }
      this.show = true
    },
    onClose() {
      this.show = false
      this.$emit('close')
    },
    onChange({ value, selectedOptions, tabIndex }) {
      this.$emit('change', { value, selectedOptions, tabIndex })
    },
    onFinish({ value, selectedOptions, tabIndex }) {
      this.show = false
      let d = selectedOptions.map((option) => option[this.prop.value])
      this.$emit('input', d)
      this.$emit('finish', d)
    }
  },
  render() {
    const data = {
      attrs: { ...this.$attrs },
    }

    return (
      <van-field
        {...data}
        class="v-picker"
        value={this._text}
        right-icon={this._icon}
        readonly
        clickable
        onClick={this.onClick}
        on-click-right-icon={(event) => {
          event.stopPropagation()
          this.onClear()
        }}
      >
        <van-popup slot="extra" vModel={this.show} position="bottom" get-container="body">
          <van-cascader
            {...data}
            value={this._value}
            title={this.title}
            options={this.options}
            placeholder="请选择"
            field-names={this.prop}
            onClose={this.onClose}
            onChange={this.onChange}
            onFinish={this.onFinish}
            scopedSlots={{
              title: this.$scopedSlots.title,
              option: ({ option, selected }) => this.$scopedSlots['option'] && this.$scopedSlots['option']({
                option,
                selected
              }),
            }}
          />
        </van-popup>
      </van-field>
    )
  }
}