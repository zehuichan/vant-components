<template>
  <demo-wrapper title="VPrice 商品价格">
    <demo-card title="基本用法">
      <v-price :price="1010" :need-symbol="false" :thousands="true"/>
    </demo-card>
    <demo-card title="有人民币符号，无千位分隔">
      <v-price :price="10010.01" :need-symbol="true" :thousands="false"/>
    </demo-card>
    <demo-card title="带人民币符号，有千位分隔，保留小数点后三位">
      <v-price :price="15213.1221" :decimal-digits="3" :need-symbol="true" :thousands="false"/>
    </demo-card>
    <demo-card title="异步随机变更">
      <v-price :price="price" :decimal-digits="3" :need-symbol="true" :thousands="true"/>
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
        price: 0
      }
    },
    created() {
      setInterval(() => {
        this.price = Math.random() * 10000000
      }, 1000)
    },
    components: {
      README
    }
  }
</script>