### 基础用法

```html

<v-tool-bar>
  <template #extra>#extra</template>
  <el-button type="default">取消</el-button>
  <el-button type="primary">确认保存</el-button>
</v-tool-bar>
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| align | 内容对齐 | _string_ | `left`   |

### Slots

| 名称   | 说明           | 
| ------ | -------------- | 
| default | 默认内容   |
| extra | 扩展内容   |  