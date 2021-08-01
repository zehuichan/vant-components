import './index.less'

function checkPoint(price) {
  return String(price).indexOf('.') > 0
}

export default {
  name: 'VPrice',
  props: {
    price: {
      type: [Number, String],
      default: 0
    },
    needSymbol: {
      type: Boolean,
      default: true
    },
    symbol: {
      type: String,
      default: '&yen;'
    },
    decimalDigits: {
      type: Number,
      default: 2
    },
    thousands: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showSymbol() {
      return this.needSymbol ? this.symbol : ''
    }
  },
  methods: {
    formatThousands(num = 0) {
      if (checkPoint(num)) {
        num = Number(num).toFixed(this.decimalDigits)
        num =
          typeof num.split('.') === 'string'
            ? num.split('.')
            : num.split('.')[0]
      } else {
        num = num.toString()
      }
      if (this.thousands) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      } else {
        return num
      }
    },
    formatDecimal(decimalNum = 0) {
      if (checkPoint(decimalNum)) {
        decimalNum = Number(decimalNum).toFixed(this.decimalDigits)
        decimalNum =
          typeof decimalNum.split('.') === 'string'
            ? 0
            : decimalNum.split('.')[1]
      } else {
        decimalNum = decimalNum.toString()
      }
      const result = '0.' + decimalNum
      const resultFixed = Number(result).toFixed(this.decimalDigits)
      return String(resultFixed).substring(2, resultFixed.length)
    },
  },
  render() {
    return (
      <div class="v-price">
        {this.needSymbol && <div class="v-price--symbol" domPropsInnerHTML={this.showSymbol}/>}
        <div class="v-price--big">
          {this.formatThousands(this.price)}
        </div>
        <div class="v-price--point">.</div>
        <div class="v-price--small">
          {this.formatDecimal(this.price)}
        </div>
      </div>
    )
  }
}