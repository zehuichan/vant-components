### 介绍

表单项类型 - 自动填充。

### 基础用法

```html

<v-auto-complete
  v-model="value"
  label="autocomplete"
  placeholder="placeholder"
  clearable
  :fetch-suggestions="querySearch"
>
  <template #default="{item}">
    <div class="name">{{ item.value }}</div>
    <span class="addr">{{ item.address }}</span>
  </template>
</v-auto-complete>
```

```js
export default {
  data() {
    return {
      value: '',
      restaurants: [],
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
  }
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _string_  | _    |
| debounce | 获取输入建议的去抖延时   | _number_  | `300`    |
| value-key | 输入建议对象中用于显示的键名 | _string_  | `value`    |
| fetch-suggestions   | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | _Function(queryString,callback)_  | _    |