import { ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const session = ref<Session | null>(null)
const user = ref<User | null>(null)
// Resolves once the initial session has been read from storage, so the
// router guard can wait for it instead of redirecting on a still-unknown
// auth state.
let readyResolve: () => void
const ready = new Promise<void>((resolve) => {
  readyResolve = resolve
})
let initialized = false

function setSession(next: Session | null) {
  session.value = next
  user.value = next?.user ?? null
}

function init() {
  if (initialized) return
  initialized = true

  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session)
    readyResolve()
  })

  supabase.auth.onAuthStateChange((_event, next) => {
    setSession(next)
  })
}

async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export type OAuthProvider = 'google' | 'azure'

// Redirects to the provider's consent screen and back - there's no
// client-side result to await, since the browser navigates away.
async function signInWithOAuth(provider: OAuthProvider, redirectTo: string) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: new URL(redirectTo, window.location.origin).toString() },
  })
  if (error) throw error
}

init()

export function useAuth() {
  return { session, user, ready, signUp, signIn, signInWithOAuth, signOut }
}
