<template>
  <demo-wrapper title="VPicker 选择器">
    <demo-card title="basic">
      <v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable/>
      <code>{{ value }}</code>
    </demo-card>
    <demo-card title="多列选择">
      <v-picker v-model="value2" :columns="columns2" label="picker" placeholder="placeholder" clearable/>
      <code>{{ value2 }}</code>
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
      value2: [1, 2],
      columns: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ],
      columns2: [
        {
          values: [
            { label: '周一', value: 1 },
            { label: '周二', value: 2 },
            { label: '周三', value: 3 },
            { label: '周四', value: 4 },
            { label: '周五', value: 5 },
          ]
        },
        {
          values: [
            { label: '上午', value: 1 },
            { label: '下午', value: 2 },
            { label: '晚上', value: 3 },
          ]
        },
      ],
    }
  },
  components: {
    README
  }
}
</script>