<template>
  <demo-wrapper title="VDatePicker 时间选择">
    <demo-card title="基本用法">
      <v-date-picker v-model="value" label="datetime" placeholder="datetime" clearable/>
    </demo-card>
    <demo-card title="value-format">
      <v-date-picker v-model="value" label="datetime" placeholder="datetime" value-format="YYYY-MM-DD HH:mm:ss" clearable/>
    </demo-card>
    <demo-card title="disabled">
      <v-date-picker v-model="value" label="datetime" placeholder="datetime" disabled clearable/>
    </demo-card>
    <demo-card title="readonly">
      <v-date-picker v-model="value" label="datetime" placeholder="datetime" readonly clearable/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vdatetime',
  data() {
    return {
      value: new Date()
    }
  },
  components: {
    README
  }
}
</script>