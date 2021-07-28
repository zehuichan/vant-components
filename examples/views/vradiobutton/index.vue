<template>
  <demo-wrapper title="VRadioButton 单选按钮组">
    <demo-card title="基本用法">
      <v-radio-button label="选择" v-model="value" :options="options"/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vradiobutton',
  data() {
    return {
      value: 3,
      options: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
      ]
    }
  },
  components: {
    README
  }
}
</script>