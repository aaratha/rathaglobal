<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const { resetPasswordForEmail } = useAuth()

const email = ref('')
const error = ref('')
const submitting = ref(false)
const sent = ref(false)

async function onSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await resetPasswordForEmail(email.value, '/reset-password')
    sent.value = true
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Could not send reset email.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="forgot-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="forgot-title">Reset your password</h1>

        <template v-if="sent">
          <p>
            If an account exists for <strong>{{ email }}</strong
            >, we've sent a link to reset your password.
          </p>
        </template>

        <template v-else>
          <p>Enter your email and we'll send you a link to reset your password.</p>

          <form class="auth-form" @submit.prevent="onSubmit">
            <label for="forgot-email">Email</label>
            <input id="forgot-email" v-model="email" type="email" required autocomplete="email" />

            <p v-if="error" class="form-error" role="alert">{{ error }}</p>

            <button type="submit" class="button auth-submit" :disabled="submitting">
              {{ submitting ? 'Sending…' : 'Send reset link' }}
            </button>
          </form>
        </template>

        <p class="auth-switch">
          <RouterLink to="/login">Back to log in</RouterLink>
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

#forgot-title {
  margin-bottom: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 1.25rem;
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
