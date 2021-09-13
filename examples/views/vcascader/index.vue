<template>
  <demo-wrapper title="VCascader 级联选择">
    <demo-card title="基础用法">
      <v-cascader
        label="cascader"
        title="请选择所在地区"
        v-model="value1"
        :options="options"
        placeholder="placeholder"
        clearable
      />
    </demo-card>
    <demo-card title="使用插槽">
      <v-cascader
        label="cascader"
        title="请选择所在地区"
        v-model="value1"
        :options="options"
        placeholder="placeholder"
        clearable
      >
        <template #title>
          我是自定义title
        </template>
        <template #option="{option, selected}">
          {{ option }}{{ selected }}
        </template>
      </v-cascader>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vcascader',
  data() {
    return {
      value1: ['330000', '330100'],
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }],
        },
      ],
    }
  },
  components: {
    README
  }
}
</script>

<style scoped>

</style>