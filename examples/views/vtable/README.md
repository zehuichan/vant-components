### 介绍

用于展示基础表格。

暂不支持复合props，ex: `a.b.c`

### 基础用法

```html
<!--基础用法，支持自定义单元格-->
<v-table :columns="columns" :data="tabledata">
  <template #name="{scope}">
    {{ scope }}
  </template>
</v-table>

<!--无数据默认展示，支持自定义-->
<v-table :columns="columns" :data="[]"/>
<v-table :columns="columns" :data="[]">
  <template #nodata>
    这里是自定义展示
  </template>
</v-table>

<!--显示总结栏，支持自定义-->
<v-table :columns="columns" :data="tabledata" show-summary summary="这是总结栏"/>
<br>
<v-table :columns="columns" :data="tabledata" show-summary>
  <template #summary>
    这里是自定义总结栏
  </template>
</v-table>
```

```js
export default {
  data() {
    return {
      columns: [
        {
          label: '姓名',
          key: 'name'
        },
        {
          label: '性别',
          key: 'sex'
        },
        {
          label: '学历',
          key: 'record'
        }
      ],
      tabledata: [
        {
          name: 'Tom',
          sex: '男',
          record: '小学'
        },
        {
          name: 'Lucy',
          sex: '女',
          record: '本科',
        },
        {
          name: 'Jack',
          sex: '男',
          record: '高中'
        }
      ],
    }
  },
}
```

## API

### Base Props

| 参数       | 说明          | 类型        | 默认值     |
|----------| ------------- |-----------|---------|
| bordered | 是否显示边框   | _boolean_ | `true`  |
| columns  | 表头数据   | _array_   | `[]`    |
| data     | 表格数据   | _array_   | `[]`    |
| show-summary  | 是否在表尾显示简介  | _boolean_ | `false` |
| summary  | 是否显示简介 | _function_       | `_`     |
| striped  | 条纹是否明暗交替   | _boolean_ | `false` |

### ColumnProps

| 参数  | 说明           | 类型           | 默认值    |
|-----|--------------|--------------|--------|
| key | 列的唯一标识       | _string_     | `_`    |
| label   | 表头标题         | _string_     | `_`    |
| align   | 列的对齐方式，可选值 _left \| center\| right_ | _string_ | `left` |

### Slots

| 名称 | 说明 | |--------|--| | key | 单元格唯一标识 | | nodata | 无数据 | | summary | 简介 |