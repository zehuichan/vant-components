<template>
  <demo-wrapper title="VTable 表格">
    <demo-card title="基础用法">
      <v-table :columns="columns" :data="tabledata">
        <template #name="{scope}">
          {{ scope }}
        </template>
      </v-table>
    </demo-card>
    <README/>
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