<template>
  <van-form class="v-form" ref="form" v-bind="$attrs">
    <slot/>
    <template v-if="_dataType === 'group'">
      <van-cell-group v-for="group in options" :key="group.title" :title="group.title" :border="group.border">
        <template v-for="item in group.options">
          <slot :scope="item" :name="item.key">
            <component
              v-bind="item"
              :is="getComponentName(item.type)"
              :name="item.key"
              :value="value[item.key]"
              @input="$_inputChange(item, $event)"
            />
          </slot>
        </template>
      </van-cell-group>
    </template>
    <template v-else>
      <template v-for="item in options">
        <slot :scope="item" :name="item.key">
          <component
            v-bind="item"
            :is="getComponentName(item.type)"
            :name="item.key"
            :value="value[item.key]"
            @input="$_inputChange(item, $event)"
          />
        </slot>
      </template>
    </template>
  </van-form>
</template>

<script>
export default {
  name: 'VForm',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    _dataType() {
      const firstColumn = this.options[0] || {}

      if (firstColumn.title) {
        return 'group'
      }

      return 'options'
    },
  },
  methods: {
    getComponentName(type) {
      if (['field', 'tel', 'bankCard', 'money', 'password', 'digit', 'number', 'textarea'].includes(type)) {
        return 'v-field'
      }
      if (['autocomplete'].includes(type)) {
        return 'v-auto-complete'
      }
      if (['switch'].includes(type)) {
        return 'v-switch'
      }
      if (['stepper'].includes(type)) {
        return 'v-stepper'
      }
      if (['rate'].includes(type)) {
        return 'v-rate'
      }
      if (['slider'].includes(type)) {
        return 'v-slider'
      }
      if (['radiobutton'].includes(type)) {
        return 'v-radio-button'
      }
      if (['picker'].includes(type)) {
        return 'v-picker'
      }
      if (['datepicker'].includes(type)) {
        return 'v-date-picker'
      }
      if (['calendar'].includes(type)) {
        return 'v-calendar'
      }
      if (['cascader'].includes(type)) {
        return 'v-cascader'
      }
      if (['area'].includes(type)) {
        return 'v-area'
      }
      return type
    },
    $_inputChange({ key }, event) {
      this.$emit('input', { ...this.value, [key]: event })
      this.$emit('change', { ...this.value, [key]: event })
    },
    // v-form api
    validate(name) {
      return this.$refs.form.validate(name)
    },
    resetValidation(name) {
      return this.$refs.form.resetValidation(name)
    },
  }
}
</script>

<style lang="less">
.v-form {
}
</style>