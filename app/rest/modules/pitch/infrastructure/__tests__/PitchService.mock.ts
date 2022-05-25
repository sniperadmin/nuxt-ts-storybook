import { inject } from 'inversify-props'
import { err, ok, Result } from 'neverthrow'
import { IPitchData, IPitchRepository } from '../../domain/Pitch.types'
import { mockPitchData } from '../../domain/__tests__/Pitch.mock'
import { ParseError } from '~/rest/presentation/parseError'
import { TestActions } from '~/rest/presentation/http/HttpService.mock'
import { HttpError } from '~/rest/presentation/http/HttpError'

export class MockPitchService implements IPitchRepository {
  actionType: TestActions
  constructor(@inject('ActionType') actionType: TestActions) {
    this.actionType = actionType
  }

  create(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }

  remove(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }

  edit(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }

  getRecent(): Promise<Result<IPitchData[], ParseError | HttpError>> {
    if (this.actionType === 'ok') {
      return new Promise((resolve) => {
        resolve(ok(mockPitchData()))
      })
    } else if (this.actionType === 'clientError') {
      // eslint-disable-next-line promise/param-names
      return new Promise((reject) => {
        reject(err(new HttpError(404)))
      })
    } else if (this.actionType === 'serverError') {
      // eslint-disable-next-line promise/param-names
      return new Promise((reject) => {
        reject(err(new HttpError(500)))
      })
    } else {
      // eslint-disable-next-line promise/param-names
      return new Promise((reject) => {
        reject(err(new ParseError('Error parsing data')))
      })
    }
  }

  getOne(): Promise<Result<IPitchData, ParseError | HttpError>> {
    throw new Error('Method not implemented.')
  }
}
