import { createRouter, createWebHistory } from 'vue-router'
import timer from "@/components/timer";
import teams from "@/components/teams";
import choseteam from "@/components/choseteam";

const routes = [
  {
    path: '/menu',
    name: 'menu',
    component: choseteam
  },
  {
    path: '/',
    name: 'timer',
    component: timer
  },
  {
    path: '/menu/:id',
    name: 'build',
    component: teams
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
