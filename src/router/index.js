import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DrugsPage from '../views/DrugsPage.vue'
import ObsPage from '../views/ObsPage.vue'
import TransplantPage from '../views/TransplantPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/drugs',
    name: 'Drugs',
    component: DrugsPage
  },
  {
    path: '/obs',
    name: 'Obs',
    component: ObsPage
  },
  {
    path: '/transplant',
    name: 'Transplant',
    component: TransplantPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
