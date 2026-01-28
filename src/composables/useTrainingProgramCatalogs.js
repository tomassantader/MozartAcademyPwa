import { ref } from 'vue'
import { getLevels } from 'src/services/catalogs/levels.service'
import { getClassTypes } from 'src/services/catalogs/classType.service'
import { getCoachesCatalog } from 'src/services/catalogs/coach.service'

let loaded = false

const levels = ref([])
const classTypes = ref([])
const coaches = ref([])
const loading = ref(false)

export function useTrainingProgramCatalogs() {
  const load = async () => {
    if (loaded) return

    loading.value = true

    const [l, ct, c] = await Promise.all([
      getLevels(),
      getClassTypes(),
      getCoachesCatalog()
    ])

    levels.value = l.map(x => ({ label: x.description, value: x.id }))
    classTypes.value = ct.map(x => ({ label: x.description, value: x.id }))
    coaches.value = c.map(x => ({ label: x.fullName, value: x.id }))

    loaded = true
    loading.value = false
  }

  return {
    levels,
    classTypes,
    coaches,
    loading,
    load
  }
}
