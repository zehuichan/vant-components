<template>
  <demo-wrapper title="VSlider 滑块">
    <demo-card title="基础用法">
      <v-slider label="slider" v-model="value"/>
    </demo-card>
    <demo-card title="双滑块">
      <v-slider label="slider" v-model="range" range/>
    </demo-card>
    <demo-card title="指定选择范围">
      <v-slider label="slider" v-model="value" :min="-50" :max="50"/>
    </demo-card>
    <demo-card title="禁用">
      <v-slider label="slider" v-model="value" disabled/>
    </demo-card>
    <demo-card title="指定步长">
      <v-slider label="slider" v-model="value" :step="10"/>
    </demo-card>
    <demo-card title="自定义样式">
      <v-slider label="slider" v-model="value" bar-height="4px" active-color="#ee0a24"/>
    </demo-card>
    <demo-card title="自定义按钮">
      <v-slider label="slider" v-model="value" active-color="#ee0a24">
        <template #button>
          <div class="custom-button">{{ value }}</div>
        </template>
      </v-slider>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vslider',
  data() {
    return {
      value: 50,
      range: [10, 50]
    }
  },
  components: {
    README
  }
}
</script>

<style lang="less">
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>