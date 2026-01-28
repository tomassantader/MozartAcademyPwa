import { defineStore } from 'pinia'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
    activeTab: null
  }),

  actions: {
    openTab(tab) {
      const exists = this.tabs.find(t => t.tab === tab.tab)

      if (!exists) {
        this.tabs.push({
          tab: tab.tab,
          title: tab.title,
          component: tab.component
        })
      }

      this.activeTab = tab.tab
    },

    closeTab(tabName) {
      this.tabs = this.tabs.filter(t => t.tab !== tabName)

      if (this.activeTab === tabName) {
        this.activeTab = this.tabs.at(-1)?.tab || null
      }
    }
  }
})
