import { ref } from 'vue'
import { supabase } from '@/supabase'

const user = ref(null)
const isAuthenticated = ref(false)
const loading = ref(false)
const error = ref(null)

supabase.auth.getSession().then(({ data }) => {
  user.value = data.session?.user ?? null
  isAuthenticated.value = !!data.session
})

supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user ?? null
  isAuthenticated.value = !!session
})

export function useAuth() {
  async function login(email, password) {
    loading.value = true
    error.value = null

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      loading.value = false
      throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.')
    }

    user.value = data.user
    isAuthenticated.value = true
    loading.value = false
  }

  async function register(email, password) {
    loading.value = true
    error.value = null

    const { data, error: authError } = await supabase.auth.signUp({ email, password })

    if (authError) {
      loading.value = false
      throw new Error(authError.message)
    }

    user.value = data.user
    isAuthenticated.value = true
    loading.value = false
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  }
}