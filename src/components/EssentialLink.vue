<script setup>
import { useTabsStore } from 'stores/tabs'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tab: {
    type: String,
    required: true
  },
  icon: String,
  component: {
    type: Function,
    required: true
  }
})

const tabsStore = useTabsStore()

const open = () => {
  tabsStore.openTab({
    tab: props.tab,
    title: props.title,
    component: props.component
  })
}
</script>

<template>
  <q-item clickable @click="open">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
