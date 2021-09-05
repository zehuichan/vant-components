<template>
  <demo-wrapper title="VForm 表单">
    <demo-card>
      <v-form ref="form" v-model="form" :options="options" group/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="button" @click="submit">提交</van-button>
      </div>
      <code>{{ form }}</code>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

const defaultForm = {
  field: null,
  tel: '15800066380',
  bankCard: null,
  money: null,
  autocomplete: '',
  switch: null,
  stepper: null,
  rate: null,
  slider: null,
  radio: null,
}

export default {
  name: 'vform',
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
  components: {
    README
  }
}
</script>