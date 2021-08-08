<template>
  <demo-wrapper title="VTime 相对时间">
    <demo-card>
      <v-time v-model="value"/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vtime',
  data() {
    return {
      value: new Date().getTime() - 25 * 60 * 60 * 1000
    }
  },
  components: {
    README
  }
}
</script>