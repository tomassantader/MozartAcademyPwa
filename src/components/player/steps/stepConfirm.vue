<template>
  <q-card flat bordered class="q-pa-md">

    <!-- Header -->
    <div class="row items-center q-mb-md">
      <q-avatar
        size="42px"
        color="primary"
        text-color="white"
        icon="person"
      />
      <div class="q-ml-md">
        <div class="text-h6">
          {{ model.firstName }} {{ model.lastName }}
        </div>
        <div class="text-caption text-grey-7">
          Alumno
        </div>
      </div>
    </div>

    <q-separator spaced />

    <!-- Info grid -->
    <div class="row q-col-gutter-md q-mt-sm">

      <!-- Email -->
      <div class="col-12 col-md-6">
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="email" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Email</q-item-label>
            <q-item-label>
              {{ model.email || '—' }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <!-- Teléfono -->
      <div class="col-12 col-md-6">
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="phone" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Teléfono</q-item-label>
            <q-item-label>
              {{ model.phone || '—' }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <!-- Nivel -->
      <div class="col-12">
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Nivel</q-item-label>
            <q-item-label>
              {{ levelLabel }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

    </div>

    <q-separator spaced />

    <!-- Tutor -->
    <div>
      <div class="text-subtitle2 q-mb-sm">Tutor</div>

      <q-item dense v-if="hasTutor">
        <q-item-section avatar>
          <q-icon name="group" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ tutorName }}
          </q-item-label>
          <q-item-label caption>
            {{ tutorContact }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <div v-else class="text-grey text-caption">
        No se asignó tutor
      </div>
    </div>

  </q-card>
</template>
<script setup>
import { computed } from 'vue'

const model = defineModel()

const levelLabel = computed(() => {
  return (
    model.value.level?.description ||
    model.value.level?.name ||
    model.value.levelId ||
    '—'
  )
})

const hasTutor = computed(() => {
  return (
    model.value.tutorId ||
    model.value.tutorDraft?.firstName ||
    model.value.tutorDraft?.lastName
  )
})

const tutorName = computed(() => {
  if (model.value.tutor) {
    return `${model.value.tutor.firstName} ${model.value.tutor.lastName}`
  }

  if (model.value.tutorDraft) {
    return `${model.value.tutorDraft.firstName} ${model.value.tutorDraft.lastName}`
  }

  return ''
})

const tutorContact = computed(() => {
  const source = model.value.tutor || model.value.tutorDraft

  if (!source) return ''

  return [
    source.phone && `📞 ${source.phone}`,
    source.email && `✉️ ${source.email}`
  ]
    .filter(Boolean)
    .join(' · ')
})
</script>
