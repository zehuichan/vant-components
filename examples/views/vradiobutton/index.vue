<template>
  <demo-wrapper title="VRadioButton 单选按钮组">
    <demo-card title="basic">
      <v-radio-button label="关键城市" v-model="value" :options="options" input-align="right"/>
    </demo-card>
    <demo-card title="color">
      <v-radio-button label="关键城市" v-model="value" :options="options" color="danger"/>
    </demo-card>
    <demo-card title="disabled">
      <v-radio-button label="关键城市" v-model="value" :options="options" disabled/>
    </demo-card>
    <demo-card title="readonly">
      <v-radio-button label="关键城市" v-model="value" :options="options" readonly/>
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
      value: 1,
      options: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ]
    }
  },
  components: {
    README
  }
}
</script>