<template>
  <div class="v-datetime-picker van-cell">
    <van-field
      v-bind="$attrs"
      :value="value"
      readonly
      clickable
      @click-input="onClick"
      @click-right-icon="onClear"
    />
    <van-popup v-model="show" position="bottom" get-container="body">
      <van-datetime-picker
        v-model="date"
        type="date"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
  // utils
  import parseTime from '../utils/parse-time'

  export default {
    name: 'VDatetimePicker',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: String,
    },
    data() {
      return {
        show: false,
        date: new Date()
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
      onConfirm(value) {
        this.show = false
        this.$emit('input', parseTime(value, '{y}-{m}-{d}'))
        this.$emit('change', parseTime(value, '{y}-{m}-{d}'))
      },
      onClick() {
        this.show = true
        if (this.value) {
          this.date = new Date(this.value)
        } else {
          this.date = new Date()
        }
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .v-datetime-picker.van-cell {
    padding: 0;

    .van-field__right-icon {
      color: #969799;
    }
  }
</style>
