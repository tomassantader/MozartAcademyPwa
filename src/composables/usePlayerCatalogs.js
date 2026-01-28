import { ref } from 'vue'
import { getLevels } from 'src/services/catalogs/levels.service'
import { getAll as getTutors } from 'src/services/tutor.service'

let loaded = false

const levels = ref([])
const tutors = ref([])
const tutorsList = ref([])
const loading = ref(false)

export function usePlayerCatalogs () {

  const load = async () => {
    if (loaded) return

    loading.value = true

    const [l, t] = await Promise.all([
      getLevels(),
      getTutors()
    ])

    levels.value = l.map(x => ({
      label: x.description,
      value: x.id
    }))

    tutors.value = t.map(x => ({
      label: `${x.firstName} ${x.lastName}`,
      value: x.id
    }))

    tutorsList.value = t.map(x => ({
      firstName: x.firstName,
      lastName: x.lastName,
      phone: x.phone,
      email: x.email,
      id: x.id
    }))

    loaded = true
    loading.value = false
  }

  return {
    levels,
    tutorsList,
    tutors,
    loading,
    load
  }
}
