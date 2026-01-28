import { api } from 'boot/axios'

export async function getAll() {
  const response = await api.get('/Tutor/GetAll')
  return response.data
}

export async function getById(id) {
  const response = await api.get('/Tutor/GetById', {
    params: { id }
  })
  return response.data
}