<template>
  <div class="v-uploader">
    <div class="v-uploader__reference" @click="show=true">
      <slot/>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :round="false"
      :close-on-click-action="false"
      cancel-text="取消"
      description="文件上传"
      @select="onSelect"
      @close="show = false"
      @cancel="show = false"
    />
  </div>
</template>

<script>
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i

export default {
  name: 'VUploader',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: Array,
    limit: [String, Number],
    disabled: Boolean,
  },
  computed: {
    actions() {
      return [
        { name: '拍照', value: 'camera', disabled: this.disabled },
        { name: '从手机相册选择', value: 'album', disabled: this.disabled }
      ]
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    onSelect(action) {
      if (this.value.length >= +this.limit) {
        this.$emit('exceed', this.value)
        return
      }
      this.$wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [action.value],
        success: (res) => {
          this.getLocalImgData(res.localIds[0])
        },
        fail(info) {
          console.log(info)
        }
      })
    },
    getLocalImgData(localId) {
      this.$wx.getLocalImgData({
        localId: localId,
        success: async (res) => {
          let file
          const { localData } = res
          if (localData.includes('data:image')) {
            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
            file = localData
          } else {
            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
            file = `data:image/jpeg;base64,` + localData.replace(/\n/g, '')
          }
          this.show = false
          await this.readerData(file)
        }
      })
    },
    readerData(file) {
      return new Promise((resolve) => {
        this.$emit('success', file)
        resolve()
      })
    },
  }
}
</script>

<style lang="less">
.v-uploader {
  display: inline-block;
}

.v-uploader + .van-button,
.v-uploader + .v-uploader,
.van-button + .v-uploader {
  margin-left: 8px;
}
</style>