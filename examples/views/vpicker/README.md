### 介绍

提供多个选项集合供用户选择，仅支持单列选择，后续再考虑多列级联。

### 基础用法

```html
<!--basic-->
<v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable/>
<!--disabled-->
<v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable disabled/>
<!--readonly-->
<v-picker v-model="value" :columns="columns" label="picker" placeholder="placeholder" clearable readonly/>
```

```js
export default {
  data() {
    return {
      value: '',
      columns: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ]
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _string \| number_  | _    |
| options | 对象数组，配置每一列显示的数据 | _Options[]_  | `[]`    |
| label   | 左侧标题   | _string \| number_  | _    |
| placeholder   | 输入框占位提示文字     | _string_  | _    |
| disabled     | 是否禁用     | _boolean_  | `false`    |
| readonly     | 是否只读     | _boolean_  | `false`    |
| prop | 唯一标识的键名 | _object_  | `{ label: 'label', value: 'value' }`    |
