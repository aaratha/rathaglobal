import { createRouter, createWebHistory } from 'vue-router'
import { setMeta } from '../composables/useMeta'
import { useAuth } from '../composables/useAuth'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    noindex?: boolean
    requiresAuth?: boolean
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
        title: 'Global Remittances Report & Database | Ratha Global',
        description:
          'An independent, biannual account of remittance flows worldwide: coverage, the underlying database, methodology, release schedule, and access tiers for the Global Remittances Report.',
      },
    },
    {
      path: '/blog/:slug',
      component: () => import('../views/BlogPost.vue'),
    },
    {
      path: '/solutions/:slug',
      component: () => import('../views/SolutionView.vue'),
    },
    {
      path: '/products',
      component: () => import('../views/ProductsView.vue'),
      meta: {
        title: 'Products | Ratha Global',
        description:
          'Reports and data products from Ratha Global, including the Global Remittances Report and Database.',
      },
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Log in | Ratha Global',
        description: 'Log in to your Ratha Global account.',
        noindex: true,
      },
    },
    {
      path: '/signup',
      component: () => import('../views/SignupView.vue'),
      meta: {
        title: 'Create an account | Ratha Global',
        description: 'Create a Ratha Global account to purchase and access reports and data.',
        noindex: true,
      },
    },
    {
      path: '/account',
      component: () => import('../views/AccountView.vue'),
      meta: {
        title: 'Account | Ratha Global',
        description: 'Manage your Ratha Global account.',
        noindex: true,
        requiresAuth: true,
      },
    },
    {
      path: '/account/purchases',
      component: () => import('../views/PurchaseHistoryView.vue'),
      meta: {
        title: 'Purchase history | Ratha Global',
        description: 'Your Ratha Global purchase history.',
        noindex: true,
        requiresAuth: true,
      },
    },
    {
      path: '/account/owned',
      component: () => import('../views/OwnedProductsView.vue'),
      meta: {
        title: 'Your products | Ratha Global',
        description: 'Reports and data you own, ready to access.',
        noindex: true,
        requiresAuth: true,
      },
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

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const { ready, user } = useAuth()
  await ready
  if (user.value) return true

  return { path: '/login', query: { redirect: to.fullPath } }
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
