<template>
  <demo-wrapper title="Antv/F2 可视化">
    <demo-card>
      <van-tabs v-model="active" type="card" style="width: 400px;" @click="onAction">
        <van-tab title="日"/>
        <van-tab title="月"/>
        <van-tab title="年"/>
      </van-tabs>
      <div style="padding: 8px 8px 0;">
        <v-f2 :init="basic" :data="chartData"/>
      </div>
    </demo-card>
    <demo-card>
      <v-f2 :init="line"/>
    </demo-card>
    <demo-card>
      <v-f2 :init="area"/>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import { line, area } from './examples'
import README from './README.md'

function random(x, y) {
  return Math.round(Math.random() * (y - x) + x)
}

export default {
  name: 'vf2',
  data() {
    return {
      active: 0,
      chartData: []
    }
  },
  created() {
    this.chartData = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]
  },
  methods: {
    onAction(name, title) {
      if (name === 0) {
        this.chartData = [
          { genre: 'Sports', sold: random(100, 200) },
          { genre: 'Strategy', sold: random(100, 200) },
          { genre: 'Action', sold: random(100, 200) },
          { genre: 'Shooter', sold: random(100, 200) },
          { genre: 'Other', sold: random(100, 200) },
        ]
      }
      if (name === 1) {
        this.chartData = [
          { genre: 'Sports', sold: random(100, 200) },
          { genre: 'Strategy', sold: random(100, 200) },
          { genre: 'Action', sold: random(100, 200) },
          { genre: 'Shooter', sold: random(100, 200) },
          { genre: 'Other', sold: random(100, 200) },
        ]
      }
      if (name === 2) {
        this.chartData = []
      }
    },
    basic(F2, options) {
      const chart = new F2.Chart(options)

      chart.source(this.chartData)
      chart.interval().position('genre*sold').color('genre')

      chart.render()

      return chart
    },
    line,
    area
  },
  components: {
    README
  }
}
</script>

<style scoped>

</style>