import { expect } from 'chai'
import shuck from '../src/shuck'

describe('Shuck', () => {
  describe('when given an unnested object', () => {
    it('returns an object with the same properties with null values', () => {
      const sample = { a: 'a', b: 'b', c: 'c' }
      const result = shuck(sample)

      expect(result).to.deep.equal({
        a: null,
        b: null,
        c: null
      })
    })
  })

  describe('when given a nested object', () => {
    it('returns an object with the same nested properties with null values', () => {
      const sample = { a: 'a', b: 'b', c: { d: 'd' } }
      const result = shuck(sample)

      expect(result).to.deep.equal({
        a: null,
        b: null,
        c: {
          d: null
        }
      })
    })
  })
})
