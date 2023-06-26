# @vcomponetns/Vant-ui

[github pages](https://zehuichan.github.io/vant-components/)

## 前置条件
```js
import Vue from 'vue'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

### 安装
```sh
npm i vantui-components -S
#or
yarn add vantui-components
```

### 引入组件
```js
// main.js
// 全局引入
import VComponents from 'vantui-components'

Vue.use(VComponents)
```

### 按需引入

```js
import { VTable } from 'vantui-components'

export default {
    components: {
        VTable
    }
}
```


### 如何新建组件
```shell
npm i -g plop
plop / npm run new
选择业务模块
输入组件中文名称
输入组件英文名称
开始组件编写工作
```
