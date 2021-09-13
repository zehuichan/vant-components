### 介绍

表单项类型 - 省市区选择器。

### 基础用法

```html
<!--基础用法-->
<v-area label="area" v-model="value1" placeholder="placeholder" clearable/>
<!--使用插槽-->
<v-area label="area" v-model="value1" placeholder="placeholder" clearable>
  <template #title>我是自定义title</template>
  <template #columns-top>columns-top</template>
  <template #columns-bottom>columns-bottom</template>
</v-area>
```

```js
export default {
  data() {
    return {
      value1: ['110000', '110100', '110102'],
    }
  },
}
```

### @vant/area-data

本例子默认使用 Vant 官方提供的省市区数据。鉴于构建包大小，需用户自行引入相关依赖。

```shell
npm i -S @vant/area-data
#or
yarn add @vant/area-data
```

```js
import { areaList } from '@vant/area-data'

export default {
  data() {
    return {
      areaList
    }
  },
}
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| v-model (value) | 绑定值 | _array_ | `[]`  |
| title   | 顶部栏标题   | _string_  | _  |
| area-list   |  省市区数据  | _object_ | _  |

### Slots

| 名称   | 说明           | 参数           |
| ------ | -------------- | -------------- | 
| title | 自定义顶部标题 | _  |
| columns-top | 自定义选项上方内容   | _  |
| columns-bottom  | 自定义选项下方内容   | _  |

### 待优化...