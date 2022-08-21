import { createLocalVue, mount } from '@vue/test-utils'
import { Formulate } from '../src/index'
import ElementPart from '../src/index'

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
    const wrapper = mount(Formulate, {
      propsData: {
        data,
      },
    })
    expect(wrapper.props().data).toBe(data)
    expect(wrapper.vm.$el.querySelector('.el-form-item__label').style.width).toBe('80px')
    expect(wrapper.vm.$el.querySelector('.el-form-item__content').style.marginLeft).toBe('80px')

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
    const wrapper = mount(Formulate, {
      propsData: {
        data,
      },
    })
    expect(wrapper.props().data).toBe(data)
    const formItems = wrapper.vm.$el.querySelectorAll('.el-form-item__content')
    const marginLeft = parseInt(formItems[0].style.marginLeft, 10)
    const marginLeft2 = parseInt(formItems[1].style.marginLeft, 10)
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
    const wrapper = mount(Formulate, {
      propsData: {
        data,
      },
    })
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

    const wrapper1 = mount(Formulate, { propsData: { data: data1 } })
    const wrapper2 = mount(Formulate, { propsData: { data: data2 } })

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
    const wrapper = mount(Formulate, {
      propsData: {
        data,
      },
    })

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
    const wrapper = mount(Formulate, {
      propsData: {
        data,
      },
    })
    wrapper.vm.submit(async (formData: { [key: string]: any }, options:{ valid: boolean }) => {
      expect(options.valid).toBeFalsy()

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

    const wrapper = mount(Formulate, {
      propsData: {
        data,
      }
    })

    const vm = wrapper.vm

    vm.setValues({ name: 'jack', address: 'abc', type: [2] })
    vm.resetFields()
    await vm.$nextTick()
    expect(vm.formData.name).toBe('')
    expect(vm.formData.address).toBe('')
    expect(vm.formData.type.length).toBe(0)
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

    const wrapper = mount(Formulate, { propsData: { data } })
    const vm = wrapper.vm

    vm.validate(() => void 0)

    await vm.$nextTick()
    const nameField = vm.elForm.fields.find((field: { [key: string]: any }) => field.prop === 'name')
    const addressField = vm.elForm.fields.find((field: { [key: string]: any }) => field.prop === 'address')
    expect(nameField.validateMessage).toBe('请输入活动名称')
    expect(addressField.validateMessage).toBe('请选择活动区域')

    vm.clearValidate(['name'])
    await vm.$nextTick()
    expect(nameField.validateMessage).toBe('');
    
    vm.clearValidate()
    await vm.$nextTick()
    expect(addressField.validateMessage).toBe('')
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

    const wrapper = mount(Formulate, { propsData: { data } })
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

    console.log(`wrapper.find('.el-row')`)
    console.log(wrapper.find('.el-row'))
    expect(wrapper.find('.el-row').exists()).toBeTruthy()
    expect(wrapper.findAll('.el-col').length).toBe(2)
    expect(wrapper.findAll('.el-col-12').length).toBe(2)

    wrapper.destroy()
  })

})
