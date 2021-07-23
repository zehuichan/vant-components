<template>
  <van-field
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :type="type"
    :right-icon="rightIcon"
    :formatter="formatter"
    @input="$_inputChange"
    @click-right-icon="$_clickRightIcon"
  >
    <template v-for="(val, name) of $slots" v-slot:[name]>
      <slot :name="name"/>
    </template>
  </van-field>
</template>

<script>
// utils
import { $_formatValue } from 'lib/utils/formate-value'

export default {
  name: 'VField',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    showPassword: Boolean
  },
  data() {
    return {
      show: this.showPassword
    }
  },
  computed: {
    type() {
      return this.show ? 'password' : this.$attrs.type
    },
    rightIcon() {
      if (this.showPassword) {
        return this.show ? 'eye' : 'closed-eye'
      }
      return this.$attrs.rightIcon
    }
  },
  methods: {
    $_clickRightIcon() {
      this.show = !this.show
    },
    $_inputChange(val) {
      this.$emit('input', val)
    },
    formatter(n) {
      let o = this.value
      if (this.$attrs.type === 'tel') {
        return $_formatValue(n, o, 'phone').value
      }
      if (this.$attrs.type === 'bankCard') {
        return $_formatValue(n, o, 'bankCard').value
      }
      if (this.$attrs.type === 'money') {
        return $_formatValue(n, o, 'money').value
      }
      return n
    }
  }
}
</script>