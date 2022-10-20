import { createRouter, createWebHistory } from 'vue-router'
import timer from "@/pages/timer";
import teams from "@/pages/statistics-page";
import chose_team from "@/pages/menu";

const routes = [
  {
    path: '/menu',
    name: 'menu',
    component: chose_team
  },
  {
    path: '/',
    name: 'timer',
    component: timer
  },
  {
    path: '/menu/:id',
    name: 'teams',
    component: teams
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
