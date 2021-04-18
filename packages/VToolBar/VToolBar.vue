<template>
  <div class="v-tool-bar__placeholder">
    <div class="v-tool-bar">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VToolBar'
  }
</script>

<style lang="less" scoped>
  @import "../style/safe-area.less";

  .v-tool-bar__placeholder {
    height: 44px;
  }

  .v-tool-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .safe-area-inset-bottom();

    .van-button + .van-button {
      margin-left: 8px;
    }
  }
</style>