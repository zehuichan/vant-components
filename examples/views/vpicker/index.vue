<template>
  <demo-wrapper title="VPicker 选择器">
    <demo-card title="basic">
      <v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable/>
    </demo-card>
    <demo-card title="disabled">
      <v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable disabled/>
    </demo-card>
    <demo-card title="readonly">
      <v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable readonly/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vprice',
  data() {
    return {
      value: 3,
      columns: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ],
    }
  },
  components: {
    README
  }
}
</script>