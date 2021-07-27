### 介绍

通用卡片容器。

### 包含标题，内容和操作。

```html

<v-card class="box-card">
  <div slot="header" class="clearfix">
    <div class="fl" style="line-height: 25px;">卡片名称</div>
    <div class="fr">
      <van-button type="primary" size="mini">操作按钮</van-button>
    </div>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{ '列表内容 ' + o }}
  </div>
</v-card>
```

### 卡片可以只有内容区域。

```html

<v-card class="box-card">
  <div v-for="o in 4" :key="o" class="text item">
    {{ '列表内容 ' + o }}
  </div>
</v-card>
```

### 仿订单卡片。

```html
<v-card class="box-card" :body-style="{padding: 0}">
  <div class="goods">
    <div class="goods-thumb">
      <van-image src="https://img01.yzcdn.cn/vant/ipad.jpeg"/>
    </div>
    <div class="goods-content">
      <div>
        <div class="goods-title">商品名称</div>
        <div class="goods-desc">描述信息</div>
      </div>
      <div>
        <v-price/>
      </div>
    </div>
  </div>
  <div slot="footer" class="text-right">
    <van-button plain size="small">延长收货</van-button>
    <van-button plain size="small">查看物流</van-button>
    <van-button plain size="small" type="warning">确认收货</van-button>
  </div>
</v-card>
```

## API

### Base Props

| 参数   | 说明           | 类型      | 默认值 |
| ------ | -------------- | --------- | ------ |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM  | _    |_    |
| body-style   | 设置 body 的样式 | _object_  | `{}` |
| shadow   | 设置阴影显示时机 always \| hover \| never  | _string_  | `always` |
