import Vue, { h } from 'vue'
import VueRouter, { type RouteConfig } from 'vue-router';
import Layout from 'docs/layout/index.vue'
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/docs',
    // children: [
    //   {
    //     path: 'test',
    //     name: 'Test',
    //     component: () => import('docs/pages/test.vue')
    //   }
    // ]
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Layout,
    redirect: '/docs/quick-start',
    children: [
      {
        path: 'quick-start',
        name: 'DocsQuickStart',
        component: () => import('docs/pages/docs/quick-start.md')
      }
    ]
  },
  {
    path: '/components',
    name: 'Components',
    component: Layout,
    redirect: '/components/hello-world',
    children: [
      {
        path: 'form',
        name: 'ComponentsForm',
        component: () => import('docs/pages/components/form.md')
      },
      {
        path: 'formulate',
        name: 'ComponentsFormulate',
        component: () => import('docs/pages/components/formulate.md')
      }
    ]
  }
]

const router = new VueRouter({
  base: import.meta.env.BASE_URL,
  routes
})

export default router