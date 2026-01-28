<template>
  <q-card flat bordered class="q-pa-md">

    <!-- Header -->
    <div class="row items-center q-mb-md">
      <q-avatar
        size="42px"
        :style="{ backgroundColor: model.color }"
        class="text-white"
        icon="event"
      />
      <div class="q-ml-md">
        <div class="text-h6">{{ model.name }}</div>
        <div class="text-caption text-grey-7">
          {{ model.description || 'Sin descripción' }}
        </div>
      </div>
    </div>

    <q-separator spaced />

    <!-- Info grid -->
    <div class="row q-col-gutter-md q-mt-sm">

      <!-- Fechas -->
      <div class="col-12 col-md-6">
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Fechas</q-item-label>
            <q-item-label>
              {{ model.startDate }} → {{ model.endDate }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <!-- Horarios -->
      <div class="col-12 col-md-6">
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Horario</q-item-label>
            <q-item-label>
              {{ model.defaultStartTime }} – {{ model.defaultEndTime }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <!-- Días -->
      <div class="col-12">
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="repeat" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Días de la semana</q-item-label>

            <div class="q-mt-xs">
              <q-chip
                v-for="day in model.daysOfWeek"
                :key="day"
                dense
                color="primary"
                text-color="white"
                class="q-mr-xs q-mb-xs"
              >
                {{ dayLabel(day) }}
              </q-chip>
            </div>
          </q-item-section>
        </q-item>
      </div>

    </div>

  </q-card>
</template>

<script setup>
const model = defineModel()

const dayLabel = (day) => {
  const map = {
    Mon: 'Lunes',
    Tue: 'Martes',
    Wed: 'Miércoles',
    Thu: 'Jueves',
    Fri: 'Viernes',
    Sat: 'Sábado',
    Sun: 'Domingo'
  }

  return map[day] || day
}
</script>
