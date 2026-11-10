<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, signOut } = useAuth()

async function onSignOut() {
  await signOut()
  router.push('/')
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="account-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="account-title">Your account</h1>
        <p v-if="user">Logged in as {{ user.email }}</p>

        <nav class="account-links" aria-label="Account sections">
          <RouterLink to="/account/purchases" class="account-link">
            <span class="account-link-title">Purchase history</span>
            <span class="account-link-desc">Everything you've bought from Ratha Global.</span>
          </RouterLink>
          <RouterLink to="/account/owned" class="account-link">
            <span class="account-link-title">Your products</span>
            <span class="account-link-desc">Access the reports and data you own.</span>
          </RouterLink>
          <RouterLink to="/products" class="account-link">
            <span class="account-link-title">Browse products</span>
            <span class="account-link-desc">See what's available to purchase.</span>
          </RouterLink>
        </nav>

        <button type="button" class="button" @click="onSignOut">Log out</button>
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

#account-title {
  margin-bottom: 0.75rem;
}

.account-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 2rem 0;
}

.account-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(168, 137, 88, 0.35);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease;
}

.account-link:hover,
.account-link:focus-visible {
  border-color: var(--color-terracotta);
  color: inherit;
}

.account-link-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-indigo);
}

.account-link-desc {
  font-size: 0.9rem;
  color: var(--color-moss);
}
</style>
