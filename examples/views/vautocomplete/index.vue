<template>
  <demo-wrapper title="VAutoComplete 自动填充">
    <demo-card>
      <v-auto-complete label="switch" placeholder="placeholder"/>
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