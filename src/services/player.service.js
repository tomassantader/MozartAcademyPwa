import { api } from 'boot/axios'

export async function getAll() {
  const response = await api.get('/Player/GetAll')
  return response.data
}

export async function getById(id) {
  const response = await api.get('/Player/GetById', {
    params: { id }
  })
  return response.data
}