### 介绍

表单中的 Field 增强输入框组件。

### 基础用法

```html
<!--基本用法-->
<v-field v-model="form.value" label="field" placeholder="placeholder" clearable/>
<v-field v-model="form.password" show-password label="password" placeholder="password" clearable/>
<v-field v-model="form.tel" type="tel" label="tel" placeholder="tel" clearable/>
<v-field v-model="form.bankCard" type="bankCard" label="bankCard" placeholder="bankCard" clearable/>
<v-field v-model="form.money" type="money" label="money" placeholder="money" clearable/>
```

```js
export default {
  data() {
    return {
      form: {
        value: '',
        password: '',
        tel: '',
        bankCard: '',
        money: '',
      },
    }
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

### Slots

| 名称   | 说明           | 参数           |
| ------ | -------------- | -------------- | 
| label | 自定义输入框 label 标签 | _  |
| input | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效。   | _  |  
| left-icon | 自定义输入框头部图标 | _  |  
| right-icon | 自定义输入框尾部图标 | _  |  
| button | 自定义输入框尾部按钮 | _  |  
| extra  | 自定义输入框最右侧的额外内容 | _  |  