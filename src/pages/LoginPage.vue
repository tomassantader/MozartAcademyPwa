<template>
  <q-card class="q-pa-lg login-card">
    <q-card-section class="text-center">
      <div class="text-h5 text-weight-bold">
        Mozart Academy
      </div>
      <div class="text-subtitle2 text-grey">
        Iniciar sesión
      </div>
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="email"
        label="Email"
        type="email"
        :disable="loading"
        filled
        dense
        class="q-mb-md"
      />

      <q-input
        v-model="password"
        label="Contraseña"
        type="password"
        :disable="loading"
        @keyup.enter="login"
        filled
        dense
      />
    </q-card-section>

    <q-card-section>
      <q-btn
        label="Ingresar"
        color="primary"
        class="full-width"
        :loading="loading"
        @click="login"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { login as loginService } from 'src/services/auth.service'
import { useNotify } from 'src/utils/notify'

const { notifyError, notifyWarning } = useNotify()

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    notifyWarning('Completa email y contraseña')
    return
  }

  loading.value = true

  try {
    const response = await loginService(email.value, password.value)

    authStore.login(
      {
        id: response.id,
        email: response.email,
        role: response.role
      },
      response.token
    )

    router.push('/app')
  } catch (error) {
    let message = 'Error al iniciar sesión'

    if (error.response?.status === 401) {
      message = 'Credenciales inválidas'
    } else if (error.response?.status === 403) {
      message = 'Usuario inactivo'
    }

    notifyError(message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-card {
  width: 100%;
  max-width: 360px;
}
</style>
