<template>
  <div class="v-picker van-cell">
    <van-field
      v-bind="$attrs"
      :value="text"
      :right-icon="showIcon"
      readonly
      clickable
      @click-input="onClick"
      @click-right-icon="onClear"
    />
    <van-popup v-model="show" position="bottom" get-container="body">
      <van-picker
        ref="picker"
        show-toolbar
        :columns="_options"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'VPicker',
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
      prop: {
        type: Object,
        default: () => ({ label: 'label', value: 'value' })
      }
    },
    computed: {
      _options() {
        return Array.from(this.columns).map((item) => ({
          text: item[this.prop.label],
          value: item[this.prop.value],
          ...item
        }))
      },
      showIcon() {
        return this.$attrs.clearable && this.value ? 'clear' : 'arrow'
      },
      text() {
        const curr = Array.from(this._options).find(item => item.value === this.value)
        return curr?.text
      },
      index() {
        for (let i = 0; i < this._options.length; i++) {
          const item = this._options[i]
          if (item.value === this.value) {
            return i
          }
        }
        return 0
      },
      $picker() {
        return this.$refs.picker
      }
    },
    data() {
      return {
        show: false,
      }
    },
    methods: {
      onClear() {
        if (!this.$attrs.clearable) {
          return false
        }

        this.$emit('input', '')
        this.$emit('change', '')
      },
      onCancel() {
        this.show = false
      },
      onConfirm(value, index) {
        this.show = false
        this.$emit('input', value.value, index)
        this.$emit('change', value.value, index)
      },
      onClick() {
        this.show = true
        this.$nextTick(() => {
          this.$picker.setIndexes([this.index])
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .v-picker.van-cell {
    padding: 0;

    .van-field__right-icon {
      color: #c8c9cc;
    }
  }
</style>
