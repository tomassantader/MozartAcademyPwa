<template>
  <div class="q-gutter-md">

    <!-- Fechas -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          type="date"
          v-model="model.startDate"
          label="Fecha inicio"
          filled
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          type="date"
          v-model="model.endDate"
          label="Fecha fin"
          filled
        />
      </div>
    </div>

    <!-- Horarios -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          type="time"
          v-model="model.defaultStartTime"
          label="Hora inicio"
          filled
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          type="time"
          v-model="model.defaultEndTime"
          label="Hora fin"
          filled
        />
      </div>
    </div>

    <!-- Días de la semana -->
    <div>
      <div class="text-subtitle2 q-mb-sm">
        Días de la semana
      </div>

      <q-option-group
        v-model="model.daysOfWeek"
        :options="days"
        type="toggle"
        color="primary"
        inline
      />

        <q-select
          v-model="model.frequency"
          :options="['Semalnal', 'Quincenal', 'Mensual']"
          label="Frecuencia"
          filled
        />
    </div>

  </div>
</template>

<script setup>
const model = defineModel()

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
