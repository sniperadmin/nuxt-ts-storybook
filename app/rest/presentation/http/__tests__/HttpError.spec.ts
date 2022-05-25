import { HttpError, isHttpError } from '../HttpError'

describe('HttpError', () => {
  test('should create an HTTP Error', () => {
    const input = new HttpError(404, 'message')
    expect(input).toBeInstanceOf(Error)

    expect(input.message).toStrictEqual('message')
    expect(input.name).toStrictEqual('NOT_FOUND')
    expect(input.status).toStrictEqual(404)
  })

  test('should set default message', () => {
    const input = new HttpError(404)
    expect(input.name).toStrictEqual('NOT_FOUND')
  })

  test('should identify client errors', () => {
    const clientError = new HttpError(404, 'message')
    expect(clientError.isClientError()).toBe(true)
    expect(clientError.isServerError()).toBe(false)
  })

  test('should identify server errors', () => {
    const clientError = new HttpError(503, 'message')
    expect(clientError.isServerError()).toBe(true)
    expect(clientError.isClientError()).toBe(false)
  })
})

describe('isHttpError', () => {
  test('should identify HTTP errors', () => {
    const httpError = new HttpError(400)
    expect(isHttpError(httpError)).toBe(true)
  })
})
