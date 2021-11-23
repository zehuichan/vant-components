<template>
  <demo-wrapper title="VChecker 多选选择器">
    <!--    <demo-card title="basic">-->
    <!--      {{ value }}-->
    <!--      <van-cell is-link title="基础用法" @click="show = true"/>-->
    <!--      <v-checker-->
    <!--        v-model="value"-->
    <!--        :visible="show"-->
    <!--        :columns="columns"-->
    <!--        title="属性选择器"-->
    <!--        @confirm="onConfirm"-->
    <!--        @change="onChange"-->
    <!--      />-->
    <!--    </demo-card>-->
    <demo-card title="多列选择">
      {{ value2 }}
      <van-cell is-link title="多列选择" @click="show2 = true"/>
      <v-checker
        v-model="value2"
        :visible="show2"
        :columns="columns2"
        multiple
        title="属性选择器"
      />
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vchecker',
  data() {
    return {
      show: false,
      show2: false,
      value: [],
      value2: [],
      columns: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ],
      columns2: [
        {
          title: 'title1',
          disabled: true,
          values: [
            { label: '周一', value: 11 },
            { label: '周二', value: 12 },
            { label: '周三', value: 13 },
            { label: '周四', value: 14 },
            { label: '周五', value: 15 },
          ]
        },
        {
          title: 'title2',
          values: [
            { label: '上午', value: 21 },
            { label: '下午', value: 22 },
            { label: '晚上', value: 23 },
          ]
        },
        {
          title: 'title3',
          values: [
            { label: '吃饭', value: 31 },
            { label: '睡觉', value: 32 },
            { label: '打游戏', value: 33 },
          ]
        },
      ],
    }
  },
  methods: {
    onConfirm() {
    },
    onCancel() {
    },
    onChange() {
    }
  },
  components: {
    README
  }
}
</script>