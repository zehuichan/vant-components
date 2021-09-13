<template>
  <demo-wrapper title="VForm 表单">
    <demo-card>
      <v-form ref="form" v-model="form" :options="options" :validate-first="false">
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
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

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
  name: 'vform',
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
  components: {
    README
  }
}
</script>

<style lang="less">

</style>