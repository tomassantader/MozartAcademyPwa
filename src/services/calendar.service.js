import { api } from 'boot/axios'

export async function getCalendar(from, to) {
  const response = await api.get('/Calendar/GetAll', {
    params: { from, to }
  })

  return response.data
}
