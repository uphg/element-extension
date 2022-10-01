# ConfigProvider

配置组件默认值，根据嵌套组件层级划分作用域

## 基本用法

通过 ConfigProvider 可以配置组件属性的默认值（只支持当前库重写的组件）

::: demo

config-provider/base

:::

### ConfigProvider Attributes

以下是组件支持全局配置的属性列表

### RadioGroup

| 参数       | 说明                                                       | 类型    | 可选值                | 默认值  |
| :--------- | :--------------------------------------------------------- | :------ | :-------------------- | :------ |
| size       | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 | string  | medium / small / mini | —       |
| text-color | 按钮形式的 Radio 激活时的文本颜色                          | string  | —                     | #ffffff |
| fill       | 按钮形式的 Radio 激活时的填充色和边框色                    | string  | —                     | #409EFF |
| withBorder | radio 是否以按钮形式渲染                                   | boolean | —                     | false   |
| withButton | 是否显示边框                                               | boolean | —                     | false   |

### CheckboxGroup

| 参数       | 说明                                                         | 类型    | 可选值                | 默认值  |
| :--------- | :----------------------------------------------------------- | :------ | :-------------------- | :------ |
| size       | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效 | string  | medium / small / mini | —       |
| min        | 可被勾选的 checkbox 的最小数量                               | number  | —                     | —       |
| max        | 可被勾选的 checkbox 的最大数量                               | number  | —                     | —       |
| text-color | 按钮形式的 Checkbox 激活时的文本颜色                         | string  | —                     | #ffffff |
| fill       | 按钮形式的 Checkbox 激活时的填充色和边框色                   | string  | —                     | #409EFF |
| withBorder | radio 是否以按钮形式渲染                                     | boolean | —                     | false   |
| withButton | 是否显示边框                                                 | boolean | —                     | false   |

### Input

| 参数            | 说明                                                         | 类型             | 可选值                                                       | 默认值 |
| :-------------- | :----------------------------------------------------------- | :--------------- | :----------------------------------------------------------- | :----- |
| type            | 类型                                                         | string           | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form__types) | text   |
| maxlength       | 原生属性，最大输入长度                                       | number           | —                                                            | —      |
| minlength       | 原生属性，最小输入长度                                       | number           | —                                                            | —      |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean          | —                                                            | false  |
| clearable       | 是否可清空                                                   | boolean          | —                                                            | false  |
| show-password   | 是否显示切换密码图标                                         | boolean          | —                                                            | false  |
| size            | 输入框尺寸，只在 `type!="textarea"` 时有效                   | string           | medium / small / mini                                        | —      |
| prefix-icon     | 输入框头部图标                                               | string           | —                                                            | —      |
| suffix-icon     | 输入框尾部图标                                               | string           | —                                                            | —      |
| rows            | 输入框行数，只对 `type="textarea"` 有效                      | number           | —                                                            | 2      |
| autosize        | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | —                                                            | false  |
| autocomplete    | 原生属性，自动补全                                           | string           | on, off                                                      | off    |
| name            | 原生属性                                                     | string           | —                                                            | —      |
| max             | 原生属性，设置最大值                                         | —                | —                                                            | —      |
| min             | 原生属性，设置最小值                                         | —                | —                                                            | —      |
| step            | 原生属性，设置输入字段的合法数字间隔                         | —                | —                                                            | —      |
| resize          | 控制是否能被用户缩放                                         | string           | none, both, horizontal, vertical                             | —      |
| autofocus       | 原生属性，自动获取焦点                                       | boolean          | true, false                                                  | false  |
| form            | 原生属性                                                     | string           | —                                                            | —      |
| label           | 输入框关联的label文字                                        | string           | —                                                            | —      |
| tabindex        | 输入框的tabindex                                             | string           | -                                                            | -      |
| validate-event  | 输入时是否触发表单的校验                                     | boolean          | -                                                            | true   |







<script setup lang="ts">
import ConfigProviderBase from 'docs/demo/config-provider/base.vue'
</script>
