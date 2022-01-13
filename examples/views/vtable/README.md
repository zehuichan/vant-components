### 介绍

用于展示基础表格。

### 基础用法

```html
<!--基础用法-->
<v-table :columns="columns" :data="data"/>
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| format | 时间格式化 | _string_  | _    |
| time | 时间 | _number \| date_  | `Date.now()`    |
| to | 目标时间 | _number \| date_  | `Date.now()`    |
| type | 时间类型，relative \| date \| datetime | _number \| date_  | `datetime`    |
| unix | `unix` 时间戳 | _boolean_  | `false`    |
