<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Mozart Academy
        </q-toolbar-title>

        <q-btn
          flat
          dense
          icon="logout"
          label="Salir"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <EssentialLink
          v-for="link in filteredLinks"
          :key="link.tab"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-tabs
        v-if="tabsStore.tabs.length"
        v-model="tabsStore.activeTab"
        dense
        class="bg-grey-2 text-primary"
        align="left"
        inline-label
      >
        <q-tab
          v-for="tab in tabsStore.tabs"
          :key="tab.tab"
          :name="tab.tab"
          :label="tab.title"
        >
          <q-btn
            dense
            flat
            size="sm"
            icon="close"
            @click.stop="tabsStore.closeTab(tab.tab)"
          />
        </q-tab>
      </q-tabs>

      <!-- Active view -->
      <div class="q-pa-md">
        <component
          :is="activeComponent"
          v-if="activeComponent"
        />

        <div
          v-else
          class="text-grey text-center q-mt-lg"
        >
          Seleccioná una opción del menú
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, defineAsyncComponent} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { useTabsStore } from 'stores/tabs'

const authStore = useAuthStore()
const tabsStore = useTabsStore()
const router = useRouter()

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const linksList = [
  {
    title: 'Dashboard',
    tab: 'dashboard',
    icon: 'dashboard',
    roles: ['Admin', 'User'],
    component: defineAsyncComponent(() => 
      import('src/pages/tabs/Dashboard/DashboardTab.vue'))
  },
  {
    title: 'Calendario',
    tab: 'calendar',
    icon: 'calendar_month',
    roles: ['Admin', 'User'],
    component: defineAsyncComponent(() => 
      import('src/pages/tabs/Calendar/CalendarTab.vue'))
  },
  {
    title: 'Programacion',
    tab: 'trainingProgram',
    icon: 'sports_tennis',
    roles: ['Admin'],
    component: defineAsyncComponent(() => 
      import('src/pages/tabs/TrainingProgram/TrainingProgramTab.vue'))
  },
  {
    title: 'Alumnos',
    tab: 'players',
    icon: 'groups',
    roles: ['Admin'],
    component: defineAsyncComponent(() => 
      import('src/pages/tabs/Players/PlayersTab.vue'))
  },
  {
    title: 'Usuarios',
    tab: 'users',
    icon: 'people',
    roles: ['Admin'],
    component: defineAsyncComponent(() =>
      import('src/pages/tabs/Users/UsersTab.vue'))
  }
]

const filteredLinks = computed(() => {
  if (!authStore.user) return []
  return linksList.filter(link =>
    link.roles.includes(authStore.user.role)
  )
})

const activeComponent = computed(() => {
  const tab = tabsStore.tabs.find(
    t => t.tab === tabsStore.activeTab
  )
  return tab?.component || null
})

const logout = () => {
  authStore.logout()
  tabsStore.$reset()
  router.push('/login')
}
</script>
