import { defineStore } from 'pinia'
import { useTabsStore } from 'stores/tabs'

const STORAGE_KEY = 'mozart-auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    login(user, token) {
      this.user = user
      this.token = token

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user, token })
      )
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem(STORAGE_KEY)
    
      const tabsStore = useTabsStore()
      tabsStore.$reset()
    },

    loadFromStorage() {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return

      const parsed = JSON.parse(data)
      this.user = parsed.user
      this.token = parsed.token
    }
  }
})
