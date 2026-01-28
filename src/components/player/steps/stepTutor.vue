<template>
  <q-card-section class="q-gutter-md">
    <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
            <q-input
              v-model="model.tutorDraft.firstName"
              label="Nombre"
              filled
              autocomplete="off"
              @update:model-value="onNameOrLastNameInput"
            />
            <div class="col-12 col-md-6">
                <q-menu
                  v-model="showSuggestions"
                  anchor="bottom left"
                  self="top left"
                  fit
                  no-focus
                  no-refocus
                >
                  <q-list dense separator>
                    <q-item
                      v-for="tutor in suggestions"
                      :key="tutor.id"
                      clickable
                      @click="selectTutor(tutor)"
                    >
                      <q-item-section>
                        {{ tutor.firstName }} {{ tutor.lastName }}
                      </q-item-section>
                      <q-item-section side>
                        <span class="text-caption text-grey">
                          {{ tutor.email }}
                        </span>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
            </div>
        </div>

        <div class="col-12 col-md-6">
           <q-input
              v-model="model.tutorDraft.lastName"
              label="Apellido"
              filled
              autocomplete="off"
              @update:model-value="onNameOrLastNameInput"
            />
        </div>

        <div class="col-12 col-md-6">
            <q-input
              v-model="model.tutorDraft.phone"
              label="Teléfono"
              filled
              @update:model-value="invalidateTutor"
            />
        </div>

        <div class="col-12 col-md-6">
            <q-input
              v-model="model.tutorDraft.email"
              label="Email"
              type="email"
              filled
              @update:model-value="invalidateTutor"
            />
        </div>

         <div class="col-12 col-md-6">
            <q-banner
              v-if="model.tutorId"
              class="bg-green-1 text-green-9 q-mt-sm"
              rounded
              dense
            >
              Tutor existente detectado ✔
            </q-banner>
        
            <q-banner
              v-else
              class="bg-grey-2 text-grey-8 q-mt-sm"
              rounded
              dense
            >
              Se creará un nuevo tutor
            </q-banner>
         </div>

    </div>
</q-card-section>
</template>

<script setup>
import { ref } from 'vue'

const model = defineModel()

const props = defineProps({
  tutors: {
    type: Array,
    required: true
  },
  tutorsList: {
    type: Array,
    required: true
  }
})

const showSuggestions = ref(false)
const suggestions = ref([])

/**
 * Busca por nombre + apellido
 */
const onNameOrLastNameInput = () => {
  invalidateTutor()

  const first = model.value.tutorDraft.firstName?.trim()
  const last = model.value.tutorDraft.lastName?.trim()

  if ((!first && !last) || props.tutorsList.length === 0) {
    showSuggestions.value = false
    return
  }

  const needle = `${first ?? ''} ${last ?? ''}`.toLowerCase().trim()

  if (needle.length < 2) {
    showSuggestions.value = false
    return
  }

  suggestions.value = props.tutorsList.filter(t =>
    `${t.firstName} ${t.lastName}`
      .toLowerCase()
      .includes(needle)
  )

  showSuggestions.value = suggestions.value.length > 0
}

/**
 * Selección desde sugerencia
 */
const selectTutor = (tutor) => {
  model.value.tutorId = tutor.id

  model.value.tutorDraft = {
    firstName: tutor.firstName,
    lastName: tutor.lastName,
    phone: tutor.phone ?? '',
    email: tutor.email ?? ''
  }

  showSuggestions.value = false
}

/**
 * Cualquier edición manual invalida tutor existente
 */
const invalidateTutor = () => {
  if (model.value.tutorId) {
    model.value.tutorId = null
  }
}
</script>
