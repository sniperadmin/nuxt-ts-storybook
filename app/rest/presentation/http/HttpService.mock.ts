import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { inject } from 'inversify-props'
import { IAxiosCreator } from './HttpService'
import { HttpPitch, IPitchResponse } from '~/rest/modules/pitch/infrastructure/PitchService.types'

const nextYear = new Date().setFullYear(new Date().getFullYear() + 1)

export const mockApiPitch: HttpPitch[] = [
  {
    title: 'Create Nuxt App',
    description: 'I have to make a nuxt sample app',
    state: 'DOING',
    schedule: null,
    due: null
  },
  {
    title: 'Drink water',
    description: 'Always drink water',
    state: 'TODO',
    schedule: null,
    due: nextYear.toLocaleString()
  }
]

export type TestActions = 'ok' | 'error' | 'timeout' | 'parseError' | 'clientError' | 'serverError'

export class MockAxiosCreator implements IAxiosCreator {
  mock!: MockAdapter
  actionType: TestActions

  constructor(@inject('ActionType') actionType: TestActions) {
    this.actionType = actionType
  }

  createAxiosInstance(_baseUrl: string): AxiosInstance {
    const instance = axios.create({ baseURL: _baseUrl })
    this.mock = new MockAdapter(instance)
    if (this.actionType === 'ok') { this.setMockActions() }
    if (this.actionType === 'error') { this.setErrorActions() }
    if (this.actionType === 'timeout') { this.setTimeoutActions() }
    return instance
  }

  setMockActions() {
    this.mock.onGet('/pitches').reply((_config: any) => {
      const response: IPitchResponse = {
        total: 2,
        page: 1,
        hasNext: false,
        hasPrev: false,
        items: mockApiPitch
      }
      return [200, JSON.stringify(response)]
    })
  }

  setErrorActions() {
    this.mock.onGet('/pitches').networkError()
  }

  setTimeoutActions() {
    this.mock.onGet('/pitches').timeout()
  }
}
