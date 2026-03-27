<template>
  <div class="auth-wrapper">
    <div class="auth-card">

      <!-- MENSAJE DE CONFIRMACIÓN TRAS REGISTRO -->
      <div v-if="confirmationSent" class="success-box">
        <span class="success-icon">📧</span>
        <h2 class="success-title">Revisa tu correo</h2>
        <p class="success-msg">
          Te enviamos un enlace de confirmación a <strong>{{ emailSent }}</strong>.
          Confirma tu cuenta para poder iniciar sesión.
        </p>
        <button class="btn-submit" @click="confirmationSent = false">
          Volver al inicio de sesión
        </button>
      </div>

      <template v-else>
        <div class="auth-header">
          <span class="auth-logo">⬡</span>
          <h1 class="auth-title">{{ isLogin ? 'Iniciar sesión' : 'Crear cuenta' }}</h1>
          <p class="auth-sub">{{ isLogin ? 'Bienvenido de nuevo' : 'Regístrate para continuar' }}</p>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit">

          <div v-if="!isLogin" class="form-row">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="nombre" type="text" required />
            </div>
            <div class="form-group">
              <label>Apellido</label>
              <input v-model="apellido" type="text" required />
            </div>
          </div>

          <div class="form-group">
            <label>Correo electrónico</label>
            <input v-model="email" type="email" required />
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input v-model="password" type="password" required />
          </div>

          <div v-if="isLogin" class="forgot-link">
            <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
          </div>

          <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? 'Cargando...' : isLogin ? 'Entrar' : 'Registrarse' }}
          </button>
        </form>

        <p class="auth-toggle">
          {{ isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
          <button @click="toggleMode">{{ isLogin ? 'Regístrate' : 'Inicia sesión' }}</button>
        </p>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login, register, loading } = useAuth()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const nombre = ref('')
const apellido = ref('')
const errorMsg = ref('')
const confirmationSent = ref(false)
const emailSent = ref('')

function toggleMode() {
  isLogin.value = !isLogin.value
  errorMsg.value = ''
}

async function handleSubmit() {
  errorMsg.value = ''
  try {
    if (isLogin.value) {
      await login(email.value, password.value)
      router.push('/dashboard')
    } else {
      await register(email.value, password.value, nombre.value, apellido.value)
      emailSent.value = email.value
      confirmationSent.value = true
    }
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(22, 22, 26, 0.9);
  border: 1px solid rgba(200, 169, 110, 0.15);
  border-radius: 20px;
  padding: 2.5rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  font-size: 2rem;
  color: #c8a96e;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e8e4dc;
  margin: 0.5rem 0 0.25rem;
}

.auth-sub {
  color: #5a5550;
  font-size: 0.875rem;
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.form-group label {
  font-size: 0.82rem;
  color: #8a8480;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #e8e4dc;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: rgba(200, 169, 110, 0.4);
}

.forgot-link {
  text-align: right;
  margin-top: -0.4rem;
}

.forgot-link a {
  font-size: 0.82rem;
  color: #c8a96e;
  text-decoration: underline;
}

.auth-error {
  color: #e07070;
  font-size: 0.85rem;
  margin: 0;
}

.btn-submit {
  padding: 0.75rem;
  background: linear-gradient(135deg, #c8a96e, #e8d5a3);
  border: none;
  border-radius: 10px;
  color: #1a1a1e;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  margin-top: 0.5rem;
  width: 100%;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-toggle {
  text-align: center;
  font-size: 0.85rem;
  color: #5a5550;
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.auth-toggle button {
  background: none;
  border: none;
  color: #c8a96e;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
  margin-left: 0.3rem;
  text-decoration: underline;
}

/* ── CONFIRMACIÓN ── */
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.success-icon {
  font-size: 3rem;
}

.success-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #e8e4dc;
  margin: 0;
}

.success-msg {
  color: #8a8480;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.success-msg strong {
  color: #c8a96e;
}
</style>