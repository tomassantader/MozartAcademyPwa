<template>
  <router-view />

  <q-dialog persistent v-model="ui.loading">
    <q-card class="q-pa-lg text-center">
      <q-spinner size="40px" />
      <div class="q-mt-md">{{ ui.loadingMessage }}</div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useUiStore } from 'stores/ui'
const ui = useUiStore()
</script>