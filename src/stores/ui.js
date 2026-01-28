import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false,
    loadingMessage: ''
  }),

  actions: {
    showLoader(message = 'Cargando...') {
      this.loading = true
      this.loadingMessage = message
    },
    hideLoader() {
      this.loading = false
      this.loadingMessage = ''
    }
  }
})
