# Element Part

Element 组件模块化配置、表单简化

> 注意：本组件库依赖 element-ui，且只支持 Vue 2.7 版本以上

## 安装

```bash
npm install element-part # or pnpm add element-part
```

## 在项目中引入

全局引入

```ts
import Vue from 'vue'
import ElementUI from 'element-ui'
import ElementPart from 'element-part'

Vue.use(ElementUI)
Vue.use(ElementPart)
```

按需引入

```ts
import Vue from 'vue'
import ElementUI from 'element-ui'
import { Form, FormItem } from 'element-part'

Vue.use(ElementUI)
Vue.use(Form)
Vue.use(FormItem)
```

## Form 表单支持组件列表

- ✅ Radio 单选框
- ✅ Checkbox 多选框
- ✅ Input 输入框
- ✅ InputNumber 计数器
- ✅ Select 选择器
- ✅ Cascader 级联选择器
- ✅ Switch 开关
- ✅ Slider 滑块
- ✅ TimePicker 时间选择器
- ✅ DatePicker 日期选择器
- ✅ DateTimePicker 日期时间选择器
- ✅ Upload 上传
- ❌ Rate 评分
- ❌ ColorPicker 颜色选择器
- ❌ Transfer 穿梭框
- ⚠️ ...
