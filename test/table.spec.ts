import { createLocalVue, mount } from "@vue/test-utils"
import { rowCallbackParams } from "element-ui/types/table";
import ElementPart from '../src/index'

const localVue = createLocalVue()
localVue.use(ElementPart)

const testDataArr: any[] = [];
const toArray = (obj: any) => {
  return Array.from(obj) as any[]
}

const getTestData = function() {
  return [
    { id: 1, name: 'Toy Story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
    { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
    { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ];
};

const getTestColumns = () => [
  { prop: 'id' },
  { prop: 'name', label: '片名' },
  { prop: 'release', label: '发行日期' },
  { prop: 'director', label: '导演' },
  { prop: 'runtime', label: '时长（分）' },
]

getTestData().forEach((cur: { [key: string]: string | number }) => {
  Object.keys(cur).forEach(prop => {
    testDataArr.push(cur[prop].toString());
  });
});

describe('table', () => {
  describe('rendering data is correct', () => {
    const tableDemo = {
      template: `
        <e-table :data="testData" :columns="columns" />
      `,
      data() {
        return {
          testData: getTestData(),
          columns: getTestColumns()
        }
      }
    }

    const wrapper = mount(tableDemo, { localVue })
    wrapper.vm.$nextTick(() => {})
    it('head', () => {
      const ths = toArray(wrapper.vm.$el.querySelectorAll('thead th'));
      expect(ths.map((node: Node) => node.textContent).filter(o => o)).toEqual(['片名', '发行日期', '导演', '时长（分）'])
    })

    it('row length', () => {
      expect(wrapper.vm.$el.querySelectorAll('.el-table__body-wrapper tbody tr')).toHaveLength(getTestData().length);
    })

    it('row data', () => {
      const cells = toArray(wrapper.vm.$el.querySelectorAll('td .cell')).map((node: Node) => node.textContent);
      expect(cells).toEqual(testDataArr);
      wrapper.destroy()
    })
  })

  describe('attributes', () => {
    const createTable = function(props: string, opts?: { [key: string]: any }) {
      return Object.assign({
        template: `
          <e-table :data="testData" :columns="columns" ${props}></e-table>
        `,

        data() {
          return {
            testData: getTestData(),
            columns: getTestColumns()
          }
        }
      }, opts)
    };

    it('height', async () => {
      const wrapper = mount(createTable('height="134"'), { localVue })
      await wrapper.vm.$nextTick(() => {})
      expect(wrapper.vm.$el.style.height).toEqual('134px');
      wrapper.destroy()
    });

    it('height as string', async () => {
      const wrapper = mount(createTable('height="100px"'), { localVue })
      await wrapper.vm.$nextTick(() => {})
      expect(wrapper.vm.$el.style.height).toEqual('100px');
      wrapper.destroy()
    });

    it('maxHeight', async () => {
      const wrapper = mount(createTable('max-height="134"'), { localVue })
      await wrapper.vm.$nextTick(() => {})
      expect(wrapper.vm.$el.style.maxHeight).toEqual('134px');
      wrapper.destroy()
    });

    it('stripe', () => {
      const wrapper = mount(createTable('stripe'), { localVue })
      expect(wrapper.find('.el-table--striped').exists()).toBeTruthy()
      wrapper.destroy()
    });

    it('border', () => {
      const wrapper = mount(createTable('border'), { localVue })
      expect(wrapper.find('.el-table--border').exists()).toBeTruthy()
      wrapper.destroy()
    });

    it('fit', () => {
      const wrapper = mount(createTable(':fit="false"'), { localVue })
      expect(wrapper.find('.el-table--fit').exists()).toBeFalsy()
      wrapper.destroy()
    });

    it('show-header', () => {
      const wrapper = mount(createTable(':show-header="false"'), { localVue })
      expect(wrapper.findAll('.el-table__header-wrapper')).toHaveLength(0)
      wrapper.destroy()
    });

    it('tableRowClassName', () => {
      const wrapper = mount(createTable(':row-class-name="tableRowClassName"', {
        methods: {
          tableRowClassName(options: { row: rowCallbackParams, rowIndex: number} ) {
            const { rowIndex } = options
            if (rowIndex === 1) {
              return 'info-row';
            } else if (rowIndex === 3) {
              return 'positive-row';
            }

            return '';
          }
        }
      }), { localVue })
      expect(wrapper.findAll('.info-row')).toHaveLength(1)
      expect(wrapper.findAll('.positive-row')).toHaveLength(1)
      wrapper.destroy()
    });

    it('tableRowStyle[Object]', () => {
      const wrapper = mount(createTable(':row-style="{ height: \'60px\' }"'), { localVue })
      expect((wrapper.find('.el-table__body tr').element as HTMLTableRowElement).style.height).toBe('60px')
      wrapper.destroy()
    });

    it.skip('tableRowStyle[Function]', async () => {
      const wrapper = mount(createTable(':row-style="tableRowStyle"', {
        methods: {
          tableRowStyle(options: { row: rowCallbackParams, rowIndex: number} ) {
            const { rowIndex } = options
            if (rowIndex === 1) {
              return { height: '60px', display: 'none' };
            }

            return null;
          }
        }
      }))

      // await wrapper.vm.$nextTick(() => {})
      setTimeout(() => {
        const child1 = wrapper.find('.el-table__body tr:nth-child(1)').element as HTMLTableRowElement
        const child2 = wrapper.find('.el-table__body tr:nth-child(2)').element as HTMLTableRowElement
        expect(child1.style.height).toBe('')
        expect(child1.style.display).toBe('')
        expect(child2.style.height).toBe('60px')
        expect(child2.style.display).toBe('none')
      }, 10)
    });

    // it('current-row-key', done => {
    //   const vm = createVue({
    //     template: `
    //     <el-table :data="testData" row-key="id" highlight-current-row :current-row-key="currentRowKey">
    //       <el-table-column prop="name" label="片名" />
    //       <el-table-column prop="release" label="发行日期" />
    //       <el-table-column prop="director" label="导演" />
    //       <el-table-column prop="runtime" label="时长（分）" />
    //     </el-table>
    //   `,

    //     created() {
    //       this.testData = getTestData();
    //     },

    //     data() {
    //       return { currentRowKey: null };
    //     }
    //   }, true);
    //   setTimeout(_ => {
    //     vm.currentRowKey = 1;
    //     const tr = vm.$el.querySelector('.el-table__body-wrapper tbody tr');
    //     setTimeout(_ => {
    //       expect(tr.classList.contains('current-row')).to.be.true;
    //       vm.currentRowKey = 2;

    //       const rows = vm.$el.querySelectorAll('.el-table__body-wrapper tbody tr');
    //       setTimeout(_ => {
    //         expect(tr.classList.contains('current-row')).to.be.false;
    //         expect(rows[1].classList.contains('current-row')).to.be.true;
    //         destroyVM(vm);
    //         done();
    //       }, DELAY);
    //     }, DELAY);
    //   }, DELAY);
    // });

    // it('select-on-indeterminate', done => {
    //   const vm = createVue({
    //     template: `
    //       <el-table :data="testData" @selection-change="change" :select-on-indeterminate="false" ref="table">
    //         <el-table-column type="selection" />
    //         <el-table-column prop="name" label="name" />
    //         <el-table-column prop="release" label="release" />
    //         <el-table-column prop="director" label="director" />
    //         <el-table-column prop="runtime" label="runtime" />
    //       </el-table>
    //     `,

    //     created() {
    //       this.testData = getTestData();
    //     },

    //     mounted() {
    //       this.$refs.table.toggleRowSelection(this.testData[0]);
    //     },

    //     data() {
    //       return { selected: [] };
    //     },

    //     methods: {
    //       change(val) {
    //         this.selected = val;
    //       }
    //     }
    //   }, true);

    //   setTimeout(_ => {
    //     vm.$el.querySelector('.el-checkbox').click();
    //     setTimeout(_ => {
    //       expect(vm.selected).to.length(0);
    //       destroyVM(vm);
    //       done();
    //     }, DELAY);
    //   }, DELAY);
    // });
  });
})