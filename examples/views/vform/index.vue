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
              value: null,
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
              value: null,
              placeholder: 'tel',
              clearable: true,
            },
            {
              label: 'bankCard',
              key: 'bankCard',
              type: 'bankCard',
              value: null,
              placeholder: 'bankCard',
              clearable: true,
            },
            {
              label: 'money',
              key: 'money',
              type: 'money',
              value: null,
              placeholder: 'money',
              clearable: true,
            }
          ]
        }
      ]
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(Object.keys(this.form)).then(() => {
        this.$toast('Success.')
      }).catch(() => {
      })
    }
  },
  components: {
    README
  }
}
</script>