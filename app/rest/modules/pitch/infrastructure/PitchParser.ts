import { err, ok, Result } from 'neverthrow'
import { Pitch } from '../domain/Pitch'
import { IPitch, IPitchData, PitchState } from '../domain/Pitch.types'
import { HttpPitch, IPitchParser } from './PitchService.types'
import { ParseError } from '~/rest/presentation/parseError'

export class PitchParser implements IPitchParser {
  toDomain(data: HttpPitch): Result<IPitch, ParseError> {
    try {
      const pitchData: IPitchData = {
        title: data.title,
        description: data.description,
        state: data.state as PitchState,
        schedule: data.schedule ? new Date(data.schedule) : null,
        due: data.due ? new Date(data.due) : null
      }

      const pitch = new Pitch(pitchData)
      return ok(pitch)
    } catch (error: any) {
      return err(new ParseError(error.message))
    }
  }

  fromDomain(data: IPitchData): Result<HttpPitch, ParseError> {
    try {
      const httpData = {
        title: data.title,
        description: data.description,
        state: data.state,
        schedule: data.schedule ? data.schedule.toDateString() : null,
        due: data.due ? data.due.toDateString() : null
      }
      return ok(httpData)
    } catch (error: any) {
      return err(new ParseError(error.message))
    }
  }
}
