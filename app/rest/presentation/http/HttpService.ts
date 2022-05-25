import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'
import { inject } from 'inversify-props'
import { err, Result } from 'neverthrow'
import { ParseError } from '../parseError'
import { HttpError } from './HttpError'

type IHttpRequest = {
  url: string
  config?: AxiosRequestConfig
  data?: any
}

// FailableParser is just a parser wrapped in a result
type FailableParser<T, M> = (_: T) => Result<M, ParseError>

type Parser<T, M> = {
  parseTo: FailableParser<T, M>
}

export interface IHttpService {
  initService(baseUrl: string): void
  get<T, M>(request: IHttpRequest, parser: Parser<T, M>): Promise<Result<M, ParseError | HttpError>>
  post<T, M>(request: IHttpRequest, parser: Parser<T, M>): Promise<Result<M, ParseError | HttpError>>
}

export interface IAxiosCreator {
  createAxiosInstance(baseUrl: string): AxiosInstance
}

export class AxiosCreator implements IAxiosCreator {
  createAxiosInstance(baseUrl: string): AxiosInstance {
    return axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export class HttpService implements IHttpService {
  private axiosService: AxiosInstance
  private axiosCreator: AxiosCreator

  constructor(@inject() axiosCreator: AxiosCreator) {
    this.axiosCreator = axiosCreator
    this.axiosService = axios.create()
  }

  initService(baseUrl: string): void {
    this.axiosService = this.axiosCreator.createAxiosInstance(baseUrl)
    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  public async get<T, M>(
    { url, config }: IHttpRequest,
    parser: Parser<T, M>
  ): Promise<Result<M, ParseError | HttpError>> {
    try {
      const response = await this.axiosService.get<T>(url, config)
      return this._parseFailable<T, M>(response.data, parser.parseTo)
    } catch (error: any) {
      if (this.isAxiosError(error)) {
        const httpError = error.response
          ? HttpError.fromStatus(error.response.status, error.message)
          : HttpError.fromMessage(error.message)

        return err(httpError)
      }
      throw error
    }
  }

  public async post<T, M>(
    { url, data, config }: IHttpRequest,
    parser: Parser<T, M>
  ): Promise<Result<M, ParseError | HttpError>> {
    try {
      const response = await this.axiosService.post<T>(url, data, config)
      return this._parseFailable<T, M>(response.data, parser.parseTo)
    } catch (error: any) {
      if (this.isAxiosError(error)) {
        const httpError = error.response
          ? HttpError.fromStatus(error.response.status, error.message)
          : HttpError.fromMessage(error.message)

        return err(httpError)
      }

      throw error
    }
  }

  private _parseFailable<T, M>(
    data: T,
    parser: FailableParser<T, M>
  ): Result<M, ParseError> {
    try {
      return parser(data)
    } catch (error: any) {
      // Exceptions (not errors) could happen when parsing. We capture them and
      // treat them as parsing errors.
      const parseError = new ParseError(error.message)
      return err(parseError)
    }
  }

  private _initializeRequestInterceptor() {
    this.axiosService.interceptors.request.use(this._handleRequest)
  }

  private _initializeResponseInterceptor() {
    this.axiosService.interceptors.response.use(this._handleResponse)
  }

  private _handleRequest(config: AxiosRequestConfig) {
    // get this from a cookie, or whatever
    // config.headers.Authorization = 'Bearer ...'
    return config
  }

  private _handleResponse(response: AxiosResponse): AxiosResponse {
    return response
  }

  private isAxiosError(error: Error): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined
  }
}
