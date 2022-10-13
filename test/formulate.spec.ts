import { createLocalVue, mount } from '@vue/test-utils'
import { Formulate } from '../src/index'
import ElementPart from '../src/index'
import { ElForm } from 'element-ui/types/form'
import { EFormulate } from '../types/formulate'

const localVue = createLocalVue()
localVue.use(ElementPart)

describe('form', () => {

  it('label width', () => {
    const data = {
      labelWidth: '80px',
      fields: {
        name: { label: '活动名称' }
      }
    }
    const formDemo = {
      template: `
        <e-formulate :data="data"/>
      `,
      data: () => ({ data })
    }  
    const wrapper = mount(formDemo, { localVue })

    const formItemLabel = wrapper.vm.$el.querySelector('.el-form-item__label')
    const formItemContent = wrapper.vm.$el.querySelector('.el-form-item__content')
    expect((formItemLabel as HTMLElement)?.style.width).toBe('80px')
    expect((formItemContent as HTMLElement)?.style.marginLeft).toBe('80px')

    wrapper.destroy()
  })

  it('auto label width', () => {
    const data = {
      labelWidth: 'auto',
      fields: {
        name: { label: '活动名称' },
        remark: { label: '活动备注内容' }
      }
    }

    const formDemo = {
      template: `
        <e-formulate :data="data"/>
      `,
      data: () => ({ data })
    }  
    const wrapper = mount(formDemo, { localVue })

    const formItems = wrapper.vm.$el.querySelectorAll('.el-form-item__content')
    const marginLeft = parseInt((formItems[0] as HTMLElement).style.marginLeft, 10)
    const marginLeft2 = parseInt((formItems[1] as HTMLElement).style.marginLeft, 10)
    expect(marginLeft).toBe(marginLeft2)
  })

  it('inline form', () => {
    const data = {
      inline: true,
      fields: {
        name: { label: '活动名称' },
        remark: { label: '活动备注内容' }
      }
    }

    const formDemo = {
      template: `
        <e-formulate :data="data"/>
      `,
      data: () => ({ data })
    }  
    const wrapper = mount(formDemo, { localVue })
    expect(wrapper.find('.el-form--inline').exists()).toBeTruthy()
  })

  it('label position', () => {
    const data1 = {
      labelPosition: 'top',
      fields: {
        name: { label: '活动名称' },
        remark: { label: '活动备注内容' }
      }
    }
    const data2 = {
      labelPosition: 'left',
      fields: {
        name: { label: '活动名称' },
        remark: { label: '活动备注内容' }
      }
    }
    const formDemo1 = {
      template: `
        <e-formulate :data="data"/>
      `,
      data: () => ({ data: data1 })
    }
    const formDemo2 = {
      template: `
        <e-formulate :data="data"/>
      `,
      data: () => ({ data: data2 })
    }

    const wrapper1 = mount(formDemo1, { localVue })
    const wrapper2 = mount(formDemo2, { localVue })

    expect(wrapper1.find('.el-form--label-top').exists()).toBeTruthy()
    expect(wrapper2.find('.el-form--label-left').exists()).toBeTruthy()
  })

  it('label size', () => {
    const data = {
      size: 'mini',
      fields: {
        name: { label: '活动名称' }
      }
    }
    const formDemo = {
      template: `<e-formulate :data="data"/>`,
      data: () => ({ data })
    }

    const wrapper = mount(formDemo, { localVue })

    expect(wrapper.find('.el-form-item--mini').exists()).toBeTruthy()
  })

  it('show message', async () => {
    const errorMessage = '请输入活动名称'
    const data = {
      fields: {
        name: {
          label: '活动名称',
          rules: {
            required: true,
            message: errorMessage,
            trigger: 'change',
            min: 3,
            max: 6
          }
        }
      }
    }
    const formDemo = {
      template: `<e-formulate ref="formulateRef" :data="data"/>`,
      data: () => ({ data })
    }
    const wrapper = mount<EFormulate>(formDemo, { localVue })
    const vm = wrapper.vm.$refs.formulateRef as EFormulate
    vm?.validate(async (valid: boolean) => {
      expect(valid).toBeFalsy()

      await wrapper.vm.$nextTick()
      expect(wrapper.find('.el-form-item__error').exists()).toBeTruthy()
      expect(wrapper.find('.el-form-item__error').text() === errorMessage).toBeTruthy()
    })
  })

  it('reset field', async () => {
    const data = {
      fields: {
        name: {
          label: '活动名称',
        },
        address: {
          label: '活动区域',
        },
        type: {
          type: 'checkbox',
          label: '活动性质',
          options: [
            {
              label: '美食/餐厅线上活动',
              value: 0
            },
            {
              label: '地推活动',
              value: 1
            },
            {
              label: '线下主题活动',
              value: 2
            },
            {
              label: '单纯品牌曝光',
              value: 3,
            },
          ]
        }
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        address: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }]
      }
    }

    const formDemo = {
      template: `<e-formulate ref="formulateRef" :data="data"/>`,
      data: () => ({ data })
    }

    const wrapper = mount<EFormulate>(formDemo, { localVue })
    const vm = wrapper.vm.$refs.formulateRef as EFormulate

    vm.setValues({ name: 'jack', address: 'abc', type: [2] })
    vm.resetValues()
    await vm.$nextTick()
    expect(vm.formData.name).toBe('')
    expect(vm.formData.address).toBe('')
    expect((vm.formData.type as number[]).length).toBe(0)
  })

  it('clear validate', async () => {
    const data = {
      fields: {
        name: {
          label: '活动名称',
        },
        address: {
          label: '活动区域',
        },
        type: {
          type: 'checkbox',
          label: '活动性质',
          options: [{
            label: '美食/餐厅线上活动',
            value: 0
          }, {
            label: '地推活动',
            value: 1
          }, {
            label: '线下主题活动',
            value: 2
          }, {
            label: '单纯品牌曝光',
            value: 3,
          }]
        }
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        address: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }]
      }
    }

    const formDemo = {
      template: `<e-formulate ref="formulateRef" :data="data"/>`,
      data: () => ({ data })
    }

    const wrapper = mount<EFormulate>(formDemo, { localVue })
    const vm = wrapper.vm.$refs.formulateRef as EFormulate
    vm.validate(() => void 0)

    await vm.$nextTick()
    const nameField = vm.elForm.fields.find((field: { [key: string]: any }) => field.prop === 'name')
    const addressField = vm.elForm.fields.find((field: { [key: string]: any }) => field.prop === 'address')
    expect(nameField?.validateMessage).toBe('请输入活动名称')
    expect(addressField?.validateMessage).toBe('请选择活动区域')

    vm.clearValidate(['name'])
    await vm.$nextTick()
    expect(nameField?.validateMessage).toBe('');
    
    vm.clearValidate()
    await vm.$nextTick()
    expect(addressField?.validateMessage).toBe('')
  })

  it.skip('form item nest button', () => {
    const data = {
      fields: {
        name: {
          label: '活动名称'
        },
        $footer: [
          { type: 'button', hue: 'primary', text: '提交' }
        ]
      }
    }

    const formDemo = {
      template: `
        <e-formulate :data="data"/>
      `,
      data: () => ({ data })
    }

    const wrapper = mount<EFormulate>(formDemo, { localVue })
    expect(wrapper.find('.el-form-item__content .el-button--primary').exists()).toBeTruthy()
  })

  it('form rows', () => {
    const formDemo = {
      template: `
        <e-formulate ref="formulateRef" :data="data"/>
      `,
      data() {
        return {
          data: {
            labelWidth: '80px',
            fields: [{
              name: { label: '用户名', placeholder: '请输入用户名' },
              phone: { label: '手机号', placeholder: '请输入手机号' }
            },{
              password: { label: '密码', placeholder: '请输入密码' },
              checkPass: { label: '确认密码', placeholder: '请输入确认密码' }
            }]
          }
        }
      }
    }    
    const wrapper = mount(formDemo, { localVue })

    expect(wrapper.find('.el-row').exists()).toBeTruthy()
    expect(wrapper.findAll('.el-col').length).toBe(2)
    expect(wrapper.findAll('.el-col-12').length).toBe(2)

    wrapper.destroy()
  })

  it('form extra', () => {
    const formDemo = {
      template: `
        <e-formulate ref="formulateRef" :data="data"/>
      `,
      data: () => ({
        data: {
          fields: {
            name: {
              label: '用户名',
              placeholder: '请输入用户名',
              extra: '<span class="extra" style="color: #e74856;">用户名只支持英文、数字、下划线</span>'
            }
          }
        }
      })
    }    
    const wrapper = mount(formDemo, { localVue })
    const extra = wrapper.find('.e-formulate__extra .extra')
    expect(extra.exists()).toBeTruthy()
    expect(extra.text()).toBe('用户名只支持英文、数字、下划线')

    wrapper.destroy()
  })

})
