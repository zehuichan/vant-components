<template>
  <van-form class="v-form" ref="form" validate-first>
    <slot/>
    <template v-if="group">
      <van-cell-group v-for="group in options" :key="group.title" :title="group.title" :border="group.border">
        <template v-for="item in group.options">
          <v-form-item
            :item="item"
            :value="value[item.key]"
            @input="$_inputChange(item, $event)"
          />
          <slot :scope="item" :name="item.key"/>
        </template>
      </van-cell-group>
    </template>
    <template v-else>
      <template v-for="item in options">
        <slot :scope="item" :name="item.key"/>
      </template>
    </template>
  </van-form>
</template>

<script>
export default {
  name: 'VForm',
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
    },
    group: {
      type: Boolean,
      default: false
    },
  },
  methods: {
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

<style>

</style>