<template>
  <demo-wrapper title="VMultiplePicker 多选选择器">
    <demo-card title="basic">
      <v-multiple-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vmultiplepicker',
  data() {
    return {
      value: [],
      columns: [
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