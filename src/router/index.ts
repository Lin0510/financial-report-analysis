import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/FinancialReportAnalysis.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/report',
    name: 'report',
    component: HomeView
  },
  {
    path: '/moat',
    name: 'moat',
    component: () => import('../views/Moat.vue')
  },
  {
    path: '/risk',
    name: 'risk',
    component: () => import('../views/Risk.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
