<template>
  <van-form v-bind="$attrs" v-on="$listeners">
    <template v-for="item in options">
      <van-field
        v-if="item.key === 'switch'"
        :label="item.label"
        :rules="item.rules"
      >
        <template #input>
          <van-switch :value="value[item.key]" :size="item.size || 20" @input="$_inputChange(item, $event)"/>
        </template>
      </van-field>
      <van-field
        v-if="item.key === 'checkbox'"
        :label="item.label"
        :rules="item.rules"
      >
        <template #input>
          <van-checkbox-group :value="value[item.key]" direction="horizontal" @input="$_inputChange(item, $event)">
            <van-checkbox
              v-for="(sub, idx) in item.options"
              :key="idx"
              :name="sub.value"
              shape="square"
            >
              {{ sub.label }}
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
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
    },
    methods: {
      $_inputChange({ type, key }, event) {
        this.$emit('input', { ...this.value, [key]: event })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>