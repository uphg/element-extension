import { createLocalVue, mount } from '@vue/test-utils'
import SmallElement from '../src/index'

const localVue = createLocalVue()
localVue.use(SmallElement)

describe('form', () => {

  it('label width', () => {
    const formDemo = {
      template: `
        <e-form label-width="80px">
          <e-form-item label="活动名称" v-model="form.name"  />
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
          <e-form-item label="活动名称" v-model="form.name"  />
          <e-form-item label="活动备注内容" v-model="form.remark"  />
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

  it('inline form', () => {
    const formDemo = {
      template: `
        <e-form inline>
          <e-form-item label="活动名称" v-model="form.name"  />
          <e-form-item label="活动备注内容" v-model="form.remark"  />
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
          <e-form-item label="活动名称" v-model="form.name"  />
          <e-form-item label="活动备注内容" v-model="form.remark"  />
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
          <e-form-item label="活动名称" v-model="form.name"  />
          <e-form-item label="活动备注内容" v-model="form.remark"  />
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
          <e-form-item label="活动名称" v-model="form.name"  />
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
          <e-form-item label="活动性质" prop="checkbox" v-model="form.type" type="checkbox" :options="withOptions(['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光'])" />
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
    const elFormRef = formRef.elFormRef
    const nameField = elFormRef.fields.find((field: { [key: string]: any }) => field.prop === 'name')
    const addressField = elFormRef.fields.find((field: { [key: string]: any }) => field.prop === 'address')
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
    it('input', () => {
      const formDemo = {
        template: `
          <e-form :model="form" :rules="rules" ref="formRef">
            <e-form-item label="活动名称" prop="name" ref="field">
              <e-input v-model="form.name"></el-input>
            </e-form-item>
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
          setValue(value) {
            this.form.name = value;
          }
        }
      }
      vm.$refs.form.validate(valid => {
        let field = vm.$refs.field;
        expect(valid).to.not.true;
        vm.$refs.form.$nextTick(_ => {
          expect(field.validateMessage).to.equal('请输入活动名称');
          vm.setValue('aaaaa');

          vm.$refs.form.$nextTick(_ => {
            expect(field.validateMessage).to.equal('');
            vm.setValue('aa');

            vm.$refs.form.$nextTick(_ => {
              expect(field.validateMessage).to.equal('请输入活动名称');
              done();
            });
          });
        });
      });
    })
  })

})
