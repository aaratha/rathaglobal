<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { ready, user, updatePassword } = useAuth()

const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const submitting = ref(false)
const done = ref(false)
// Starts true so the form doesn't flash before `ready` resolves - the
// reset-link's recovery session is only picked up once that promise settles.
const checkingLink = ref(true)

onMounted(async () => {
  await ready
  checkingLink.value = false
})

async function onSubmit() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match."
    return
  }
  submitting.value = true
  try {
    await updatePassword(password.value)
    done.value = true
    setTimeout(() => router.push('/account'), 1500)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Could not reset password.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="reset-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="reset-title">Set a new password</h1>

        <p v-if="checkingLink">Checking your reset link…</p>

        <template v-else-if="!user">
          <p>
            This reset link is invalid or has expired.
            <RouterLink to="/forgot-password">Request a new one</RouterLink>.
          </p>
        </template>

        <template v-else-if="done">
          <p>Your password has been updated. Taking you to your account…</p>
        </template>

        <template v-else>
          <form class="auth-form" @submit.prevent="onSubmit">
            <label for="reset-password">New password</label>
            <input
              id="reset-password"
              v-model="password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
            />

            <label for="reset-confirm">Confirm password</label>
            <input
              id="reset-confirm"
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
            />

            <p v-if="error" class="form-error" role="alert">{{ error }}</p>

            <button type="submit" class="button auth-submit" :disabled="submitting">
              {{ submitting ? 'Updating…' : 'Update password' }}
            </button>
          </form>
        </template>
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

#reset-title {
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
</style>
