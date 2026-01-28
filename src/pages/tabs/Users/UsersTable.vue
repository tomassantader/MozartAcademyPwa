<script setup>
defineProps({
  users: Array,
  loading: Boolean
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <q-table
    :rows="users"
    :columns="[
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'role', label: 'Rol', field: 'role' },
      { name: 'actions', label: 'Acciones', field: 'actions' }
    ]"
    row-key="id"
    :loading="loading"
  >
    <template #body-cell-actions="props">
      <q-btn flat icon="edit" color="primary" @click="$emit('edit', props.row)" />
      <q-btn flat icon="delete" color="negative" @click="$emit('delete', props.row)" />
    </template>
  </q-table>
</template>
