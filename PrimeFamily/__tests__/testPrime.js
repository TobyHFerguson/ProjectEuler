const prime = require('../src/prime')

describe('Some Tests', () => {
    describe('tests of isPrime()', () => {
        it('should find a prime', () => {
            expect(prime.isPrime(3)).toBeTruthy()
            expect(prime.isPrime(43)).toBeTruthy()
            expect(prime.isPrime(56003)).toBeTruthy()
        })
    })
    describe('tests of containsReplacement()', () => {
        it('should not contain a replacment', () => {
            expect(prime.containsReplacement(10, 123456789)).toBeFalsy()
            expect(prime.containsReplacement(9, 2345678)).toBeFalsy()
            expect(prime.containsReplacement(8, 3)).toBeFalsy()
            expect(prime.containsReplacement(8, 345)).toBeFalsy()
        })
        it('should contain a replacement', () => {
            expect(prime.containsReplacement(10, 1234567890)).toBeTruthy()
            expect(prime.containsReplacement(8, 0)).toBeTruthy()
            expect(prime.containsReplacement(8, 1)).toBeTruthy()
            expect(prime.containsReplacement(8, 2)).toBeTruthy()
            expect(prime.containsReplacement(8, 120)).toBeTruthy()
            expect(prime.containsReplacement(6,45)).toBeTruthy()
        })
    })
})