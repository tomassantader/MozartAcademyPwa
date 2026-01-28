import { api } from 'src/boot/axios'

export function getCoaches() {
  return api.get('/Coach/GetAll').then(r => r.data)
}

export function getCoachesCatalog() {
  return api.get('/Coach/GetCatalog').then(r => r.data)
}