<script setup>
import { useTabsStore } from 'stores/tabs'

const tabsStore = useTabsStore()
</script>

<template>
  <div v-if="tabsStore.tabs.length">

    <q-tabs v-model="tabsStore.activeTab" dense>
      <q-tab
        v-for="tab in tabsStore.tabs"
        :key="tab.name"
        :name="tab.name"
      >
        <div class="row items-center no-wrap">
          <span>{{ tab.title }}</span>
          <q-btn
            dense
            flat
            size="sm"
            icon="close"
            @click.stop="tabsStore.closeTab(tab.name)"
          />
        </div>
      </q-tab>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabsStore.activeTab" animated>
      <q-tab-panel
        v-for="tab in tabsStore.tabs"
        :key="tab.name"
        :name="tab.name"
      >
        <component :is="tab.component" />
      </q-tab-panel>
    </q-tab-panels>

  </div>

</template>
