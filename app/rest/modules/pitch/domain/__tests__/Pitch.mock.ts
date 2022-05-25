import { IPitchData } from '../Pitch.types'

export const mockPitchData = (): IPitchData[] => [
  {
    title: 'Create Nuxt App',
    description: 'I have to make a nuxt sample app',
    state: 'REVIEW',
    schedule: null,
    due: null
  },
  {
    title: 'Drink water',
    description: 'Always drink water',
    state: 'APPROVED',
    schedule: null,
    due: null
  }
]
