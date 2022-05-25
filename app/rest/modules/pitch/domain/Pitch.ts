import { IPitch, IPitchData, PitchState } from './Pitch.types'

export class Pitch implements IPitch {
  title: string
  description: string
  state: PitchState
  schedule: Date | null
  due: Date | null

  constructor(data: IPitchData) {
    this.validate(data)
    this.title = data.title
    this.description = data.description
    this.state = data.state
    this.schedule = data.schedule
    this.due = data.due
  }

  validate(data: IPitchData): void {
    if (data.schedule && data.schedule < new Date()) {
      throw new Error('Invalid schedule date')
    }

    if (data.due && data.due < new Date()) {
      throw new Error('Invalid due date')
    }
  }

  changeState(state: PitchState): void {
    this.state = state
  }

  serialize(): IPitchData {
    return { ...this }
  }
}
