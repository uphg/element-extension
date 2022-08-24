# 快速开始

## 安装

```bash
npm i element-part
# or 
pnpm add element-part
yarn add element-part
```

## 在项目中引入

全局引入

```ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import ElementPart from 'element-part'

Vue.use(ElementUI);
Vue.use(ElementPart)
```

按需引入

```ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import { Form, FormItem } from 'element-part'

Vue.use(ElementUI);
Vue.use(Form)
Vue.use(FormItem)
```

