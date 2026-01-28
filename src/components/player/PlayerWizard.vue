<template>
  <q-dialog v-model="open" persistent full-width>
    <q-card style="min-width: 900px">

      <!-- Header -->
      <q-card-section class="row items-center">
        <div class="text-h6">
          {{ isEdit ? 'Editar alumno' : 'Nuevo alumno' }}
        </div>
        <q-space />
        <q-btn icon="close" flat round v-close-popup />
      </q-card-section>

      <q-separator />

      <!-- Body -->
      <q-card-section>
        <q-stepper
              v-model="step"
              animated
              flata
              keep-alive
            >

          <q-step :name="1" title="Datos básicos" icon="person">
            <StepBasicInfo v-model="form" />
          </q-step>

          <q-step :name="2" title="Nivel" icon="school">
            <StepLevel
              v-model="form"
              :levels="levels"
            />
          </q-step>

          <q-step :name="3" title="Tutor" icon="group">
            <StepTutor
              v-model="form"
              :tutors="tutors"
              :tutorsList="tutorsList"
            />
          </q-step>

          <q-step :name="4" title="Confirmación" icon="check">
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
          :label="step === 4 ? (isEdit ? 'Guardar' : 'Crear') : 'Siguiente'"
          :disable="!canContinue || catalogsLoading"
          @click="next"
        />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePlayerCatalogs } from 'src/composables/usePlayerCatalogs'

import StepBasicInfo from './steps/stepBasicInfo.vue'
import StepLevel from './steps/stepLevel.vue'
import StepTutor from './steps/stepTutor.vue'
import StepConfirm from './steps/stepConfirm.vue'

// props
const props = defineProps({
  player: {
    type: Object,
    default: null
  }
})

const {
  levels,
  tutorsList,
  tutors,
  loading: catalogsLoading,
  load
} = usePlayerCatalogs()

onMounted(load)

// state
const step = ref(1)
const isEdit = computed(() => !!props.player)

const createEmptyForm = () => ({
  id: null,
  dni: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  birthDate: null,
  levelId: null,
  tutorId: null,
  tutorDraft: {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  }
})


const form = ref(
  props.player
    ? {
        ...props.player,
        tutorDraft: props.player.tutor
          ? { ...props.player.tutor }
          : createEmptyForm().tutorDraft
      }
    : createEmptyForm()
)

// validation
const canContinue = computed(() => {
  if (step.value === 1) {
    return form.value.firstName && form.value.lastName
  }

  if (step.value === 2) {
    return !!form.value.levelId
  }

  if (step.value === 3) {
      const hasExistingTutor = !!form.value.tutorId

    const hasNewTutor =
    form.value.tutorDraft.firstName &&
    form.value.tutorDraft.lastName

    return hasExistingTutor || hasNewTutor
  }

  return true
})

// actions
const next = () => {
  if (step.value < 4) {
    step.value++
  } else {
    submit()
  }
}

const submit = async () => {
  const payload = { ...form.value }

  // 1️⃣ Crear tutor si es nuevo
  if (!payload.tutorId) {
    // const tutorId = await createTutor(payload.tutorDraft)
    // payload.tutorId = tutorId
  }

  // 2️⃣ Limpiar campos que no van al backend
  delete payload.tutorDraft

  // 3️⃣ Crear o actualizar player
  if (payload.id) {
    // await updatePlayer(payload)
  } else {
    // await createPlayer(payload)
  }

//   onDialogOK(payload)
}
</script>
