<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth, type OAuthProvider } from '../composables/useAuth'

const router = useRouter()
const { signUp, signInWithOAuth } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)
const confirmationSent = ref(false)
const oauthPending = ref<OAuthProvider | null>(null)

async function onSubmit() {
  error.value = ''
  submitting.value = true
  try {
    const data = await signUp(email.value, password.value)
    if (data.session) {
      router.push('/account')
    } else {
      confirmationSent.value = true
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Could not create account.'
  } finally {
    submitting.value = false
  }
}

async function onOAuth(provider: OAuthProvider) {
  error.value = ''
  oauthPending.value = provider
  try {
    await signInWithOAuth(provider, '/account')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Could not create account.'
    oauthPending.value = null
  }
}
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="signup-title">
      <div class="content-container">
        <p class="eyebrow">Account</p>
        <h1 id="signup-title">Create an account</h1>

        <template v-if="confirmationSent">
          <p>
            Check <strong>{{ email }}</strong> for a confirmation link to finish creating your
            account.
          </p>
        </template>

        <template v-else>
          <div class="oauth-buttons">
            <button
              type="button"
              class="button oauth-button"
              :disabled="oauthPending !== null"
              @click="onOAuth('google')"
            >
              {{ oauthPending === 'google' ? 'Redirecting…' : 'Continue with Google' }}
            </button>
            <button
              type="button"
              class="button oauth-button"
              :disabled="oauthPending !== null"
              @click="onOAuth('azure')"
            >
              {{ oauthPending === 'azure' ? 'Redirecting…' : 'Continue with Microsoft' }}
            </button>
          </div>

          <p class="auth-divider"><span>or</span></p>

          <form class="auth-form" @submit.prevent="onSubmit">
            <label for="signup-email">Email</label>
            <input id="signup-email" v-model="email" type="email" required autocomplete="email" />

            <label for="signup-password">Password</label>
            <input
              id="signup-password"
              v-model="password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
            />

            <p v-if="error" class="form-error" role="alert">{{ error }}</p>

            <button type="submit" class="button auth-submit" :disabled="submitting">
              {{ submitting ? 'Creating account…' : 'Create account' }}
            </button>
          </form>

          <p class="auth-switch">
            Already have an account? <RouterLink to="/login">Log in</RouterLink>
          </p>
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

#signup-title {
  margin-bottom: 1.5rem;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.oauth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auth-divider {
  position: relative;
  margin: 1.5rem 0;
  text-align: center;
  color: var(--color-moss);
  font-size: 0.85rem;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

.auth-divider span {
  position: relative;
  padding: 0 0.75rem;
  background: var(--color-paper);
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
