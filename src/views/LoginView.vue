<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

async function onSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await signIn(email.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/account'
    router.push(redirect)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Could not log in.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="login-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="login-title">Log in</h1>

        <form class="auth-form" @submit.prevent="onSubmit">
          <label for="login-email">Email</label>
          <input id="login-email" v-model="email" type="email" required autocomplete="email" />

          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
          />

          <p v-if="error" class="form-error" role="alert">{{ error }}</p>

          <button type="submit" class="button auth-submit" :disabled="submitting">
            {{ submitting ? 'Logging in…' : 'Log in' }}
          </button>
        </form>

        <p class="auth-switch">
          Don't have an account? <RouterLink to="/signup">Create one</RouterLink>
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
  max-width: 28rem;
  margin: 0 auto;
}

#login-title {
  margin-bottom: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.auth-form label {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-moss);
}

.auth-form input {
  padding: 0.6rem 0.75rem;
  border: 1px solid rgba(168, 137, 88, 0.35);
  border-radius: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  font: inherit;
}

.auth-form input:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 1px;
}

.auth-submit {
  margin-top: 1.25rem;
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.auth-submit:hover,
.auth-submit:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
}

.auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.form-error {
  margin: 0.75rem 0 0;
  color: var(--color-terracotta);
  font-size: 0.9rem;
}

.auth-switch {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}
</style>
