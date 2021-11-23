<template>
  <demo-wrapper title="VChecker 多选选择器">
    <demo-card title="基础用法">
      <div class="nstration">默认为 Date 对象: {{ value }}</div>
      <v-checker
        v-model="value"
        :columns="columns"
      />
    </demo-card>
    <demo-card title="分组">
      <div class="nstration">默认为 Date 对象: {{ value2 }}</div>
      <v-checker
        v-model="value2"
        :columns="columns2"
        multiple
        :multiple-limit="5"
      />
    </demo-card>
    <demo-card title="搭配表单项使用">
      <van-field
        label="属性选择"
        :value="value2.toString()"
        readonly
        clickable
        @click="show = true"
      />
      <van-popup v-model="show" round position="bottom">
        <v-checker
          v-model="value2"
          :columns="columns2"
          multiple
          :multiple-limit="5"
        />
      </van-popup>
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
            { label: '上午', value: 21, imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png' },
            { label: '下午', value: 22, imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png' },
            { label: '晚上', value: 23, imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png' },
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
  components: {
    README
  }
}
</script>