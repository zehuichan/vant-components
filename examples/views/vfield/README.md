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
| v-model (value) | 绑定值 | _string \| number_  | _    |
| type   | 输入框类型, 新增 tel \| bankCard \| money   | _string_  | `text`    |
| show-password   |  增强型password, 设置后type自动置为password  | _boolean_ | `false`    |
