import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from 'examples/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  { path: '/', redirect: '/home' },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('examples/views/home'),
        name: 'home'
      },
      {
        path: '/quickstart',
        component: () => import('examples/views/quickstart'),
        name: 'quickstart'
      },
      // 业务组件
      // 表单组件
      {
        path: '/vform',
        component: () => import('examples/views/vform'),
        name: 'vform'
      },
      // 展示组件
      {
        path: '/vbadge',
        component: () => import('examples/views/vbadge'),
        name: 'vbadge'
      },
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
