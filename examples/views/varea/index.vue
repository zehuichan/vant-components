<template>
  <demo-wrapper title="VArea 省市区选择器">
    <demo-card title="基础用法">
      <v-area label="area" v-model="value1" placeholder="placeholder" clearable/>
    </demo-card>
    <demo-card title="使用插槽">
      <v-area label="area" v-model="value1" placeholder="placeholder" clearable>
        <template #title>我是自定义title</template>
        <template #columns-top>columns-top</template>
        <template #columns-bottom>columns-bottom</template>
      </v-area>
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
      value1: ['110000', '110100', '110102'],
    }
  },
  components: {
    README
  }
}
</script>

<style scoped>

</style>