import { createRouter, createWebHistory } from 'vue-router'
import { setMeta } from '../composables/useMeta'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    noindex?: boolean
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
      path: '/media',
      component: () => import('../views/MediaView.vue'),
      meta: {
        title: 'In the Media | Ratha Global',
        description:
          'Interviews and commentary by Dilip Ratha on remittances, migration, and development finance, including BBC World Service, Bloomberg, and The Daily Star.',
      },
    },
    {
      path: '/subscribe',
      component: () => import('../views/SubscribeView.vue'),
      meta: {
        title: 'Subscribe: Global Remittances Report & Database | Ratha Global',
        description:
          'Access tiers for the Global Remittances Report and Database: country time series for about 200 countries and a bilateral matrix of more than 10,600 remittance corridors.',
      },
    },
    {
      path: '/blog/:slug',
      component: () => import('../views/BlogPost.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
      meta: {
        title: '404 - Page Not Found | Ratha Global',
        description: "The page you're looking for doesn't exist or may have been moved.",
        noindex: true,
      },
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
    setMeta({
      title: to.meta.title,
      description: to.meta.description,
      path: to.path,
      noindex: to.meta.noindex,
    })
  }
})

export default router
