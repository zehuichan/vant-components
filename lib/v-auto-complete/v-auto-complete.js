import './index.less'

import { debounce } from 'throttle-debounce'

const BODY_LOCK_CLASS = 'van-overflow-hidden'

export default {
  name: 'VAutoComplete',
  inheritAttrs: false,
  props: {
    value: String,
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      activated: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1,
      suggestionDisabled: false
    }
  },
  computed: {
    isValidData() {
      const suggestions = this.suggestions
      let isValidData = Array.isArray(suggestions) && suggestions.length > 0
      return isValidData || this.loading
    },
  },
  watch: {
    activated(val) {
      if (val) {
        document.body.classList.add(BODY_LOCK_CLASS)
      } else {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
  },
  mounted() {
    this.debouncedGetData = debounce(this.debounce, this.getData)
  },
  methods: {
    $_inputChange(value) {
      this.$emit('input', value)
      this.suggestionDisabled = false
      if (!this.triggerOnFocus && !value) {
        this.suggestionDisabled = true
        this.suggestions = []
        return
      }
      this.activated = true
      this.debouncedGetData(value)
    },
    $_inputFocus(event) {
      this.activated = true
      this.$emit('focus', event)
      if (this.triggerOnFocus) {
        this.debouncedGetData(this.value)
      }
    },
    $_inputClear() {
      this.activated = false
      this.$emit('clear')
    },
    $_inputSelect(item) {
      this.$emit('input', item[this.valueKey])
      this.$emit('select', item)
      this.$nextTick(_ => {
        this.activated = false
        this.suggestions = []
      })
    },
    getData(queryString) {
      if (this.suggestionDisabled) {
        return
      }
      this.loading = true
      this.fetchSuggestions(queryString, (suggestions) => {
        this.loading = false
        if (this.suggestionDisabled) {
          return
        }
        if (Array.isArray(suggestions)) {
          this.suggestions = suggestions
        } else {
          console.error('[VantComponents Error][Autocomplete]autocomplete suggestions must be an array')
        }
      })
    }
  },
  render() {
    const data = {
      attrs: { ...this.$attrs },
      on: { ...this.$listeners }
    }
    return (
      <van-field
        {...data}
        class="v-auto-complete"
        value={this.value}
        onInput={this.$_inputChange}
        onFocus={this.$_inputFocus}
        onClear={this.$_inputClear}
        scopedSlots={{
          label: this.$scopedSlots.label,
          input: this.$scopedSlots.input,
          'left-icon': this.$scopedSlots.leftIcon,
          'right-icon': this.$scopedSlots.rightIcon,
          button: this.$scopedSlots.button,
        }}
      >
        <van-popover
          slot="extra"
          vModel={this.activated}
          placement={this.placement}
          offset={[0, 24]}
        >
          <div class="v-auto-complete--suggestion__popover">
            {
              this.loading
                ? <div class="v-auto-complete--suggestion__loading">
                  <van-loading size="24px">加载中...</van-loading>
                </div>
                : this.isValidData
                  ? <div class="v-auto-complete--suggestion__list">
                    {
                      this.suggestions.map((item, index) => (
                        <div
                          class={['v-auto-complete--suggestion__item', { 'highlighted': this.highlightedIndex === index }]}
                          key={index}
                          onClick={() => this.$_inputSelect(item)}
                        >
                          {this.$scopedSlots.default ? this.$scopedSlots.default({ item }) : item[this.valueKey]}
                        </div>
                      ))
                    }
                  </div>
                  : <div class="v-auto-complete--suggestion__empty">暂无更多</div>
            }
          </div>
        </van-popover>
      </van-field>
    )
  }
}