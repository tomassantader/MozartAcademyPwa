<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">

      <!-- LEFT: ACTIONS -->
      <div class="col-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-subtitle1 q-mb-md">
            Programas
          </div>

          <q-input
            v-model="search"
            dense
            filled
            placeholder="Buscar programa..."
            clearable
            debounce="300"
            prepend-icon="search"
          />

          <q-separator class="q-my-md" />

          <!-- <q-btn
            color="primary"
            icon="add"
            label="Nuevo programa"
            class="full-width q-mb-sm"
            @click="createProgram"
          />

          <q-separator class="q-my-md" /> -->

          <div class="text-caption text-grey">
            Próximamente filtros
          </div>
        </q-card>
      </div>

      <!-- RIGHT: PROGRAM LIST -->
      <!-- RIGHT: PROGRAM LIST -->
<div class="col-8">
  <div class="row q-col-gutter-md">

    <!-- CREATE NEW PROGRAM CARD -->
    <div class="col-12 col-sm-6 col-md-4">
      <q-card
        bordered
        class="create-card cursor-pointer"
        @click="createProgram"
      >
        <q-card-section class="column flex-center text-center">
          <q-icon name="add_circle" size="48px" color="primary" />
          <div class="text-subtitle1 q-mt-sm">
            Nuevo programa
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- PROGRAM CARDS -->
    <div
      v-for="program in filteredPrograms"
      :key="program.id"
      class="col-12 col-sm-6 col-md-4"
    >
      <q-card bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-subtitle1">
              {{ program.name }}
            </div>

            <q-badge
              :style="{ backgroundColor: program.color }"
              rounded
            />
          </div>

          <div class="text-caption text-grey q-mt-xs">
            {{ program.levelName }} · {{ program.classTypeName }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat dense icon="edit" />
          <q-btn flat dense icon="delete" color="negative" />
        </q-card-actions>
      </q-card>
    </div>

  </div>
</div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted} from 'vue'
import { getTrainingPrograms} from 'src/services/trainingProgram.service'
import { Dialog } from 'quasar'
import TrainingProgramWizard from 'src/components/trainingProgram/TrainingProgramWizard.vue'

const search = ref('')
const programs = ref([]) // viene del backend

onMounted(async () => {
  programs.value = await getTrainingPrograms()
})

const filteredPrograms = computed(() => {
  if (!search.value) return programs.value

  const term = search.value.toLowerCase()

  return programs.value.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.levelName.toLowerCase().includes(term) || 
    p.classTypeName.toLowerCase().includes(term)
  )
})

const createProgram = () => {
Dialog.create({
  component: TrainingProgramWizard,
  transitionShow: 'scale',
  transitionHide: 'scale'
})
}
</script>

