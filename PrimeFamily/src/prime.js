const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

/**
 * Return the next candidate number, gauranteeing that it is prime and contains digits
 * low enough to accommodate the given family size
 * @param {number} familySize the smallest number of possible replacements
 */
function* nextCandidate(familySize) {
    var candidate = 3;
    while (true) {
        while (!isPrime(candidate) || !containsReplacement(familySize, candidate)) {
            candidate += 2
        }
        const x = yield candidate;

        candidate = x ? (x % 2 !== 0 ? x : x + 1) : candidate + 2;
    }
}



/**
 * Determine if a given candidate number contains replacement digits for a given family size
 * 
 * Basically, the number needs to contain digits which are low enough to allow for the number of replacements (which is what family size means).
 * 
 * e.g. if I have a number 45 then 4 would be the lowest replacement, allowing me to replace with 4,5,6,7,8,9 (i.e a family size of 6). 
 * 
 * @param {number} familySize the size of the prime family
 * @param {number} candidate the number which might have replacements in it
 * @returns true iff the given candidate contains one or more digits which can be replaced given the family size
 */
function containsReplacement(familySize, candidate) {
    if (familySize > 10) {
        throw Error(`familySize too large (${familySize}). It must be <= 10`)
    }
    const replacement = 10 - familySize;
    const c = String(candidate)
    for (var i = 0; i < c.length; i++) {
        const digit = Number(c[i])
        if (digit <= replacement) return true;
    }
    return false
}

/**
 * Return the Replaceable Candidate Indices - those indices in the given number that can be replaced,
 * given the family size
 * @param {number} familySize the family size
 * @param {number} candidate the candidate number
 * @returns {array[number]} the indices of the replaceable digits
 */
function getRCI(familySize, candidate) {
    const RCI = {}
    const replacement = 10 - familySize;
    const c = String(candidate)
    for (var i = 0; i < c.length; i++) {
        const digit = Number(c[i])
        if (digit <= replacement) {
            if (RCI[digit]) {
                RCI[digit].push(i)
            } else {
                RCI[digit] = [i]
            }
        }
    }
    return RCI
}


/**
 * Return the powerset of the given set
 * @param {number[]} set the set of numbers
 * @returns 
 */
function powerset(set) {
    // Loop through all possible subsets using bit manipulation
    const result = []
    const n = set.length;
    const numSubsets = (1 << n); // 2^^n
    for (let i = 0; i < numSubsets; i++) {
        // Loop through all elements of the input array
        const subset = []
        for (let j = 0; j < n; j++) {
            // Check if the jth bit is set in the current subset
            if ((i & (1 << j)) !== 0) {
                // If the jth bit is set, add the jth element to the subset
                subset.push(set[j])
            }
        }
        result.push(subset)
    }
    return result;
}

/**
 * generateFamily - from a number, an list of positions to be substituted, generate the corresponding 
 * family of prime numbers
 * 
 * @param {number} number the number from which to generate the family
 * @param {number[]} indices the indices of the digits to be replaced
 * @return {number[]} the family of prime numbers
 */
function generateFamily(number, indices) {
    const result = []
    for (i = 0; i<10; i++) {
        const n =  replaceDigits(number, indices, i)
        if (!result.includes(n)) result.push(n)
    }
    return result;
}
/**
 * Replace the digits in the given number at the given positions with the replacement digit
 * @param {number} number the number whose digits are to be replaced
 * @param {number[]} positions the positions within number where replacemet is to occur
 * @param {number} replacement the digit that is the replacement
 * @returns 
 */
function replaceDigits(number, positions, replacement) {
    if (positions.length === 0) return number;
    const x = [...String(number)];
    const r = String(replacement);
    for (var i of positions) {
        if ((i === 0 && replacement === 0) || (i > x.length - 1)) continue
        x[i] = replacement;
    }
    const result = Number(x.join(''));
    return result;
}
/**
 * Determine if prime family of the given size can be generated from the given candidate
 * @param {number} candidate
 * @param {number} familySize 
 * @returns true iff a prime family of the given size can be generated from the given candidate
 */
function checkCandidate(candidate, familySize) {
    return true;
}
module.exports = {
    isPrime,
    containsReplacement,
    nextCandidate,
    getRCI,
    replaceDigits,
    powerset,
    generateFamily,
    checkCandidate
}



