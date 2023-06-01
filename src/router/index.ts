import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import FinancialReport from '../components/FinancialReport.vue'
import Moat from '../components/Moat.vue'
import Risk from '../components/Risk.vue'
import Instructions from '../components/Instructions.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/report',
    name: 'report',
    component: FinancialReport
  },
  {
    path: '/moat',
    name: 'moat',
    component: Moat
  },
  {
    path: '/risk',
    name: 'risk',
    component: Risk
  },
  {
    path: '/instructions',
    name: 'instructions',
    component: Instructions
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
