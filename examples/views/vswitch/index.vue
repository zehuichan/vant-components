<template>
  <demo-wrapper title="VSwitch 开关">
    <demo-card title="基础用法">
      <v-switch label="switch" v-model="value" :active-value="1" :inactive-value="0"/>
    </demo-card>
    <demo-card title="禁用状态">
      <v-switch label="switch" v-model="value" :active-value="1" :inactive-value="0" disabled/>
    </demo-card>
    <demo-card title="加载状态">
      <v-switch label="switch" v-model="value" :active-value="1" :inactive-value="0" loading/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vswitch',
  data() {
    return {
      value: 1
    }
  },
  components: {
    README
  }
}
</script>

<style scoped>

</style>