<template>
  <demo-wrapper title="VCalendar 日历">
    <demo-card title="基础用法">
      <div class="nstration">默认为 Date 对象: {{ value1 }}</div>
      <v-calendar label="calendar" v-model="value1" placeholder="placeholder" clearable/>
    </demo-card>
    <demo-card title="value-format">
      <div class="nstration">使用 value-format: {{ value2 }}</div>
      <v-calendar v-model="value2" label="calendar" placeholder="calendar" value-format="yyyy-MM-dd HH:mm:ss"/>
    </demo-card>
    <demo-card title="选择多个日期">
      <div class="nstration">使用 value-format: {{ value3 }}</div>
      <v-calendar
        v-model="value3"
        label="calendar"
        placeholder="calendar"
        multiple
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </demo-card>
    <demo-card title="选择日期区间">
      <v-calendar v-model="value4" label="calendar" placeholder="calendar" range/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vcalendar',
  data() {
    return {
      value1: new Date(),
      value2: '',
      value3: [],
      value4: [],
      value5: null
    }
  },
  methods: {
    $_inputChange(event) {
      this.value5 = event
    }
  },
  components: {
    README
  }
}
</script>

<style scoped>

</style>