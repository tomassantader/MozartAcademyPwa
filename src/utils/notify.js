import { Notify } from 'quasar'

export const useNotify = () => {
  const base = {
    position: 'top',
    timeout: 2500,
    actions: [{ icon: 'close', color: 'white' }]
  }

  return {
    notifySuccess: (message) =>
      Notify.create({
        ...base,
        type: 'positive',
        message
      }),

    notifyError: (message) =>
      Notify.create({
        ...base,
        type: 'negative',
        message
      }),

    notifyWarning: (message) =>
      Notify.create({
        ...base,
        type: 'warning',
        message
      })
  }
}
