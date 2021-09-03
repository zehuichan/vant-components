<template>
  <demo-wrapper title="VSwitch 开关">
    <demo-card>
      <v-switch label="switch" v-model="value" :active-value="1" :inactive-value="0"/>
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