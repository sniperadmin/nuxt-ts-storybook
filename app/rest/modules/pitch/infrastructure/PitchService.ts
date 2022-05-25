import { inject } from 'inversify-props'
import { combine, Result } from 'neverthrow'
import { IPitchData, IPitchRepository } from '../domain/Pitch.types'
import { PitchParser } from './PitchParser'
import { IPitchParser, IPitchResponse } from './PitchService.types'
import { IHttpService } from '~/rest/presentation/http/HttpService'
import { HttpError } from '~/rest/presentation/http/HttpError'
import { ParseError } from '~/rest/presentation/parseError'

export class PitchService implements IPitchRepository {
  private parser: IPitchParser
  private httpService: IHttpService

  constructor(@inject() httpService: IHttpService) {
    this.parser = new PitchParser()
    this.httpService = httpService
    // this.httpService.initService('https://jsonplaceholder.typicode.com')
    this.httpService.initService('https://nashtest.free.beeceptor.com')
  }

  create(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented!')
  }

  edit(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented!')
  }

  async getRecent(): Promise<Result<IPitchData[], ParseError | HttpError>> {
    const parseTo = (pitchResponse: IPitchResponse) => {
      const pitches = pitchResponse.items.map(this.parser.toDomain)
      return combine(pitches)
    }

    return await this.httpService.get<IPitchResponse, IPitchData[]>(
      { url: '/pitches' },
      { parseTo }
    )
  }

  getOne(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented!')
  }
}
