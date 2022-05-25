import { Result } from 'neverthrow'
import { IPitch, IPitchData } from '../domain/Pitch.types'
import { ParseError } from '~/rest/presentation/parseError'

export type HttpPitch = {
  title: string
  description: string
  state: string
  schedule: string | null
  due: string | null
}

export type IPitchResponse = {
  total: number
  page: number
  hasNext: boolean
  hasPrev: boolean
  items: HttpPitch[]
}

export interface IPitchParser {
  toDomain(data: HttpPitch): Result<IPitch, ParseError>
  fromDomain(data: IPitchData): Result<HttpPitch, ParseError>
}
