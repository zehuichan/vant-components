<template>
  <demo-wrapper title="VSwitch 开关">
    <demo-card title="基础用法">
      <v-stepper label="switch" v-model="value"/>
    </demo-card>
    <demo-card title="步长设置">
      <v-stepper label="switch" v-model="value" step="2"/>
    </demo-card>
    <demo-card title="限制输入范围">
      <div class="nstration">通过 min 和 max 属性限制输入值的范围。</div>
      <v-stepper label="switch" v-model="value" min="5" max="8"/>
    </demo-card>
    <demo-card title="限制输入整数">
      <div class="nstration">设置 integer 属性后，输入框将限制只能输入整数。</div>
      <v-stepper label="switch" v-model="value" integer/>
    </demo-card>
    <demo-card title="禁用状态">
      <div class="nstration">通过设置 disabled 属性来禁用步进器，禁用状态下无法点击按钮或修改输入框。</div>
      <v-stepper label="switch" v-model="value" disabled/>
    </demo-card>
    <demo-card title="禁用输入框">
      <div class="nstration">通过设置 disable-input 属性来禁用输入框，此时按钮仍然可以点击。</div>
      <v-stepper label="switch" v-model="value" disable-input/>
    </demo-card>
    <demo-card title="固定小数位数">
      <div class="nstration">通过设置 decimal-length 属性可以保留固定的小数位数。</div>
      <v-stepper label="switch" v-model="value" step="0.2" :decimal-length="1"/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vstepper',
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