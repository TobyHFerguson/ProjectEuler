const prime = require('../src/prime')

describe('Some Tests', () => {
    it('should find a prime', () => {
        expect(prime.isPrime(3)).toBeTruthy()
        expect(prime.isPrime(43)).toBeTruthy()
        expect(prime.isPrime(56003)).toBeTruthy()
    })})