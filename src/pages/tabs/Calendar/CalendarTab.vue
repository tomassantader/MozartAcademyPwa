<script setup lang="ts">
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Dialog } from 'quasar'
import { getCalendar } from 'src/services/calendar.service'
import CalendarEventActionsDialog from 'src/components/dialogs/CalendarEventActionsDialog.vue'

const calendarEvents = ref<[]>([])

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locale: 'es',
  editable: false,
  selectable: true,

  events: calendarEvents,

  datesSet(info) {
    loadCalendar(info.start, info.end)
  },

  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },

  eventDidMount(info) {
    const type = info.event.extendedProps.sourceType

    if (type === 'TrainingProgram') {
      info.el.style.zIndex = '10'
    }

    if (type === 'CalendarEvent') {
      info.el.style.backgroundColor = '#fb8c00'
      info.el.style.borderColor = '#fb8c00'
      info.el.style.opacity = '0.8'
    }

    if (info.event.extendedProps.status === 'Cancelado') {
      info.el.style.opacity = '0.4'
      info.el.style.textDecoration = 'line-through'
    }
  },

  eventOrder(a, b) {
    const priority = { TrainingProgram: 1, CalendarEvent: 2 }
    return priority[a.extendedProps.sourceType] -
           priority[b.extendedProps.sourceType]
  },

  eventClick(info) {
    // if (info.event.extendedProps.sourceType !== 'TrainingProgram') {
    //   return
    // }

    Dialog.create({
      component: CalendarEventActionsDialog,
      componentProps: {
        event: info.event
      }
    })
    .onOk(() => {})
    .onCancel(() => {})
    .onDismiss(() => {})
  }

})

const loadCalendar = async (from, to) => {
  const data = await getCalendar(
    from.toISOString(),
    to.toISOString()
  )

  calendarEvents.value = data.map(e => ({
    id: e.id,
    title: e.title,
    start: e.start,
    end: e.end,
    color: e.color,
    extendedProps: {
      sourceType: e.sourceType,
      coach: e.coach,
      level: e.level,
      court: e.court,
      status: e.status,
      reason: e.reason
    }
  }))
}

</script>

<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Panel izquierdo (acciones futuras) -->
      <div class="col-12 col-md-2">
        <q-card flat bordered class="q-pa-md">
          <div class="text-subtitle1 q-mb-sm">Acciones</div>

          <!-- Placeholder -->
          <div class="text-grey">
            Próximamente acciones, filtros, resumen, etc.
          </div>
        </q-card>
      </div>

      <!-- Calendario a la derecha -->
      <div class="col-12 col-md-10">
        <q-card flat bordered class="q-pa-sm">
          <FullCalendar 
          :options="calendarOptions" 
          />
        </q-card>
      </div>
    </div>
  </div>
</template>