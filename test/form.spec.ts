import { createLocalVue, mount } from '@vue/test-utils'
import ElementPart from '../src/index'

const localVue = createLocalVue()
localVue.use(ElementPart)

const withOptions = (options: string[]) => (options.map((item, index) =>({
  label: item,
  value: index
})))

describe('form', () => {

  it('label width', () => {
    const formDemo = {
      template: `
        <e-form label-width="80px">
          <e-form-item label="活动名称" v-model="form.name"/>
        </e-form>
      `,
      data() {
        return {
          form: {
            name: ''
          }
        }
      }
    }    
    const wrapper = mount(formDemo, { localVue })

    expect(wrapper.vm.$el.querySelector('.el-form-item__label').style.width).toBe('80px')
    expect(wrapper.vm.$el.querySelector('.el-form-item__content').style.marginLeft).toBe('80px')

    wrapper.destroy()
  })

  it('auto label width', () => {
    const formDemo = {
      template: `
        <e-form label-width="auto">
          <e-form-item label="活动名称" v-model="form.name"/>
          <e-form-item label="活动备注内容" v-model="form.remark"/>
        </e-form>
      `,
      data() {
        return {
          form: {
            name: '',
            remark: ''
          }
        }
      }
    }    
    const wrapper = mount(formDemo, { localVue })
    const formItems = wrapper.vm.$el.querySelectorAll('.el-form-item__content')
    const marginLeft = parseInt(formItems[0].style.marginLeft, 10)
    const marginLeft2 = parseInt(formItems[1].style.marginLeft, 10)

    expect(marginLeft).toBe(marginLeft2)
  })

  it('label slot', () => {
    const formDemo = {
      template: `
        <e-form label-width="80px">
          <e-form-item v-model="form.name">
            <template v-slot:label>
              <span class="label-slot">活动名称</span>
            </template>
          </e-form-item>
        </e-form>
      `,
      data() {
        return {
          form: {
            name: ''
          }
        }
      }
    }    
    const wrapper = mount(formDemo, { localVue })

    expect(wrapper.vm.$el.querySelector('.el-form-item__label').querySelector('.label-slot').nodeName).toBe('SPAN')
    expect(wrapper.vm.$el.querySelector('.el-form-item__label').querySelector('.label-slot').textContent).toBe('活动名称')

    wrapper.destroy()
  })

  it('inline form', () => {
    const formDemo = {
      template: `
        <e-form inline>
          <e-form-item label="活动名称" v-model="form.name"/>
          <e-form-item label="活动备注内容" v-model="form.remark"/>
        </e-form>
      `,
      data() {
        return {
          form: {
            name: '',
            remark: ''
          }
        }
      }
    }
    const wrapper = mount(formDemo, { localVue })
    expect(wrapper.find('.el-form--inline').exists()).toBeTruthy()
  })

  it('label position', () => {
    const formDemo1 = {
      template: `
        <e-form label-position="top" ref="labelTop">
          <e-form-item label="活动名称" v-model="form.name"/>
          <e-form-item label="活动备注内容" v-model="form.remark"/>
        </e-form>
      `,
      data: () => ({
        form: {
          name: '',
          remark: ''
        }
      })
    }

    const formDemo2 = {
      template: `
        <e-form label-position="left" ref="labelLeft">
          <e-form-item label="活动名称" v-model="form.name"/>
          <e-form-item label="活动备注内容" v-model="form.remark"/>
        </e-form>
      `,
      data: () => ({
        form: {
          name: '',
          remark: ''
        }
      })
    }

    const wrapper1 = mount(formDemo1, { localVue })
    const wrapper2 = mount(formDemo2, { localVue })

    expect(wrapper1.find('.el-form--label-top').exists()).toBeTruthy()
    expect(wrapper2.find('.el-form--label-left').exists()).toBeTruthy()
  })

  it('label size', () => {
    const formDemo = {
      template: `
        <e-form size="mini">
          <e-form-item label="活动名称" v-model="form.name"/>
        </e-form>
      `,
      data: () => ({
        form: {
          name: ''
        }
      })
    }

    const wrapper = mount(formDemo, { localVue })
    expect(wrapper.find('.el-form-item--mini').exists()).toBeTruthy()
  });

  it('show message', () => {
    const formDemo = {
      template: `
        <e-form ref="formRef">
          <e-form-item label="活动名称" v-model="form.name" :rules="{
            required: true,
            message: '请输入活动名称',
            trigger: 'change',
            min: 3,
            max: 6
          }"/>
        </e-form>
      `,
      data: () => ({
        form: {
          name: ''
        }
      })
    }
    const wrapper = mount(formDemo, { localVue })
    wrapper.vm.$refs.formRef.validate(async (valid: boolean) => {
      expect(valid).toBeFalsy()
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.el-form-item__error').exists()).toBeTruthy()
      expect(wrapper.find('.el-form-item__error').text() === '请输入活动名称').toBeTruthy()
    })
  })

  it('clear validate', async () => {
    const formDemo = {
      template: `
        <e-form ref="formRef" :model="form" :rules="rules">
          <e-form-item label="活动名称" prop="name" v-model="form.name"/>
          <e-form-item label="活动区域" prop="address" v-model="form.address"/>
          <e-form-item label="活动性质" prop="checkbox" v-model="form.type" type="checkbox" :options="withOptions(['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光'])"/>
        </e-form>
      `,
      data: () => ({
        form: {
          name: '',
          address: '',
          type: []
        },
        rules: {
          name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          address: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
          type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }]
        }
      }),
      methods: {
        withOptions(options: string[]) {
          return options.map((item, index) => ({ label: item, value: index }))
        }
      }
    }
    const wrapper = mount(formDemo, { localVue })
    const formRef = wrapper.vm.$refs.formRef

    formRef.validate(() => void 0)
    await formRef.$nextTick()
    const elForm = formRef.elForm
    const nameField = elForm.fields.find((field: { [key: string]: any }) => field.prop === 'name')
    const addressField = elForm.fields.find((field: { [key: string]: any }) => field.prop === 'address')
    expect(nameField.validateMessage).toBe('请输入活动名称');
    expect(addressField.validateMessage).toBe('请选择活动区域');

    formRef.clearValidate(['name'])
    await formRef.$nextTick()
    expect(nameField.validateMessage).toBe('');

    formRef.clearValidate()
    await formRef.$nextTick()
    expect(addressField.validateMessage).toBe('')
  })

  it('form item nest', async () => {
    const formDemo = {
      template: `
        <e-form ref="formRef" :model="form" :rules="rules">
          <e-form-item label="活动时间" required>
            <e-form-item prop="date1" type="date" placeholder="选择日期" v-model="form.date1"/>
            <span>-</span>
            <e-form-item prop="date2" type="time" placeholder="选择时间" v-model="form.date2"/>
          </e-form-item>
        </e-form>
      `,
      data() {
        return {
          form: {
            date1: '',
            date2: ''
          },
          rules: {
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ]
          }
        };
      }
    }

    const wrapper = mount(formDemo, { localVue })
    const formRef = wrapper.vm.$refs.formRef
    formRef.validate((valid: boolean, error: any) => {
      expect(valid).toBeFalsy()
    })
  });

  describe('validate', () => {
    it('input', async () => {
      const formDemo = {
        template: `
          <e-form :model="form" :rules="rules" ref="formRef">
            <e-form-item label="活动名称" type="text" prop="name" v-model="form.name" ref="formItemRef"/>
          </e-form>
        `,
        data() {
          return {
            form: {
              name: ''
            },
            rules: {
              name: [
                { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
              ]
            }
          };
        },
        methods: {
          setValue(this: { form: { name: string } },value: string) {
            this.form.name = value;
          }
        }
      }
      const wrapper = mount(formDemo, { localVue })
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate((valid: boolean) => {
        expect(valid).toBeFalsy()
      })
      const elFormItem = wrapper.vm.$refs.formItemRef.elFormItem
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('请输入活动名称')

      wrapper.vm.setValue('abc')
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('')

      wrapper.vm.setValue('aa')
      await formRef.$nextTick()
      expect(elFormItem.validateMessage).toBe('请输入活动名称')
    })

    it('textarea', async () => {
      const formDemo = {
        template: `
          <e-form :model="form" :rules="rules" ref="formRef">
            <e-form-item label="活动名称" type="textarea" prop="name" v-model="form.name" ref="formItemRef"/>
          </e-form>
        `,
        data() {
          return {
            form: {
              name: ''
            },
            rules: {
              name: [
                { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
              ]
            }
          };
        },
        methods: {
          setValue(this: { form: { name: string } },value: string) {
            this.form.name = value;
          }
        }
      }
      const wrapper = mount(formDemo, { localVue })
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate((valid: boolean) => {
        expect(valid).toBeFalsy()
      })
      const elFormItem = wrapper.vm.$refs.formItemRef.elFormItem
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('请输入活动名称')

      wrapper.vm.setValue('abc')
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('')

      wrapper.vm.setValue('aa')
      await formRef.$nextTick()
      expect(elFormItem.validateMessage).toBe('请输入活动名称')
    })

    it('select', async () => {
      const formDemo = {
        template: `
          <e-form :model="form" :rules="rules" ref="formRef">
            <e-form-item
              label="活动区域"
              type="select"
              prop="region"
              v-model="form.region"
              :options="[
                { label: '区域一', value: 0 },
                { label: '区域二', value: 1 }
              ]"
              ref="formItemRef"
            />
          </e-form>
        `,
        data() {
          return {
            form: {
              region: ''
            },
            rules: {
              region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
              ]
            }
          };
        }
      }
      const wrapper = mount(formDemo, { localVue })
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate((valid: boolean) => {
        expect(valid).toBeFalsy()
      })
      const elFormItem = wrapper.vm.$refs.formItemRef.elFormItem
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('请选择活动区域')

      wrapper.vm.form.region = 0
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('')

      wrapper.vm.form.region = ''
      await formRef.$nextTick()
      expect(elFormItem.validateMessage).toBe('请选择活动区域')
    })

    it('datepicker', async () => {
      const formDemo = {
        template: `
          <e-form :model="form" :rules="rules" ref="formRef">
            <e-form-item
              label="活动日期"
              type="date"
              prop="date"
              v-model="form.date"
              ref="formItemRef"
              placeholder="选择日期"
            />
          </e-form>
        `,
        data() {
          return {
            form: {
              date: ''
            },
            rules: {
              date: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
              ]
            }
          };
        }
      }
      const wrapper = mount(formDemo, { localVue })
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate((valid: boolean) => {
        expect(valid).toBeFalsy()
      })
      const elFormItem = wrapper.vm.$refs.formItemRef.elFormItem
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('请选择日期')

      wrapper.vm.form.date = new Date()
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('')

      wrapper.vm.form.date = ''
      await formRef.$nextTick()
      expect(elFormItem.validateMessage).toBe('请选择日期')
    })

    it('timepicker', async () => {
      const formDemo = {
        template: `
          <e-form :model="form" :rules="rules" ref="formRef">
            <e-form-item
              label="活动时间"
              type="time"
              prop="time"
              v-model="form.time"
              ref="formItemRef"
              placeholder="选择时间"
            />
          </e-form>
        `,
        data() {
          return {
            form: {
              time: ''
            },
            rules: {
              time: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
              ]
            }
          };
        }
      }
      const wrapper = mount(formDemo, { localVue })
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate((valid: boolean) => {
        expect(valid).toBeFalsy()
      })
      const elFormItem = wrapper.vm.$refs.formItemRef.elFormItem
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('请选择时间')

      wrapper.vm.form.time = new Date()
      await formRef.elForm.$nextTick()
      expect(elFormItem.validateMessage).toBe('')

      wrapper.vm.form.time = ''
      await formRef.$nextTick()
      expect(elFormItem.validateMessage).toBe('请选择时间')
    })
  })

  describe('components additional features', () => {

    it('form item prefix', () => {
      const formDemo = {
        template: `
          <e-form>
            <e-form-item label="活动名称" v-model="form.name">
              <template #itemPrefix>
                <span class="item-prefix">我是前缀</span>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          form: { name: '' }
        })
      }

      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.item-prefix').exists()).toBeTruthy()
    })

    it('form item suffix', () => {
      const formDemo = {
        template: `
          <e-form>
            <e-form-item label="活动名称" v-model="form.name">
              <template #itemSuffix>
                <span class="item-suffix">我是后缀</span>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          form: { name: '' }
        })
      }

      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.item-suffix').exists()).toBeTruthy()
    })

    it('select options group', () => {
      const formDemo = {
        template: `
          <e-form ref="formRef">
            <e-form-item
              type="select"
              label="活动区域"
              v-model="select"
              :option-groups="options"
            >
              <template v-slot:options="slotProps">
                <span class="custom-options">{{ slotProps.label + '-' + slotProps.value }}</span>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          select: '',
          options: [{
            label: '热门城市',
            options: [{
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }]
          }, {
            label: '城市名',
            options: [{
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }]
          }],
        }),
        methods: { withOptions }
      }
      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.custom-options').exists()).toBeTruthy()
      expect(wrapper.find('.custom-options').text()).toBe('上海-Shanghai')
    })

    it('select options scopedSlots', () => {
      const formDemo = {
        template: `
          <e-form ref="formRef">
            <e-form-item
              type="select"
              label="活动区域"
              v-model="form.region"
              :options="[{
                value: 'Shanghai',
                label: '上海'
              }, {
                value: 'Beijing',
                label: '北京'
              }]"
            >
              <template v-slot:options="slotProps">
                <span class="custom-options">{{ slotProps.label + '-' + slotProps.value }}</span>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          form: {
            region: ''
          }
        })
      }
      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.custom-options').exists()).toBeTruthy()
      expect(wrapper.find('.custom-options').text()).toBe('上海-Shanghai')
    })

    it('radio options scopedSlots', () => {
      const formDemo = {
        template: `
          <e-form ref="formRef">
            <e-form-item
              type="radio"
              label="活动区域"
              v-model="form.region"
              :options="withOptions(['区域一'])"
            >
              <template v-slot:options="slotProps">
                <span class="custom-options">{{ slotProps.label + '-' + slotProps.value }}</span>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          form: {
            region: ''
          }
        }),
        methods: { withOptions }
      }
      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.el-radio-group').exists()).toBeTruthy()
      expect(wrapper.find('.custom-options').exists()).toBeTruthy()
      expect(wrapper.find('.custom-options').text()).toBe('区域一-0')
    })

    it('checkbox options scopedSlots', () => {
      const formDemo = {
        template: `
          <e-form ref="formRef">
            <e-form-item
              type="checkbox"
              label="活动区域"
              v-model="form.region"
              :options="withOptions(['区域一'])"
            >
              <template v-slot:options="slotProps">
                <span class="custom-options">{{ slotProps.label + '-' + slotProps.value }}</span>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          form: {
            region: ''
          }
        }),
        methods: { withOptions }
      }
      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.el-checkbox-group').exists()).toBeTruthy()
      expect(wrapper.find('.custom-options').exists()).toBeTruthy()
      expect(wrapper.find('.custom-options').text()).toBe('区域一-0')
    })

    it('input extends', () => {
      const formDemo = {
        template: `
          <e-form>
            <e-form-item label="活动名称" v-model="form.name" :extends="{ prefixIcon: 'el-icon-search' }"/>
          </e-form>
        `,
        data: () => ({
          form: { name: '' }
        })
      }

      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.el-icon-search').exists()).toBeTruthy()
    })

    it('input slots', () => {
      const formDemo = {
        template: `
          <e-form>
            <e-form-item label="活动名称" v-model="form.name">
              <template v-slot:prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </e-form-item>
          </e-form>
        `,
        data: () => ({
          form: { name: '' }
        })
      }

      const wrapper = mount(formDemo, { localVue })
      expect(wrapper.find('.el-input__prefix .el-icon-search').exists()).toBeTruthy()
    })
  })

})
