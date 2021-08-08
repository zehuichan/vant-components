### 介绍

常用于表示几分钟前、几小时前等相对于此时此刻的时间描述。

### 基础用法

```html
<!--基础-->
<v-timeago :to="to"/>
```

```js
export default {
  data() {
    return {
      to: new Date().getTime() - 60 * 60 * 1000
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| value | 需要对比的时间，可以是时间戳或 Date 类型  | _number \| string \| date_ | _    |
| type | 类型，可选值为 relative \| date \| datetime | _string_  | `relative`    |
