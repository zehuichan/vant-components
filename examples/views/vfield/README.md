### 介绍

表单中的 Field 增强输入框组件。

### 基础用法

```html
<!--基本用法-->
```

```js
export default {
  data() {
    return {
      price: 0
    }
  },
  created() {
    setInterval(() => {
      this.price = Math.random() * 10000000
    }, 1000)
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| price | 价格数量    | _number \| string_    | `0` |
| need-symbol   | 是否需要加上 symbol 符号 | _boolean_  | `true`    |
| symbol   | 符号类型   | _string_  | `¥`    |
| decimal-digits     | 小数位位数   | _number_  | `2`    |
| thousands     | 是否按照千分号形式显示   | _boolean_  | `false`    |
