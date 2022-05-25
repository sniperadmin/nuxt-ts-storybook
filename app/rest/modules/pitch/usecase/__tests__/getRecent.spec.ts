import 'reflect-metadata'

import { cid, container, mockTransient, resetContainer } from 'inversify-props'
import { GetRecent } from '../getRecent'
import { IPitchRepository } from '../../domain/Pitch.types'
import { mockPitchData } from '../../domain/__tests__/Pitch.mock'
import { MockPitchService } from '../../infrastructure/__tests__/PitchService.mock'
import { containerBuilder } from '@/plugins/inversify'
import { TestActions } from '~/rest/presentation/http/HttpService.mock'
import { HttpError } from '~/rest/presentation/http/HttpError'
import { ParseError } from '~/rest/presentation/parseError'

beforeEach(() => {
  resetContainer()
  containerBuilder()
  mockTransient<IPitchRepository>(cid.PitchService, MockPitchService)
})

describe('GetRecent', () => {
  it('should call success callback', async () => {
    container.bind<TestActions>('ActionType').toConstantValue('ok')
    const getRecent = new GetRecent()
    const mockCallbacks = {
      onSuccess: jest.fn(),
      onClientError: jest.fn(),
      onParseError: jest.fn(),
      onServerError: jest.fn()
    }

    await getRecent.execute(null, mockCallbacks)
    expect(mockCallbacks.onSuccess).toHaveBeenCalledWith(mockPitchData())
  })

  it('should call client error callback', async () => {
    container.bind<TestActions>('ActionType').toConstantValue('clientError')
    const getRecent = new GetRecent()
    const mockCallbacks = {
      onSuccess: jest.fn(),
      onClientError: jest.fn(),
      onParseError: jest.fn(),
      onServerError: jest.fn()
    }
    await getRecent.execute(null, mockCallbacks)
    expect(mockCallbacks.onClientError.mock.calls[0][0]).toBeInstanceOf(HttpError)
  })
  it('should call server error callback', async () => {
    container.bind<TestActions>('ActionType').toConstantValue('serverError')
    const getRecent = new GetRecent()
    const mockCallbacks = {
      onSuccess: jest.fn(),
      onClientError: jest.fn(),
      onParseError: jest.fn(),
      onServerError: jest.fn()
    }
    await getRecent.execute(null, mockCallbacks)
    expect(mockCallbacks.onServerError.mock.calls[0][0]).toBeInstanceOf(HttpError)
  })
  it('should call parse error callback', async () => {
    container.bind<TestActions>('ActionType').toConstantValue('parseError')
    const getRecent = new GetRecent()
    const mockCallbacks = {
      onSuccess: jest.fn(),
      onClientError: jest.fn(),
      onParseError: jest.fn(),
      onServerError: jest.fn()
    }
    await getRecent.execute(null, mockCallbacks)
    expect(mockCallbacks.onParseError.mock.calls[0][0]).toBeInstanceOf(ParseError)
  })
})
