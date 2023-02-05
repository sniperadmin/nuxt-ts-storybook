import 'reflect-metadata'

import { container } from 'inversify-props'
import { GetRecent, IUseCase } from '~/rest/modules/pitch/usecase/getRecent'
import { IPitchRepository } from '~/rest/modules/pitch/domain/Pitch.types'
import { PitchService } from '~/rest/modules/pitch/infrastructure/PitchService'
import { AxiosCreator, HttpService, IAxiosCreator, IHttpService } from '~/rest/presentation/http/HttpService'

export function containerBuilder () {
  container.addTransient<IAxiosCreator>(AxiosCreator)
  container.addTransient<IHttpService>(HttpService)
  container.addTransient<IPitchRepository>(PitchService)
  container.addTransient<IUseCase>(GetRecent)
}

containerBuilder()
