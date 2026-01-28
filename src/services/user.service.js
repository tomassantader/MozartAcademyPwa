import { api } from 'boot/axios'

export const getUsers = async () => {
  const { data } = await api.get('/User/GetAll')
  return data
}

export const createUser = async (payload) => {
  const { data } = await api.post('/User/Create', payload)
  return data
}
