<template>
  <q-dialog v-model="modelValue" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="text-h6">
        Crear usuario
      </q-card-section>

      <q-card-section>
        <q-input v-model="form.email" label="Email" dense />
        <q-input v-model="form.password" label="Password" type="password" dense />
        <q-select
          v-model="form.roleId"
          :options="roles"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          label="Rol"
          dense
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn
          label="Guardar"
          color="primary"
          :loading="loading"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { createUser } from 'src/services/user.service'
import { useNotify } from 'src/utils/notify'

const emit = defineEmits(['update:modelValue', 'saved'])

const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  roleId: null
})

const roles = [
  { label: 'User', value: 1 },
  { label: 'Admin', value: 2 }
]

const { success, error } = useNotify()

const submit = async () => {
  loading.value = true
  try {
    await createUser(form.value)
    success('Usuario creado correctamente')
    emit('saved')
    emit('update:modelValue', false)
  } catch (err) {
    error(err.response?.data?.message || 'Error al crear usuario')
  } finally {
    loading.value = false
  }
}
</script>
