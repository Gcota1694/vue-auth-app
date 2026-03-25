import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const HomeView      = () => import('@/views/HomeView.vue')
const LoginView     = () => import('@/views/LoginView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const NotFoundView  = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Inicio', requiresAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Iniciar sesión', requiresAuth: false, guestOnly: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard', requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Página no encontrada' },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()

  document.title = `${to.meta.title ?? 'App'} | VueAuth`

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return { name: 'dashboard' }
  }

  return true
})

export default router