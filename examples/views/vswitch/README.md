### 介绍

表单项类型 - 开关。

### 基础用法

```html
 <v-switch label="switch" v-model="value" :active-value="1" :inactive-value="0"/>
```

```js
export default {
  data() {
    return {
      value: 1
    }
  },
}
```