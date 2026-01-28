import { api } from 'boot/axios'

export async function getTrainingPrograms() {
  const response = await api.get('/TrainingProgram/GetAll')
  return response.data
}