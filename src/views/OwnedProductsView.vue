<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

interface OwnedProduct {
  id: string
  name: string
  description: string | null
  content_url: string | null
}

const { user } = useAuth()
const products = ref<OwnedProduct[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!user.value) return
  const { data, error: queryError } = await supabase
    .from('purchases')
    .select('products ( id, name, description, content_url )')
    .eq('user_id', user.value.id)

  if (queryError) {
    error.value = queryError.message
  } else {
    products.value = ((data ?? []) as unknown as { products: OwnedProduct | null }[])
      .map((row) => row.products)
      .filter((product): product is OwnedProduct => product !== null)
  }
  loading.value = false
})

function contactMailto(name: string) {
  const subject = `Access request – ${name}`
  return `mailto:contact@rathaglobal.com?subject=${encodeURIComponent(subject)}`
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="owned-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="owned-title">Your products</h1>

        <p v-if="loading">Loading…</p>
        <p v-else-if="error" class="form-error" role="alert">{{ error }}</p>
        <p v-else-if="products.length === 0">
          You don't own any products yet. <RouterLink to="/products">Browse products</RouterLink>.
        </p>
        <div v-else class="owned-list">
          <div v-for="product in products" :key="product.id" class="owned-product">
            <h2 class="owned-product-name">{{ product.name }}</h2>
            <p v-if="product.description">{{ product.description }}</p>
            <a
              v-if="product.content_url"
              class="button owned-product-access"
              :href="product.content_url"
              target="_blank"
              rel="noopener"
              >Open</a
            >
            <a v-else class="button owned-product-access" :href="contactMailto(product.name)"
              >Contact us for access</a
            >
          </div>
        </div>
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
  max-width: 40rem;
  margin: 0 auto;
}

#owned-title {
  margin-bottom: 1.5rem;
}

.owned-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.owned-product {
  padding: 1.25rem;
  border: 1px solid rgba(168, 137, 88, 0.35);
}

.owned-product-name {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.owned-product-name::after {
  display: none;
}

.owned-product-access {
  margin-top: 0.75rem;
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.owned-product-access:hover,
.owned-product-access:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
}

.form-error {
  color: var(--color-terracotta);
}
</style>
