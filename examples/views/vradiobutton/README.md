### 介绍

在一组备选项中进行单选

### 基础用法

```html

<v-radio-button label="关键城市" v-model="value" :options="options"/>
```

```js
export default {
  data() {
    return {
      value: 1,
      options: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ]
    }
  }
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| value / v-model | 绑定值 | _string \| number_  | _    |
| options | 对象数组，配置每一列显示的数据 | _Options[]_  | `[]`    |
| label   | 左侧标题   | _string \| number_  | _    |
| color     | 颜色类型 primary \| info \| warning \|danger   | _string_  | `primary`    |
| disabled     | 是否禁用	   | _boolean_  | `false`    |
| prop | 唯一标识的键名 | _object_  | `{ label: 'label', value: 'value' }`    |