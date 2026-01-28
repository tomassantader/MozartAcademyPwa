<script setup>
const model = defineModel()

defineProps({
  levels: Array,
  classTypes: Array,
  coaches: Array
}) 
</script>

<template>
    <q-card-section class="q-gutter-md">
      <div class="row q-col-gutter-md">
        <!-- Nombre -->
        <div class="col-12 col-md-6">
          <q-input
            v-model="model.name"
            label="Nombre"
            filled
          />
        </div>

        <!-- Nivel -->
        <div class="col-12 col-md-6">
          <q-select
            v-model="model.levelId"
            :options="levels"
            label="Nivel"
            filled
            emit-value
            map-options
          />
        </div>

        <!-- Descripción -->
        <div class="col-12">
          <q-input
            v-model="model.description"
            label="Descripción"
            type="textarea"
            filled
            autogrow
          />
        </div>

        <!-- Tipo de clase -->
        <div class="col-12 col-md-6">
          <q-select
            v-model="model.classTypeId"
            :options="classTypes"
            label="Tipo de clase"
            filled
            emit-value
            map-options
          />
        </div>

        <!-- Coach -->
        <div class="col-12 col-md-6">
          <q-select
            v-model="model.coachId"
            :options="coaches"
            label="Coach"
            filled
            emit-value
            map-options
          />
        </div>

        <!-- Color como input -->
        <div class="col-12 col-md-4">
          <q-input
            v-model="model.color"
            label="Color/Apariencia"
            filled
            readonly
          >
            <template #append>
              <q-avatar
                :style="{ backgroundColor: model.color }"
                class="cursor-pointer"
              />
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="model.color" />
              </q-popup-proxy>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
</template>