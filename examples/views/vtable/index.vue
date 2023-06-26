<template>
  <demo-wrapper title="VTable 表格">
    <demo-card title="基础用法，支持自定义单元格">
      <v-table :columns="columns" :data="tabledata">
        <template #name="{scope}">
          {{ scope }}
        </template>
      </v-table>
    </demo-card>
    <demo-card title="无数据默认展示，支持自定义">
      <v-table :columns="columns" :data="[]" />
      <v-table :columns="columns" :data="[]">
        <template #nodata>
          这里是自定义展示
        </template>
      </v-table>
    </demo-card>
    <demo-card title="显示总结栏，支持自定义">
      <v-table :columns="columns" :data="tabledata" show-summary summary="这是总结栏" />
      <br>
      <v-table :columns="columns" :data="tabledata" show-summary>
        <template #summary>
          这里是自定义总结栏
        </template>
      </v-table>
    </demo-card>
    <README />
  </demo-wrapper>
</template>

<script>
import README from './README.md'

export default {
  name: 'vtable',
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
  components: {
    README
  }
}
</script>