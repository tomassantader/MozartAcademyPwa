<script setup>
defineProps({
  modelValue: Boolean,
  title: String,
  message: String
})

defineEmits(['update:modelValue', 'confirm'])
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section>{{ message }}</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="$emit('update:modelValue', false)" />
        <q-btn color="negative" label="Eliminar" @click="$emit('confirm')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
