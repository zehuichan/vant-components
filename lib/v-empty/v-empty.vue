<template>
  <div class="v-empty">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'VEmpty',
  props: {
    text: {
      type: String,
      default: () => '没有更多了'
    }
  }
}
</script>

<style lang="less">
.v-empty {
  color: #969799;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}
</style>