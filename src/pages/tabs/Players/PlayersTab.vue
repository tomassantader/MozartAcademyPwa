<template>
  <div class="row q-col-gutter-md">

    <!-- LISTA -->
    <div class="col-4">
      <q-card class="players-card">
      
        <!-- Header + buscador -->
        <q-card-section class="row items-center q-gutter-sm">
          <div class="text-h6">Alumnos</div>
          <q-space />
            <q-btn
              color="primary"
              icon="add"
              round
              dense
              @click="createPlayer"
            />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="search"
            dense
            filled
            placeholder="Buscar alumno"
            clearable
            debounce="300"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
      
        <q-separator />
      
        <!-- LISTA CON SCROLL -->
        <q-card-section class="players-list q-pa-none">
          <q-list bordered separator>
            <transition-group name="slide" tag="div">
              <q-item
                v-for="player in visiblePlayers"
                :key="player.id"
                clickable
                @click="selectPlayer(player.id)"
                :active="player.id === selectedPlayer?.id"
                active-class="bg-primary text-white"
                class="slide-item"
              >
                <q-item-section>
                  <q-item-label>
                    {{ player.firstName }} {{ player.lastName }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ player.email }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </transition-group>
          </q-list>
        
          <q-inner-loading :showing="loading" />
        
          <!-- CARGAR MÁS (FIJO ABAJO) -->
          <div
            v-if="visiblePlayers.length < filteredPlayers.length"
            class="load-more"
          >
            <q-btn
              flat
              color="primary"
              label="Cargar más"
              @click="loadMore"
            />
          </div>
        </q-card-section>
      
      </q-card>
    </div>

    <!-- DETALLE -->
    <div class="col-8">
      <q-card v-if="selectedPlayer">
        <q-card-section class="row items-center">
          <div>
            <div class="text-h6">
              {{ selectedPlayer.firstName }} {{ selectedPlayer.lastName }}
            </div>
            <div class="text-caption text-grey">
              Nivel: {{ selectedPlayer.level?.description }}
            </div>
          </div>
        
          <q-space />
        
            <q-btn
              flat
              icon="edit"
              label="Editar"
              color="primary"
              @click="editPlayer"
            />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-sm">
          <div><strong>Email:</strong> {{ selectedPlayer.email }}</div>
          <div><strong>Teléfono:</strong> {{ selectedPlayer.phone }}</div>
          <div><strong>Dirección:</strong> {{ selectedPlayer.address }}</div>
          <div><strong>Fecha nacimiento:</strong>
            {{ new Date(selectedPlayer.birthDate).toLocaleDateString() }}
          </div>

          <q-separator spaced />

          <div class="text-subtitle2">Tutor</div>
          <div v-if="selectedPlayer.tutor">
            {{ selectedPlayer.tutor.firstName }} {{ selectedPlayer.tutor.lastName }}<br>
            📞 {{ selectedPlayer.tutor.phone }}<br>
            ✉️ {{ selectedPlayer.tutor.email }}
          </div>
          <div v-else class="text-grey">
            Sin tutor asignado
          </div>
        </q-card-section>

        <q-inner-loading :showing="loadingDetail" />
      </q-card>

      <q-card v-else class="flex flex-center">
        <q-card-section class="text-grey">
          Seleccioná un alumno para ver su información
        </q-card-section>
      </q-card>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAll, getById } from 'src/services/player.service'
import { Dialog } from 'quasar'
import PlayerWizard from 'src/components/player/PlayerWizard.vue'
// state
const players = ref([])
const selectedPlayer = ref(null)
const loading = ref(false)
const loadingDetail = ref(false)

// search + lazy
const search = ref('')
const visibleCount = ref(10)
const STEP = 10

// lifecycle
onMounted(async () => {
  loading.value = true
  players.value = await getAll()
  loading.value = false
})

// computed
const filteredPlayers = computed(() => {
  if (!search.value) return players.value

  const term = search.value.toLowerCase()
  return players.value.filter(p =>
    `${p.firstName} ${p.lastName} ${p.email}`
      .toLowerCase()
      .includes(term)
  )
})

const visiblePlayers = computed(() =>
  filteredPlayers.value.slice(0, visibleCount.value)
)

// actions
const selectPlayer = async (id) => {
  loadingDetail.value = true
  selectedPlayer.value = await getById(id)
  loadingDetail.value = false
}

const loadMore = () => {
  visibleCount.value += STEP
}

const createPlayer = () => {
  Dialog.create({
    component: PlayerWizard,
    transitionShow: 'scale',
    transitionHide: 'scale'
  })
}

const editPlayer = () => {
  if (!selectedPlayer.value) return

  Dialog.create({
    component: PlayerWizard,
    componentProps: {
      player: selectedPlayer.value
    },
    transitionShow: 'scale',
    transitionHide: 'scale'
  })
}


// const reloadPlayers = async () => {
//   loading.value = true
//   players.value = await getAll()
//   loading.value = false
// }
</script>

<style scoped>
.players-card {
  height: calc(100vh - 120px); /* ajustá según tu layout */
  display: flex;
  flex-direction: column;
}

.players-list {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.load-more {
  position: sticky;
  bottom: 0;
  background: white;
  text-align: center;
  padding: 8px;
  border-top: 1px solid #eee;
}

/* animación */
.slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-enter-active {
  transition: all 0.25s ease;
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-item {
  will-change: transform, opacity;
}
</style>
