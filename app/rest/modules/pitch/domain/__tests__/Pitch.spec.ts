import { Pitch } from '../Pitch'
import { mockPitchData } from './Pitch.mock'

describe('pitch', () => {
  describe('constructor', () => {
    it('should create instance with valid data', () => {
      const pitch = new Pitch(mockPitchData()[0])
      expect(pitch).toBeInstanceOf(Pitch)
    })
    it('should throw error with invalid date', () => {
      const data = mockPitchData()[0]
      const today = new Date()
      today.setFullYear(today.getFullYear() - 1)
      data.schedule = today
      expect(() => new Pitch(data)).toThrow()
    })
  })

  describe('changeState', () => {
    it('should set a new state', () => {
      const pitch = new Pitch(mockPitchData()[0])
      pitch.changeState('APPROVED')
      expect(pitch.state).toBe('APPROVED')
    })
  })

  describe('serialize', () => {
    it('should return object with correct data', () => {
      const pitch = new Pitch(mockPitchData()[0])
      expect(pitch.serialize()).toStrictEqual(mockPitchData()[0])
    })
  })
})
