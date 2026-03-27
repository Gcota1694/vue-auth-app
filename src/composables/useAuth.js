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

    // Bloquear login si el correo no está confirmado
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut()
      user.value = null
      throw new Error('Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.')
    }

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

    // No iniciar sesión automáticamente, esperar confirmación
    user.value = null
    return { needsConfirmation: true }
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }

  async function resetPassword(email) {
    loading.value = true
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${window.location.pathname}#/reset-password`,
    })
    loading.value = false
    if (error) throw new Error(error.message)
  }

  async function updatePassword(newPassword) {
    loading.value = true
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    loading.value = false
    if (error) throw new Error(error.message)
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
  }
}