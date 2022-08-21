# Form 表单

与 Element 表单用法类似，不同点是将常用组件与 ElFormItem 组件结合，并添加快捷创建属性功能

## 基本用法

FormItem 组件的默认 `type="text"`，添加 input 输入框只需要 绑定 v-model

:::code

form/base

:::

## exclude 属性

兼容 Input 组件的 exclude 属性，排除指定字符串规则

:::code

form/input-exclude

:::

## options 选项

FormItem 可以添加 options 属性选项渲染多种选择类型的组件

:::code

form/options

:::

## options 自定义模板

使用 options 插槽给 options 选项自定义模板

:::code

form/options-custom

:::

添加 `option-groups` 属性可以使用 ElSelect 组件的 OptionsGroup 分组功能

:::code

form/option-groups

:::

## 表单验证

添加表单验证功能，与 ElFormItem 相同

:::code

form/validate

:::

## label 插槽

与 ElFormItem label 插槽作用相同

:::code

form/label

:::

## FormItem Attributes

除了支持 [ElFormItem](https://element.eleme.io/#/zh-CN/component/form#form-item-attributes) 的属性，还支持以下属性（注：特定组件的其他属性可以在 extends 属性中以对象形式传入）

| 参数            | 说明                                                         | 类型                              | 可选值                                                       | 默认值              |
| --------------- | ------------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------ | ------------------- |
| type            | 组件类型                                                     | string                            | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form__types) | text                |
| value / v-model | 绑定值                                                       | string / number / boolean / array | —                                                            | —                   |
| maxlength       | 原生属性，最大输入长度                                       | number                            | —                                                            | —                   |
| minlength       | 原生属性，最小输入长度                                       | number                            | —                                                            | —                   |
| placeholder     | 输入框占位文本                                               | string                            | —                                                            | —                   |
| clearable       | 是否可清空                                                   | boolean                           | —                                                            | false               |
| disabled        | 禁用                                                         | boolean                           | —                                                            | false               |
| size            | 输入框尺寸，只在 `type!="textarea"` 时有效                   | string                            | medium / small / mini                                        | —                   |
| rows            | 输入框行数，只对 `type="textarea"` 有效                      | number                            | —                                                            | 2                   |
| autosize        | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object                  | —                                                            | false               |
| autocomplete    | 原生属性，自动补全                                           | string                            | on, off                                                      | off                 |
| name            | 原生属性                                                     | string                            | —                                                            | —                   |
| readonly        | 原生属性，是否只读                                           | boolean                           | —                                                            | false               |
| max             | 设置最大值                                                   | —                                 | —                                                            | —                   |
| min             | 设置最小值                                                   | —                                 | —                                                            | —                   |
| step            | 原生属性，设置输入字段的合法数字间隔                         | —                                 | —                                                            | —                   |
| resize          | 控制是否能被用户缩放                                         | string                            | none, both, horizontal, vertical                             | —                   |
| autofocus       | 原生属性，自动获取焦点                                       | boolean                           | true, false                                                  | false               |
| form            | 原生属性                                                     | string                            | —                                                            | —                   |
| label           | 输入框关联的label文字                                        | string                            | —                                                            | —                   |
| tabindex        | 输入框的tabindex                                             | string                            | -                                                            | -                   |
| show-password   | 是否显示切换密码图标                                         | boolean                           | —                                                            | false               |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean                           | —                                                            | false               |
| validate-event  | 输入时是否触发表单的校验                                     | boolean                           | -                                                            | true                |
| options         | Select / Radio / Checkbox 选项                               | array                             | array, object                                                | []                  |
| option-groups   | Select 组件分组选项                                          | array                             | array, object                                                | []                  |
| action          | 必选参数，上传的地址                                         | string                            | —                                                            | —                   |
| headers         | 设置上传的请求头部                                           | object                            | —                                                            | —                   |
| multiple        | 是否支持多选文件                                             | boolean                           | —                                                            | —                   |
| file-list       | 上传的文件列表, 例如: `[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]` | array                             | —                                                            | []                  |
| accept          | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | string                            | —                                                            | —                   |
| format          | 显示在输入框中的格式                                         | string                            | 见[日期格式](https://element.eleme.io/#/zh-CN/component/date-picker#ri-qi-ge-shi) | yyyy-MM-dd HH:mm:ss |
| picker-options  | 当前时间日期选择器特有的选项参考下表                         | object                            | —                                                            | {}                  |
| extra           | 用于在元素下展示更多说明信息，可以是 html string、纯文本、也可以是 h 函数 | string                            | —                                                            | —                   |
| extends         | 传入特定组件的其他属性                                       | object                            | —                                                            | {}                  |
| expands         | 允许除 expands 外的 props 以对象形式绑定在当前属性           | object                            | —                                                            | {}                  |

## Form-Item Slot

在 ElFormItem 默认插槽基础上添加了以下插槽

| name  | 说明             |
| :---- | :--------------- |
| —     | Form Item 的内容 |
| label | 标签文本的内容   |



<script lang="ts">
export default {
  name: 'DocsForm'
}
</script>

<script setup lang="ts">
import FormBase from 'docs/demo/form/base.vue'
import FormInputExclude from 'docs/demo/form/input-exclude.vue'
import FormOptions from 'docs/demo/form/options.vue'
import FormValidate from 'docs/demo/form/validate.vue'
import FormRender from 'docs/demo/form/render.vue'
import FormOptionsCustom from 'docs/demo/form/options-custom.vue'
import FormOptionGroups from 'docs/demo/form/option-groups.vue'
import FormLabel from 'docs/demo/form/label.vue'
</script>

<style>
.demo-form .el-form-item:last-child {
  margin-bottom: 0;
}
.demo-form .el-form {
  width: 480px;
}
.demo-form .el-input {
  width: 240px;
}
</style>