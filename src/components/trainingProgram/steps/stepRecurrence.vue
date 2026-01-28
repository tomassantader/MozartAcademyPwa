<template>
  <q-select
    v-model="model.frequency"
    :options="['Semalnal', 'Quincenal', 'Mensual']"
    label="Frecuencia"
    filled
  />

  <q-option-group
    v-model="model.daysOfWeek"
    type="checkbox"
    :options="days"
  />
</template>

<script setup>
const model = defineModel()
defineProps({ modelValue: Object })
defineEmits(['update:modelValue'])

const days = [
  { label: 'Lunes', value: 'Mon' },
  { label: 'Martes', value: 'Tue' },
  { label: 'Miércoles', value: 'Wed' },
  { label: 'Jueves', value: 'Thu' },
  { label: 'Viernes', value: 'Fri' },
  { label: 'Sábado', value: 'Sat' },
  { label: 'Domingo', value: 'Sun' }
]
</script>
