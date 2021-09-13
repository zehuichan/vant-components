### 介绍

表单项类型 - 级联选择。

### 基础用法

```html
<!--基础用法-->
<v-cascader
  label="cascader"
  title="请选择所在地区"
  v-model="value1"
  :options="options"
  placeholder="placeholder"
  clearable
/>
<!--使用插槽-->
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
```

```js
export default {
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
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _array_ | `[]`  |
| title   | 顶部标题   | _string_  | _  |
| options   |  可选项数据源  | _array_ | `[]`  |
| field-names   |  自定义 `options` 结构中的字段  | _object_ | `{ text: 'text', value: 'value', children: 'children' }`  |

### Slots

| 名称   | 说明           | 参数           |
| ------ | -------------- | -------------- | 
| title | 自定义顶部标题 | _  |
| option | 自定义选项文字   | `{ option: Option, selected: boolean }`  |  

### 待优化...