<template>
  <div class="v-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="v-card__header van-hairline--bottom" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="v-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div class="v-card__extra" :style="extraStyle" v-if="$slots.extra || extra">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div class="v-card__footer" v-if="$slots.footer || footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VCard',
    props: {
      header: {},
      bodyStyle: {},
      extraStyle: {},
      extra: {},
      footer: {},
      shadow: {
        type: String
      }
    }
  }
</script>

<style lang="less">
  .v-card {
    border-radius: 2px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
    font-size: 12px;

    &.is-always-shadow {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    &.is-never-shadow {

    }

    & + .v-card {
      margin-top: 10px;
    }

    &:last-child {
      margin-bottom: 10px;
    }
  }

  .v-card__header {
    display: flex;
    justify-content: space-between;
    padding: 11px 16px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .v-card__body {
    padding: 16px;
  }

  .v-card__extra,
  .v-card__footer {
    font-size: 12px;
    padding: 11px 16px;
    border-top: 1px solid #ebeef5;
  }
</style>
