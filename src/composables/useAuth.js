// src/composables/useAuth.js
import { ref } from 'vue'
import { supabase } from '@/supabase'

const user = ref(null)
const loading = ref(false)

// Cargar sesión al iniciar
supabase.auth.getSession().then(({ data }) => {
  user.value = data.session?.user ?? null
})

// Escuchar cambios de sesión
supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user ?? null
})

export function useAuth() {
  async function login(email, password) {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false
    if (error) throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.')
    user.value = data.user
  }

  async function register(email, password, nombre, apellido) {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellido,
          full_name: `${nombre} ${apellido}`
        }
      }
    })
    loading.value = false
    if (error) throw new Error(error.message)
    user.value = data.user
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
  }
}