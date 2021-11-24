### 基础用法

```html
<!--basic-->
<v-checker
  class="demo-checker"
  v-model="value"
  title="标题"
  :columns="columns"
/>
<!--分组-->
<v-checker
  class="demo-checker"
  v-model="value2"
  title="标题"
  :columns="columns2"
  @confirm="onConfirm"
  @cancel="onCancel"
/>
<!--搭配单元格使用-->
<van-cell title="setValue" :border="false" is-link @click="value2 = [ 11, 12, 13, 14, 15 ]"/>
<van-cell title="resetValue" :border="false" is-link @click="value2 = []"/>
<van-cell title="属性选择" :value="value2.toString()" :border="false" is-link @click="show = true"/>
<van-popup v-model="show" :round="false" position="bottom" get-container="body" safe-area-inset-bottom>
  <v-checker
    v-model="value2"
    title="标题"
    :columns="columns2"
    multiple
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</van-popup>
```

```js
export default {
  data() {
    return {
      show: false,
      value: [1],
      value2: [11, 12, 13],
      columns: [
        { label: '上海', value: 1 },
        { label: '北京', value: 2, disabled: true },
        { label: '广州', value: 3 },
        { label: '深圳', value: 4 },
      ],
      columns2: [
        {
          title: '分组1',
          values: [
            { label: '周一', value: 11 },
            { label: '周二', value: 12 },
            { label: '周三', value: 13 },
            { label: '周四', value: 14 },
            { label: '周五', value: 15 },
          ]
        },
        {
          title: '分组2',
          values: [
            { label: '上午', value: 21, imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png' },
            { label: '下午', value: 22, imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png' },
            { label: '晚上', value: 23, imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png' },
          ]
        },
        {
          title: '分组3',
          disabled: true,
          values: [
            { label: '吃饭', value: 31 },
            { label: '睡觉', value: 32 },
            { label: '打游戏', value: 33 },
          ]
        },
      ]
    }
  },
  methods: {
    onConfirm() {
      this.show = false
      this.$toast('confirm: ' + this.value2.toString())
    },
    onCancel() {
      this.show = false
      this.$toast('cancel')
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _array_  | _    |
| title | 标题 | _string_  | _    |
| columns | 对象数组，配置每一列显示的数据 | _Options[]_  | `[]`    |
| multiple | 是否多选 | _boolean_  | `false`  |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | _number_  | `0`    |
| lazy-load | 是否开启图片懒加载 | _boolean_  | `false`  |
| prop | 唯一标识的键名 | _object_  | `{ label: 'label', value: 'value' }`    |
