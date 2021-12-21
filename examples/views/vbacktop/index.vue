<template>
  <demo-wrapper title="VBacktop 回到顶部">
    <demo-card>
      <v-card v-for="i in 20" :key="i" class="box-card" style="width: 250px">
        <div class="text">placeholder</div>
      </v-card>
    </demo-card>
    <v-backtop/>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vspace',
  components: {
    README
  }
}
</script>

<style lang="less" scoped>
.box-card + .box-card {
  margin-top: 12px;
}

.text {
  font-size: 12px;
}
</style>