import './index.less'
import picker from '../_mixins/picker'

export default {
  name: 'VMultiplePicker',
  inheritAttrs: false,
  mixins: [picker],
  props: {
    value: Array,
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    separator: {
      type: String,
      default: '-'
    },
    prop: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' })
    }
  },
  data() {
    return {
      formattedColumns: []
    }
  },
  computed: {
    _text() {
      return this.getText(this.formattedColumns)
    },
    _icon() {
      if (this.disabled || this.readonly) {
        return 'arrow'
      }
      return this.clearable && !this.isEmpty(this.value) ? 'clear' : 'arrow'
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true,
    },
  },
  methods: {
    format() {
      this.formattedColumns = this.getColumns(this.columns)
    },
    getColumns(values) {
      return values.map((item) => ({
        text: item[this.prop.label],
        value: item[this.prop.value],
        ...item
      }))
    },
    getText(values) {
      if (this.isEmpty(this.value)) {
        return ''
      }

      const ret = []

      for (let [index, item] of values.entries()) {
        ret.push(item.values.find((val) => val[this.prop.value] === (this.value[index] ?? this.value)))
      }

      return ret.map(item => item[this.prop.label]).join(this.separator)
    },
    onClear() {
      if (!this.clearable) {
        return false
      }

      this.$emit('input', [])
      this.$emit('clear', [])
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value, index) {
      this.show = false
      this.$emit('input', value[0][this.prop.value], index)
      this.$emit('change', value[0][this.prop.value], index)
    },
    onClick() {
      if (this.disabled || this.readonly) {
        return false
      }
      this.show = true
    },
  },
  render() {
    const data = {
      attrs: { ...this.$attrs }
    }
    return (
      <van-field
        {...data}
        class="v-multiple-picker"
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
        <van-action-sheet slot="extra" vModel={this.show} title="属性选择器" round={false} get-container="body">
          <div class="v-multiple-picker__content">
            <div class="v-multiple-picker__group">
              {/*<div class="v-multiple-picker__title">加料</div>*/}
              <div class="v-multiple-picker__item v-multiple-picker__item--active">
                <span class="v-multiple-picker__item-name">布丁</span>
              </div>
            </div>
          </div>
          <div class="v-multiple-picker__footer">
            <van-button type="default">取消</van-button>
            <van-button type="primary">确定</van-button>
          </div>
        </van-action-sheet>
      </van-field>
    )
  }
}