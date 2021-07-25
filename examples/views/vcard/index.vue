<template>
  <demo-wrapper title="VCard 卡片">
    <demo-card title="包含标题，内容和操作。">
      <v-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="fl" style="line-height: 25px;">卡片名称</div>
          <div class="fr">
            <van-button type="primary" size="mini">操作按钮</van-button>
          </div>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </v-card>
    </demo-card>
    <demo-card title="卡片可以只有内容区域。">
      <v-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </v-card>
    </demo-card>
    <demo-card title="仿订单卡片。">
      <v-card shadow="never" class="box-card">
        <div>
          <van-image src="https://img01.yzcdn.cn/vant/ipad.jpeg"/>
        </div>
        <div slot="footer" class="text-right">
          <van-button plain size="small">延长收货</van-button>
          <van-button plain size="small">查看物流</van-button>
          <van-button plain size="small" type="warning">确认收货</van-button>
        </div>
      </v-card>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  components: {
    README
  }
}
</script>

<style>
.box-card {
  width: 480px;
}

.text {
  line-height: 20px;
}

.text-right {
  text-align: right;
}
</style>