<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

interface Product {
  id: string
  name: string
  description: string | null
}

const { user } = useAuth()
const products = ref<Product[]>([])
const ownedIds = ref<Set<string>>(new Set())
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  const { data, error: queryError } = await supabase
    .from('products')
    .select('id, name, description')
    .order('name')

  if (queryError) {
    error.value = queryError.message
  } else {
    products.value = data ?? []
  }

  if (user.value) {
    const { data: owned } = await supabase
      .from('purchases')
      .select('product_id')
      .eq('user_id', user.value.id)
    ownedIds.value = new Set((owned ?? []).map((row) => row.product_id))
  }

  loading.value = false
})

function isOwned(productId: string) {
  return ownedIds.value.has(productId)
}

function purchaseMailto(name: string) {
  const subject = `Purchase inquiry – ${name}`
  const body = `Hi Ratha Global team,\n\nI'd like to purchase ${name}. Could you send pricing and next steps?\n\nThanks,`
  return `mailto:contact@rathaglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const loggedIn = computed(() => Boolean(user.value))
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="products-title">
      <div class="content-container">
        <p class="eyebrow">Products</p>
        <h1 id="products-title">Reports &amp; data</h1>
        <p>
          Purchase access to Ratha Global's reports and data. See the
          <RouterLink to="/subscribe">Global Remittances Report &amp; Database</RouterLink>
          page for full pricing tiers and details.
        </p>

        <p v-if="loading">Loading…</p>
        <p v-else-if="error" class="form-error" role="alert">{{ error }}</p>
        <p v-else-if="products.length === 0">No products are available right now.</p>
        <div v-else class="product-list">
          <div v-for="product in products" :key="product.id" class="product-card">
            <h2 class="product-name">{{ product.name }}</h2>
            <p v-if="product.description">{{ product.description }}</p>

            <RouterLink v-if="isOwned(product.id)" to="/account/owned" class="button product-cta">
              You own this — view
            </RouterLink>
            <a v-else class="button product-cta" :href="purchaseMailto(product.name)">Purchase</a>
          </div>
        </div>

        <p v-if="!loading && !loggedIn" class="products-note">
          <RouterLink to="/login">Log in</RouterLink> or
          <RouterLink to="/signup">create an account</RouterLink>
          to track your purchases and access owned reports and data.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
section {
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
}

.content-container {
  max-width: 48rem;
  margin: 0 auto;
}

#products-title {
  margin-bottom: 1.5rem;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.product-card {
  padding: 1.25rem;
  border: 1px solid rgba(168, 137, 88, 0.35);
}

.product-name {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.product-name::after {
  display: none;
}

.product-cta {
  margin-top: 0.75rem;
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.product-cta:hover,
.product-cta:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
}

.products-note {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--color-moss);
}

.form-error {
  color: var(--color-terracotta);
}
</style>
