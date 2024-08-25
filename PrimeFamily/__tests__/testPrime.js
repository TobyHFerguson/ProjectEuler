const prime = require('../src/prime')

describe('Some Tests', () => {

    describe('generateFamily() tests', () => {
        it('should replace the last digit', () => {
            const expected = [10, 11,12, 13, 14, 15, 16,17, 18, 19]
            const actual = prime.generateFamily(11, [1])
            expect(actual).toEqual(expected)
        })
        it('should replace the first digit', () => {
            const expected = [11, 21, 31, 41, 51, 61, 71, 81, 91]
            const actual = prime.generateFamily(11, [0])
            expect(actual).toEqual(expected)
        })
    })
    describe('replaceDigits() tests', () => {
        it('should return original number if no positions provided', () => {
            const expected = 123
            const actual = prime.replaceDigits(123, [], 9)
            expect(actual).toEqual(expected)
        })
        it('should replace left most digit', () => {
            const expected = 923
            const actual = prime.replaceDigits(123, [0], 9)
            expect(actual).toEqual(expected)
        })
        it('should replace rightmost digit', () => {
            const expected = 13;
            const actual = prime.replaceDigits(11, [1], 3)
            expect(actual).toEqual(expected);
        })
        it('should replace adjacent digits', () => {
            const expected = 1331;
            const actual = prime.replaceDigits(1111, [1,2], 3)
            expect(actual).toEqual(expected);
        })
        it('should replace non-adjacent digits', () => {
            const expected = 1331;
            const actual = prime.replaceDigits(3333, [0,3], 1)
            expect(actual).toEqual(expected);
        })
        it('should not replace the leading digit with a 0', () => {
            const expected = 3330;
            const actual = prime.replaceDigits(3333, [0,3], 0)
            expect(actual).toEqual(expected);
        })
        it('should ignore any positions not within the given number', () => {
            const expected = 133;
            const actual = prime.replaceDigits(333, [0,3], 1)
            expect(actual).toEqual(expected);
        })
    })
    describe('powerset() tests', () => {
        it('should return an empty set given an empty set', () => {
            const expected = [[]]
            const testCase = []
            const result = prime.powerset(testCase)
            expect(result).toEqual(expected)
        })
        it('should return the powerset', () => {
            const expected = [
                [],       [ 1 ],
                [ 2 ],    [ 1, 2 ],
                [ 3 ],    [ 1, 3 ],
                [ 2, 3 ], [ 1, 2, 3 ]
              ]
            const testCase = [1,2,3]
            const result = prime.powerset(testCase)
            expect(result).toEqual(expected)

        })
    })
    describe('getRCI() tests', () => {
        it('should detect a single digit', () => {
            const expected = {1: [2]};
            const actual = prime.getRCI(9,881)
            console.log(actual);
            expect(actual).toEqual(expected);
        })
        it('should detect a middle digit', () => {
            const expected = {1: [1]};
            const actual = prime.getRCI(9,818)
            expect(actual).toEqual(expected);
        })
        it('should detect a leading digit', () => {
            const expected = {1:[0]};
            const actual = prime.getRCI(9,188)
            expect(actual).toEqual(expected);
        })
        it('should detect several digits', () => {
            const test = 1181811
            const expected = {1: [0, 1, 3, 5, 6 ], 8:[2,4]}
            const actual = prime.getRCI(2,test)
            expect(actual).toEqual(expected)
        })
    })
    describe('tests of nextCandidate()', () => {
        it('should start at 3, if family size is <= 7 (candidates must contain digits [0,3])', () => {
            var actual = prime.nextCandidate(7).next().value;
            const expected = 3
            expect(actual).toBe(expected)
        })
        it('should start at 11, if family size is 9 (candidates must contain digits 0 or 1)', () => {
            var actual = prime.nextCandidate(9).next().value;
            const expected = 11;
            expect(actual).toBe(expected)
        })
        it('should generate numbers that are prime, and contain digits 0 or 1, if family size is 9', () => {
            var gen = prime.nextCandidate(9);
             const expected = [11, 13, 17, 19]
             expected.forEach(e => expect(gen.next().value).toBe(e)) 
        })
        it('should restart at the given number', () => {
            var gen = prime.nextCandidate(9);
            gen.next();
            var actual = gen.next(16).value;
            expect(actual).toBe(17) 
        })
    })
    describe('tests of isPrime()', () => {
        it('should find a prime', () => {
            expect(prime.isPrime(3)).toBeTruthy()
            expect(prime.isPrime(43)).toBeTruthy()
            expect(prime.isPrime(56003)).toBeTruthy()
        })
    })
    describe('tests of containsReplacement()', () => {
        it('should not contain a replacment', () => {
            expect(() => prime.containsReplacement(11, 123456789)).toThrow()
            expect(prime.containsReplacement(9, 234567)).toBeFalsy()
            expect(prime.containsReplacement(10, 1)).toBeFalsy()
            expect(prime.containsReplacement(8, 3)).toBeFalsy()
            expect(prime.containsReplacement(8, 345)).toBeFalsy()
            expect(prime.containsReplacement(7,45)).toBeFalsy()

        })
        it('should contain a replacement', () => {
            expect(prime.containsReplacement(1, 1234567890)).toBeTruthy()
            expect(prime.containsReplacement(10, 0)).toBeTruthy()
            expect(prime.containsReplacement(8, 0)).toBeTruthy()
            expect(prime.containsReplacement(8, 1)).toBeTruthy()
            expect(prime.containsReplacement(8, 2)).toBeTruthy()
            expect(prime.containsReplacement(8, 120)).toBeTruthy()
            expect(prime.containsReplacement(6,45)).toBeTruthy();
            expect(prime.containsReplacement(5,45)).toBeTruthy()

        })
    })
})