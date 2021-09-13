import picker from '../_mixins/picker'
import { areaList } from '@vant/area-data'

export default {
  name: 'VArea',
  inheritAttrs: false,
  mixins: [picker],
  props: {
    value: Array,
    areaList: {
      type: Object,
      default: () => areaList
    },
    loading: Boolean,
    separator: {
      type: String,
      default: '/'
    }
  },
  computed: {
    _value() {
      return this.value.concat().pop()
    },
    _text() {
      if (this.isEmpty(this.value)) {
        return ''
      }

      const ret = []

      const map = new Map(Object.entries(this.getFlattenedNodes()))

      this.value.forEach((key) => {
        ret.push(map.get(key))
      })

      return ret.join(this.separator)
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && !this.isEmpty(this.value) ? 'clear' : 'arrow'
    },
    $area() {
      return this.$refs.area
    }
  },
  methods: {
    getFlattenedNodes() {
      const obj = {}
      for (let [key, value] of Object.entries(this.areaList)) {
        Object.assign(obj, value)
      }
      return obj
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
      this.$nextTick(() => {
        this.$area.reset(this._value)
      })
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value, index) {
      this.show = false
      let d = value.map((option) => option.code)
      this.$emit('input', d)
      this.$emit('change', d, index)
    },
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
          <van-area
            {...data}
            ref="area"
            value={this._value}
            title={this.title}
            loading={this.loading}
            area-list={this.areaList}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            scopedSlots={{
              title: this.$scopedSlots.title,
              'columns-top': this.$scopedSlots['columns-top'],
              'columns-bottom': this.$scopedSlots['columns-bottom'],
            }}
          />
        </van-popup>
      </van-field>
    )
  }
}