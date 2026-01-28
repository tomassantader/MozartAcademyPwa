<template>
  <q-select
    v-model="model.levelId"
    label="Nivel"
    filled
    emit-value
    map-options
    :options="levels"
    option-label="label"
    option-value="value"
  />
</template>

<script setup>
const model = defineModel()

defineProps({
  levels: {
    type: Array,
    required: true
  }
})
</script>
