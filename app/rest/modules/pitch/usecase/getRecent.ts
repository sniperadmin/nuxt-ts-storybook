import { inject } from 'inversify-props'
import { IPitchData, IPitchRepository } from '../domain/Pitch.types'
import { HttpError, isHttpError } from '~/rest/presentation/http/HttpError'
import { ParseError } from '~/rest/presentation/parseError'

export type Callbacks = {
  onSuccess(data: IPitchData[]): void
  onClientError(error: HttpError): void
  onServerError(error: HttpError): void
  onParseError(error: ParseError): void
}
export interface IUseCase {
  execute(params: any, callbacks: Callbacks): void
}

export class GetRecent implements IUseCase {
  @inject() pitchService!: IPitchRepository
  async execute(
    _params: any,
    {
      onSuccess,
      onClientError,
      onServerError,
      onParseError
    }: Callbacks
  ): Promise<void> {
    const result = await this.pitchService.getRecent()
    result.map((pitches) => {
      onSuccess(pitches)
    }).mapErr((error) => {
      if (isHttpError(error)) {
        if (error.isClientError()) {
          onClientError(error)
          return
        }
        onServerError(error)
      }
      onParseError(error)
    })
  }
}
