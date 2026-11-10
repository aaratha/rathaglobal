<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

interface PurchaseRow {
  id: string
  purchased_at: string
  products: { name: string; slug: string } | null
}

const { user } = useAuth()
const purchases = ref<PurchaseRow[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!user.value) return
  const { data, error: queryError } = await supabase
    .from('purchases')
    .select('id, purchased_at, products ( name, slug )')
    .eq('user_id', user.value.id)
    .order('purchased_at', { ascending: false })

  if (queryError) {
    error.value = queryError.message
  } else {
    purchases.value = (data ?? []) as unknown as PurchaseRow[]
  }
  loading.value = false
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="purchases-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="purchases-title">Purchase history</h1>

        <p v-if="loading">Loading…</p>
        <p v-else-if="error" class="form-error" role="alert">{{ error }}</p>
        <p v-else-if="purchases.length === 0">
          You haven't purchased anything yet. <RouterLink to="/products">Browse products</RouterLink>.
        </p>
        <ul v-else class="purchase-list">
          <li v-for="purchase in purchases" :key="purchase.id">
            <span class="purchase-name">{{ purchase.products?.name ?? 'Unknown product' }}</span>
            <span class="purchase-date">{{ formatDate(purchase.purchased_at) }}</span>
          </li>
        </ul>
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

#purchases-title {
  margin-bottom: 1.5rem;
}

.purchase-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.purchase-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(168, 137, 88, 0.35);
}

.purchase-name {
  color: var(--color-indigo);
}

.purchase-date {
  color: var(--color-moss);
  font-size: 0.9rem;
  white-space: nowrap;
}

.form-error {
  color: var(--color-terracotta);
}
</style>
