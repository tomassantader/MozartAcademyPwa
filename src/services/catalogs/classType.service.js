import { api } from 'src/boot/axios'

export function getClassTypes() {
  return api.get('/ClassType/GetAll').then(r => r.data)
}