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
const defaultForm = {
  field: null,
  smsCode: null,
  tel: '',
  bankCard: null,
  money: null,
  autocomplete: '',
  switch: null,
  stepper: null,
  rate: null,
  slider: 50,
  range: [10, 50],
  radio: null,
}

export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      options: [
        {
          title: 'Field 相关',
          options: [
            {
              label: 'field',
              key: 'field',
              type: 'field',
              placeholder: 'field',
              clearable: true,
              required: true,
              rules: [
                { required: true, message: 'required.' }
              ]
            },
            {
              label: 'smsCode',
              key: 'smsCode',
              type: 'smsCode',
              placeholder: 'smsCode',
            },
            {
              label: 'tel',
              key: 'tel',
              type: 'tel',
              placeholder: 'tel',
              clearable: true,
            },
            {
              label: 'bankCard',
              key: 'bankCard',
              type: 'bankCard',
              placeholder: 'bankCard',
              clearable: true,
            },
            {
              label: 'money',
              key: 'money',
              type: 'money',
              placeholder: 'money',
              clearable: true,
            },
            {
              label: 'autocomplete',
              key: 'autocomplete',
              type: 'autocomplete',
              placeholder: 'autocomplete',
              clearable: true,
              fetchSuggestions(queryString, cb) {
                cb([])
              }
            },
          ]
        },
        {
          title: 'Switch 相关',
          options: [
            {
              label: 'switch',
              key: 'switch',
              type: 'switch',
            },
          ]
        },
        {
          title: 'Stepper 相关',
          options: [
            {
              label: 'stepper',
              key: 'stepper',
              type: 'stepper',
            },
          ]
        },
        {
          title: 'Rate 相关',
          options: [
            {
              label: 'rate',
              key: 'rate',
              type: 'rate',
            },
          ]
        },
        {
          title: 'Slider 相关',
          options: [
            {
              label: 'slider',
              key: 'slider',
              type: 'slider',
            },
            {
              label: 'range',
              key: 'range',
              type: 'slider',
              range: true
            },
          ]
        },
        {
          title: 'Radio 相关',
          options: [
            {
              label: 'radio',
              key: 'radio',
              type: 'radiobutton',
              columns: [
                { label: '上海', value: 1 },
                { label: '北京', value: 2, disabled: true },
                { label: '广州', value: 3 },
                { label: '深圳', value: 4 },
              ]
            },
          ]
        },
        {
          title: 'Picker 相关',
          options: [
            {
              label: 'picker',
              key: 'picker',
              type: 'picker',
              placeholder: 'picker',
              clearable: true,
              columns: [
                { label: '上海', value: 1 },
                { label: '北京', value: 2, disabled: true },
                { label: '广州', value: 3 },
                { label: '深圳', value: 4 },
              ]
            },
            {
              label: 'datepicker',
              key: 'datepicker',
              type: 'datepicker',
              placeholder: 'datepicker',
              clearable: true,
            },
          ]
        },
      ]
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

### todo list 后续开放更多类型

| 类型   | 说明           | 
| ------ | -------------- | 
| ~~calendar~~ | 日历 | 
| ~~cascader~~ | 级联选择 | 
| ~~area~~ | 省市区选择 | 

