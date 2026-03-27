<!-- src/views/ForgotPasswordView.vue -->
<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-logo">⬡</span>
        <h1 class="auth-title">Recuperar contraseña</h1>
        <p class="auth-sub">Te enviaremos un enlace a tu correo</p>
      </div>

      <div v-if="sent" class="success-box">
        ✅ Correo enviado. Revisa tu bandeja de entrada y sigue el enlace para crear una nueva contraseña.
      </div>

      <form v-else class="auth-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Correo electrónico</label>
          <input v-model="email" type="email" required />
        </div>

        <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Enviando...' : 'Enviar enlace' }}
        </button>
      </form>

      <p class="auth-toggle">
        <router-link to="/login">← Volver al inicio de sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { resetPassword, loading } = useAuth()

const email = ref('')
const errorMsg = ref('')
const sent = ref(false)

async function handleSubmit() {
  errorMsg.value = ''
  try {
    await resetPassword(email.value)
    sent.value = true
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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

.success-box {
  background: rgba(111, 207, 151, 0.08);
  border: 1px solid rgba(111, 207, 151, 0.25);
  border-radius: 10px;
  padding: 1rem;
  color: #6fcf97;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
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
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.auth-toggle a {
  color: #c8a96e;
  text-decoration: underline;
}
</style>