<template>
  <demo-wrapper title="VDatePicker 时间选择">
    <demo-card title="基本用法">
      <div class="nstration">默认为 Date 对象: {{ value1 }}</div>
      <v-date-picker v-model="value1" label="datetime" placeholder="datetime" clearable/>
    </demo-card>
    <demo-card title="value-format">
      <div class="nstration">使用 value-format: {{ value2 }}</div>
      <v-date-picker v-model="value2" label="datetime" placeholder="datetime" value-format="yyyy-MM-dd HH:mm:ss" clearable/>
    </demo-card>
    <demo-card title="选择年月">
      <v-date-picker v-model="value3" label="datetime" placeholder="datetime" type="year-month" clearable/>
    </demo-card>
    <demo-card title="选择月日">
      <v-date-picker v-model="value3" label="datetime" placeholder="datetime" type="month-day" clearable/>
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
      value1: null,
      value2: null,
      value3: null,
    }
  },
  components: {
    README
  }
}
</script>

<style>

</style>