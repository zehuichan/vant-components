<template>
  <div class="v-tool-bar__placeholder">
    <div class="v-tool-bar" :class="'v-tool-bar__'+ align">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-tool-bar',
    props: {
      align: {
        type: String,
        default: 'left',
      }
    }
  }
</script>

<style lang="less">
  .v-tool-bar__placeholder {
    height: 44px;
  }

  .v-tool-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 8px 8px 22px;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);

    .van-button + .van-button {
      margin-left: 8px;
    }
  }

  .v-tool-bar__left {
    text-align: left;
  }

  .v-tool-bar__center {
    text-align: center;
  }

  .v-tool-bar__right {
    text-align: right;
  }
</style>