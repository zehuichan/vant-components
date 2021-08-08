import JsBarcode from 'jsbarcode'

/**
 * 一些配置
 width?: number;
 height?: number;
 format?: string;
 displayValue?: boolean;
 fontOptions?: string;
 font?: string;
 text?: string;
 textAlign?: string;
 textPosition?: string;
 textMargin?: number;
 fontSize?: number;
 background?: string;
 lineColor?: string;
 margin?: number;
 marginTop?: number;
 marginBottom?: number;
 marginLeft?: number;
 marginRight?: number;
 valid?: (valid: boolean) => void;
 */

export default {
  name: 'VBarcode',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    options: Object,
    tag: {
      type: String,
      default: 'svg'
    },
  },
  watch: {
    value(val) {
      this.$nextTick(() => {
        JsBarcode(this.$el, val, Object.assign({}, JsBarcode.config, this.options))
      })
    }
  },
  render(h) {
    return h(this.tag, this.$slots.default)
  }
}