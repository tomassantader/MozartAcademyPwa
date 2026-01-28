<template>
  <q-dialog v-model="model">
    <q-card style="min-width: 380px">
      
      <!-- Header -->
      <q-card-section>
        <div class="text-h6">{{ event.title }}</div>
        <div class="text-caption text-grey">
          {{ event.extendedProps.sourceType }}
        </div>
      </q-card-section>

      <q-separator />

      <!-- Detalles -->
      <q-card-section class="q-gutter-sm">

        <div><b>Fecha:</b> {{ date }}</div>
        <div><b>Horario:</b> {{ timeRange }}</div>

        <div v-if="event.extendedProps.level">
          <b>Nivel:</b> {{ event.extendedProps.level }}
        </div>

        <div v-if="event.extendedProps.coach">
          <b>Coach:</b> {{ event.extendedProps.coach }}
        </div>

        <div v-if="event.extendedProps.court">
          <b>Cancha:</b> {{ event.extendedProps.court }}
        </div>

        <div>
          <b>Estado:</b>
          <q-badge
            :color="statusColor"
            align="middle"
          >
            {{ event.extendedProps.status ?? 'Planned' }}
          </q-badge>
        </div>

        <div v-if="event.extendedProps.reason !== ''">
          <b>Motivo:</b> {{ event.extendedProps.reason }}
        </div>

      </q-card-section>

      <q-separator />

      <!-- Acciones -->
      <q-card-actions align="between">
        <div>
          <q-btn
            v-if="canCancel"
            label="Cancelar"
            color="negative"
            flat
            @click="onCancel"
          />
          <q-btn
            label="Reprogramar"
            color="primary"
            flat
            @click="onReschedule"
          />
        </div>

        <q-btn flat label="Cerrar" v-close-popup />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['cancel', 'reschedule'])

const model = ref(true)

/* 📅 Fecha */
const date = computed(() =>
  props.event.start.toLocaleDateString('es-AR')
)

/* ⏰ Horario */
const timeRange = computed(() =>
  `${props.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
   ${props.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
)

/* 🎨 Color estado */
const statusColor = computed(() => {
  switch (props.event.extendedProps.status) {
    case 'Cancelado': return 'negative'
    case 'Reprogramado': return 'warning'
    default: return 'positive'
  }
})

/* 🧠 Lógica de acciones */
const canCancel = computed(() =>
  props.event.extendedProps.sourceType === 'TrainingProgram'
)

function onCancel () {
  emit('cancel', props.event)
  model.value = false
}

function onReschedule () {
  emit('reschedule', props.event)
  model.value = false
}
</script>
