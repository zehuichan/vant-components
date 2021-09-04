<template>
  <demo-wrapper title="VRate 评分">
    <demo-card title="基础用法">
      <v-rate label="rate" v-model="value"/>
    </demo-card>
    <demo-card title="自定义图标">
      <v-rate label="rate" v-model="value" icon="like" void-icon="like-o"/>
    </demo-card>
    <demo-card title="自定义样式">
      <v-rate label="rate" v-model="value" color="#ffd21e" void-icon="star" void-color="#eee"/>
    </demo-card>
    <demo-card title="半星">
      <v-rate label="rate" v-model="value" allow-half void-icon="star" void-color="#eee"/>
    </demo-card>
    <demo-card title="自定义数量">
      <v-rate label="rate" v-model="value" :count="6"/>
    </demo-card>
    <demo-card title="禁用状态">
      <v-rate label="rate" v-model="value" disabled/>
    </demo-card>
    <demo-card title="只读状态">
      <v-rate label="rate" v-model="value" readonly/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vrate',
  data() {
    return {
      value: 2.5
    }
  },
  components: {
    README
  }
}
</script>

<style scoped>

</style>