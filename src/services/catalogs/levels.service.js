import { api } from 'src/boot/axios'

export function getLevels() {
  return api.get('/Level/GetAll').then(r => r.data)
}