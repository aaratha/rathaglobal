import { createRouter, createWebHistory } from 'vue-router'
import { setMeta } from '../composables/useMeta'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Ratha Global | Remittances & Development Finance Advisory',
        description:
          'Ratha Global provides advisory and analytical services on remittances, cross-border payments, diaspora bonds, sovereign ratings, structured finance, and investment risk guarantees.',
      },
    },
    {
      path: '/blog',
      component: () => import('../views/BlogIndex.vue'),
      meta: {
        title: 'Publications | Ratha Global',
        description:
          'Briefs, reports, and blog posts on remittances, diaspora finance, sovereign ratings, and global development from Ratha Global.',
      },
    },
    {
      path: '/blog/:slug',
      component: () => import('../views/BlogPost.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta.title && to.meta.description) {
    setMeta({ title: to.meta.title, description: to.meta.description, path: to.path })
  }
})

export default router
