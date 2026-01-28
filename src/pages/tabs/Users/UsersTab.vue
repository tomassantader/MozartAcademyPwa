<template>
  <div class="q-pa-md">

    <!-- Header con busqueda + crear -->
    <div class="row items-center q-mb-md">
      <div class="text-h5">Usuarios</div>
      <q-space />
      <q-input
        v-model="filter"
        placeholder="Buscar usuarios"
        dense
        rounded
        clearable
        debounce="300"
        class="q-mr-md"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn
        color="primary"
        icon="add"
        label="Nuevo usuario"
        @click="openCreate"
      />
    </div>

    <!-- Tabla -->
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      flat
      bordered
      square
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-actions="{ row }">
        <q-td align="right">
          <q-btn dense flat icon="edit" color="primary" @click="openEdit(row)" />
          <q-btn dense flat icon="delete" color="negative" @click="confirmDelete(row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Dialogs -->
    <UserFormDialog
      v-model="showForm"
      :user="selectedUser"
      @saved="loadUsers"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="Eliminar usuario"
      message="¿Estás seguro?"
      @confirm="deleteUser"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUsers } from 'src/services/user.service'
import UserFormDialog from './UserFormDialog.vue'
import ConfirmDialog from 'src/components/dialogs/ConfirmDialog.vue'

const users = ref([])
const loading = ref(false)
const filter = ref('')
const pagination = ref({ page: 1, rowsPerPage: 10 })

const columns = [
  { name: 'email', label: 'Email', field: 'email', sortable: true },
  { name: 'role', label: 'Rol', field: 'role', sortable: true },
  { name: 'actions', label: 'Acciones', sortable: false }
]

// dialog state
const showForm = ref(false)
const selectedUser = ref(null)
const showDeleteConfirm = ref(false)
const userToDelete = ref(null)

const loadUsers = async () => {
  users.value = await getUsers()
  loading.value = false
}

onMounted(loadUsers)

const openCreate = () => {
  selectedUser.value = null
  showForm.value = true
}

const openEdit = (row) => {
  selectedUser.value = row
  showForm.value = true
}

const confirmDelete = (row) => {
  userToDelete.value = row
  showDeleteConfirm.value = true
}

const deleteUser = async () => {
  // TODO: API delete
  showDeleteConfirm.value = false
  await loadUsers()
}
</script>
