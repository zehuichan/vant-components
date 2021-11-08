<template>
  <demo-wrapper title="VSpace 间距">
    <demo-card>
      <div class="slider-wrapper">
        <van-slider v-model="size">
          <template #button>
            <div class="custom-button">{{ size }}</div>
          </template>
        </van-slider>
      </div>
      <v-space :size="size">
        <v-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ 'List item ' + o }}
          </div>
        </v-card>
      </v-space>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vspace',
  data() {
    return {
      size: 20,
    }
  },
  components: {
    README
  }
}
</script>

<style lang="less" scoped>
.slider-wrapper {
  padding: 8px 0 24px;
}

.item {
  margin-bottom: 12px;
}

.text {
  font-size: 12px;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 100px;
}
</style>