<template>
  <demo-wrapper title="VPicker 选择器">
    <demo-card title="basic">
      <v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable/>
    </demo-card>
    <demo-card title="多列选择">
      <v-picker v-model="value2" :columns="columns2" label="picker" placeholder="placeholder" clearable/>
    </demo-card>
    <demo-card title="级联选择">
      <v-picker v-model="value3" :columns="columns3" label="picker" placeholder="placeholder" clearable/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vpicker',
  data() {
    return {
      value: null,
      value2: [1, 2, 1],
      value3: [330000, 330100, 330110],
      columns: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ],
      columns2: [
        {
          values: [
            { label: '周一', value: 1 },
            { label: '周二', value: 2 },
            { label: '周三', value: 3 },
            { label: '周四', value: 4 },
            { label: '周五', value: 5 },
          ]
        },
        {
          values: [
            { label: '上午', value: 1 },
            { label: '下午', value: 2 },
            { label: '晚上', value: 3 },
          ]
        },
        {
          values: [
            { label: '吃饭', value: 1 },
            { label: '睡觉', value: 2 },
            { label: '打游戏', value: 3 },
          ]
        },
      ],
      columns3: [
        {
          label: '浙江',
          value: 330000,
          children: [
            {
              label: '杭州',
              value: 330100,
              children: [{ label: '西湖区', value: 330106 }, { label: '余杭区', value: 330110 }],
            },
            {
              label: '温州',
              value: 330300,
              children: [{ label: '鹿城区', value: 330302 }, { label: '瓯海区', value: 330304 }],
            },
          ],
        },
        {
          label: '福建',
          value: 350000,
          children: [
            {
              label: '福州',
              value: 350100,
              children: [{ label: '鼓楼区', value: 320106 }, { label: '台江区', value: 350103 }],
            },
            {
              label: '厦门',
              value: 350200,
              children: [{ label: '思明区', value: 350203 }, { label: '海沧区', value: 350205 }],
            },
          ],
        },
      ]
    }
  },
  components: {
    README
  }
}
</script>