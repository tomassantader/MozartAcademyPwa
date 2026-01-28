import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'stores/auth'
import { useUiStore } from 'stores/ui'
import { Notify } from 'quasar'

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000
})

export default boot(({ router }) => {
  const authStore = useAuthStore()
  const uiStore = useUiStore()

  // REQUEST
  api.interceptors.request.use(
    config => {
      uiStore.showLoader('Cargando...')

      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
      }

      return config
    },
    error => {
      uiStore.hideLoader()
      return Promise.reject(error)
    }
  )

  // RESPONSE
  api.interceptors.response.use(
    response => {
      uiStore.hideLoader()
      return response
    },
    error => {
      uiStore.hideLoader()

      const status = error.response?.status
      const url = error.config?.url ?? ''
      
      if (status === 401 && !url.includes('/auth/login')) {
        authStore.logout()
        router.push('/login')
      }

      if (status == 400) {
        Notify.create({
          type: 'warning',
          message: error.response.data.message
        })
      }

      if (status >= 500) {
        Notify.create({
          type: 'negative',
          message: 'Error de servidor'
        })
      }

      if (status == undefined) {
        Notify.create({
          type: 'negative',
          message: 'Servidor no accesible'
        })
      }

      return Promise.reject(error)
    }
  )
})

export { api }
