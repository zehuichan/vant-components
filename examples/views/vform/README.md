### 介绍

用于数据录入、校验。

支持自定义插槽，具体查看栗子。

### 基础用法

```html
<!--基础用法-->
<v-form ref="form" v-model="form" :options="options">
  <template #smsCode="{scope}">
    <v-field
      v-model="form.smsCode"
      center
      clearable
      :label="scope.label"
      :placeholder="scope.placeholder"
    >
      <template #button>
        <van-button size="small" type="primary" native-type="button">发送验证码</van-button>
      </template>
    </v-field>
  </template>
</v-form>
<div style="margin: 16px;">
  <van-button round block type="info" native-type="button" @click="submit">提交</van-button>
</div>
```

```js
// mapping详细看源码
import { restaurants, options } from './mapping'

const defaultForm = {
  field: null,
  smsCode: null,
  tel: '15800066380',
  bankCard: null,
  money: null,
  autocomplete: '',
  switch: null,
  stepper: null,
  rate: null,
  slider: 50,
  range: [10, 50],
  radio: null,
  picker: null,
  datepicker: null,
  calendar: null,
  calendarmultiple: [],
  calendarrange: [],
  cascader: [],
  area: [],
}

export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      restaurants,
      options,
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(Object.keys(this.form)).then(() => {
        this.$toast('Success.')
      }).catch((err) => {
        console.log(err)
      })
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _object_  | _    |
| options | 表单项（支持类型见下表） | _array_  | `[]`    |

### Options item.type

| 类型   | 说明           | 
| ------ | -------------- | 
| field | 文本 | 
| tel | 手机号 | 
| bankCard | 银行卡 | 
| money | 金额 | 
| autocomplete | 自动填充 | 
| switch | 开关 | 
| stepper | 步进器 | 
| rate | 评分 | 
| slider | 滑块 | 
| radiobutton | 单选按钮组 | 
| picker | 选择器 | 
| datepicker | 时间选择 | 
| calendar | 日历 | 
| cascader | 级联 | 
| area | 省市区 | 

### 待优化...

