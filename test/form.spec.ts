import { createLocalVue, mount } from '@vue/test-utils'
import SimElement from '../src/index'

const localVue = createLocalVue()
localVue.use(SimElement)

describe('form', () => {

  it('label width', () => {
    const formDemo = {
      template: `
        <s-form label-width="80px">
          <s-form-item label="活动名称" v-model="form.name"  />
        </s-form>
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
        <s-form label-width="auto">
          <s-form-item label="活动名称" v-model="form.name"  />
          <s-form-item label="活动备注内容" v-model="form.remark"  />
        </s-form>
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
        <s-form inline>
          <s-form-item label="活动名称" v-model="form.name"  />
          <s-form-item label="活动备注内容" v-model="form.remark"  />
        </s-form>
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
        <s-form label-position="top" ref="labelTop">
          <s-form-item label="活动名称" v-model="form.name"  />
          <s-form-item label="活动备注内容" v-model="form.remark"  />
        </s-form>
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
        <s-form label-position="left" ref="labelLeft">
          <s-form-item label="活动名称" v-model="form.name"  />
          <s-form-item label="活动备注内容" v-model="form.remark"  />
        </s-form>
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
        <s-form size="mini">
          <s-form-item label="活动名称" v-model="form.name"  />
        </s-form>
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
        <s-form ref="formRef">
          <s-form-item label="活动名称" v-model="form.name" :rules="{
            required: true,
            message: '请输入活动名称',
            trigger: 'change',
            min: 3,
            max: 6
          }"/>
        </s-form>
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
        <s-form ref="formRef" :model="form" :rules="rules">
          <s-form-item label="活动名称" prop="name" v-model="form.name"/>
          <s-form-item label="活动区域" prop="address" v-model="form.address"/>
          <s-form-item label="活动性质" prop="checkbox" v-model="form.type" type="checkbox" :options="withOptions(['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光'])" />
        </s-form>
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

})
