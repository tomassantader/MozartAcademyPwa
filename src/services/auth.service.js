import { api } from 'boot/axios'

export const login = async (email, password) => {
  const response = await api.post('/Auth/Login', {
    email,
    password
  })

  return response.data
}