<template>
  <demo-wrapper title="VToolBar 底部工具栏">
    <README/>
    <v-tool-bar>
      <template #extra>#extra</template>
      <van-button type="default">取消</van-button>
      <van-button type="primary">确认保存</van-button>
    </v-tool-bar>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vtoolbar',
  components: {
    README
  }
}
</script>