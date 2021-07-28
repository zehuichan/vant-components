### 介绍

用来对商品价格数值的小数点前后部分应用不同样式，还支持人民币符号、千位分隔符、设置小数点位数等功能。

### 基础用法

```html
<!--基本用法-->
<v-price :price="1010" :need-symbol="false" :thousands="true"/>
<!--有人民币符号，无千位分隔-->
<v-price :price="10010.01" :need-symbol="true" :thousands="false"/>
<!--带人民币符号，有千位分隔，保留小数点后三位-->
<v-price :price="15213.1221" :decimal-digits="3" :need-symbol="true" :thousands="false"/>
<!--异步随机变更-->
<v-price :price="price" :decimal-digits="3" :need-symbol="true" :thousands="true"/>
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
