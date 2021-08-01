<template>
  <demo-wrapper title="VField 扩展输入框">
    <demo-card title="basic">
      <v-field v-model="form.value" label="field" placeholder="placeholder" clearable/>
      <v-field v-model="form.password" show-password label="password" placeholder="password" clearable/>
      <v-field v-model="form.tel" type="tel" label="tel" placeholder="tel" clearable/>
      <v-field v-model="form.bankCard" type="bankCard" label="bankCard" placeholder="bankCard" clearable/>
      <v-field v-model="form.money" type="money" label="money" placeholder="money" clearable/>
      <code>{{ form }}</code>
    </demo-card>
    <demo-card title="slot">
      <v-field
        v-model="form.value"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </v-field>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vprice',
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
  components: {
    README
  }
}
</script>