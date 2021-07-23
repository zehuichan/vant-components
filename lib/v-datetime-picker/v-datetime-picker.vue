<template>
  <div class="v-datetime-picker van-cell">
    <van-field
      v-bind="$attrs"
      :value="text"
      readonly
      clickable
      @click-input="onClick"
      @click-right-icon="onClear"
    />
    <van-popup v-model="show" position="bottom" get-container="body">
      <van-datetime-picker
        v-model="date"
        :type="type"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'VDatetimePicker',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number, Date],
    type: String,
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  computed: {
    text() {
      if (this.value) {
        return this.$D(this.value).format(this.valueFormat)
      }
      return null
    }
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

      this.$emit('input', null)
      this.$emit('change', null)
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value) {
      this.show = false
      this.$emit('input', formatDayJs(value, this.valueFormat))
      this.$emit('change', formatDayJs(value, this.valueFormat))
    },
    onClick() {
      this.show = true
      if (this.value) {
        this.date = new Date(this.value)
      } else {
        this.date = new Date()
      }
    },
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.v-datetime-picker.van-cell {
  padding: 0;

  .van-field__right-icon {
    color: #969799;
  }
}
</style>
