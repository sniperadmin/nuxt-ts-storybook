import { ParseError } from '../ParseError'

// const parsedError = ParseError.fromError(new Error('error'))

const passingValidation = () => undefined
// const failingValidation = () => parsedError

describe('collectParseErrors', () => {
  xtest('should return no errors if no validations are passed', () => {
    // const collectedErrors = collectParseErrors([], 'irrelevantValue')
    // expect(collectedErrors.getErrors()).toHaveLength(0)
  })

  xtest('should return no error if validation passes', () => {
    // const collectedErrors = collectParseErrors([passingValidation], 'irrelaventValue')
    // expect(collectedErrors.getErrors()).toHaveLength(0)
  })

  xtest('should return error if validation fails', () => {
    // const collectedErrors = collectParseErrors([passingValidation], 'irrelaventValue')
    // expect(collectedErrors.getErrors()).toHaveLength(1)
    // expect(collectedErrors.getErrors()[0]).toBeInstanceOf(Error)
  })
})
