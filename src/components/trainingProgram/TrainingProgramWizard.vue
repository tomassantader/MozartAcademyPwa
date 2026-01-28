<template>
  <q-dialog v-model="open" persistent full-width>
    <q-card>

      <!-- Header -->
      <q-card-section class="row items-center">
        <div class="text-h6">Nuevo programa</div>
        <q-space />
        <q-btn icon="close" flat round v-close-popup />
      </q-card-section>

      <q-separator />

      <!-- Body -->
      <q-card-section>
        <q-stepper v-model="step" animated flat>

          <q-step :name="1" title="Datos básicos" icon="info">
            <StepBasicInfo
              v-model="form"
              :levels="levels"
              :class-types="classTypes"
              :coaches="coaches"
            />
          </q-step>

          <q-step :name="2" title="Horarios" icon="schedule">
            <StepSchedule v-model="form" />
          </q-step>

          <q-step :name="3" title="Confirmación" icon="check">
            <StepConfirm v-model="form" />
          </q-step>

        </q-stepper>
      </q-card-section>

      <q-separator />

      <!-- Footer -->
      <q-card-actions align="between">
        <q-btn
          flat
          label="Atrás"
          :disable="step === 1"
          @click="step--"
        />

        <q-btn
          color="primary"
          :label="step === 3 ? 'Crear' : 'Siguiente'"
          :disable="!canContinue || catalogsLoading"
          @click="next"
        />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import StepBasicInfo from './steps/stepBasicInfo.vue'
import StepSchedule from './steps/stepSchedule.vue'
import StepConfirm from './steps/stepConfirm.vue'

import { useTrainingProgramCatalogs } from 'src/composables/useTrainingProgramCatalogs'

const open = ref(true)
const step = ref(1)

const createEmptyForm = () => ({
  name: '',
  description: '',
  levelId: null,
  classTypeId: null,
  coachId: null,
  color: '#7498b3',

  startDate: null,
  endDate: null,
  defaultStartTime: null,
  defaultEndTime: null,
  daysOfWeek: [],
})

const form = ref(createEmptyForm())

const {
  levels,
  classTypes,
  coaches,
  loading: catalogsLoading,
  load
} = useTrainingProgramCatalogs()

onMounted(load)

const canContinue = computed(() => {
  if (step.value === 1) {
    return (
      form.value.name &&
      form.value.levelId &&
      form.value.classTypeId &&
      form.value.coachId
    )
  }

  if (step.value === 2) {
    return (
      form.value.startDate &&
      form.value.endDate &&
      form.value.defaultStartTime &&
      form.value.defaultEndTime
    )
  }

  if (step.value === 3) {
    return form.value.daysOfWeek.length > 0
  }

  return true
})

const next = () => {
  if (step.value < 4) {
    step.value++
  } else {
    submit()
  }
}

const submit = async () => {
  console.log('Submitting:', form.value)
}
</script>
