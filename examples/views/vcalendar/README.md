### 介绍

表单项类型 - 日历。

### 基础用法

```html
<!--基础用法-->
<v-calendar v-model="value1" label="calendar" placeholder="placeholder" clearable/>
<!--value-format-->
<v-calendar v-model="value2" label="calendar" placeholder="calendar" value-format="yyyy-MM-dd HH:mm:ss"/>
<!--选择多个日期-->
<v-calendar
  v-model="value3"
  label="calendar"
  placeholder="calendar"
  multiple
  value-format="yyyy-MM-dd HH:mm:ss"
/>
<!--选择日期区间-->
<v-calendar v-model="value4" label="calendar" placeholder="calendar" range/>
```

```js
export default {
  data() {
    return {
      value1: new Date(),
      value2: '',
      value3: [],
      value4: [],
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _string \| number \| array \| date_  | _    |
| multiple | 表示选择多个日期 | _boolean_  | `false`    |
| range | 表示选择日期区间 | _boolean_  |  `false`    |
| format  |  指定输入框的格式，参考[date-fns](https://date-fns.org/)  | _string_ | `yyyy-MM-dd`    |
| value-format  | 指定绑定值的格式，参考[date-fns](https://date-fns.org/)  | _string_ | _    |

### Slots

| 名称   | 说明           | 参数           | 
| ------ | -------------- | -------------- | 
| title | 自定义标题       | _ |
| footer | 自定义底部区域内容     |   _ |  
| top-info | 自定义日期上方的提示信息     | `day` |  
| bottom-info | 自定义日期下方的提示信息     | `day`   |  

### 待优化...