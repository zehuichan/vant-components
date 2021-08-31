### 介绍

时间选择器，支持日期、年月、时分等维度。

### 基础用法

```html
<!--基本用法-->
<v-date-picker v-model="value1" label="datetime" placeholder="datetime" clearable/>
<!--value-format-->
<v-date-picker v-model="value2" label="datetime" placeholder="datetime" value-format="yyyy-MM-dd HH:mm:ss" clearable/>
<!--选择年月-->
<v-date-picker v-model="value3" label="datetime" placeholder="datetime" type="year-month" clearable/>
<!--选择月日-->
<v-date-picker v-model="value3" label="datetime" placeholder="datetime" type="month-day" clearable/>
```

```js
export default {
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _string \| number \| date_  | _    |
