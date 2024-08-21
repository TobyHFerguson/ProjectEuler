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

        candidate = x ? x : candidate + 2;
    }
}


const gen = nextCandidate(6);
for (let i = 0; i < 100; i++) {
    console.log(gen.next().value);
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
 * Return the an array of those digits in the candidate that can be replaced, given the family size
 * @param {number} familySize the family size
 * @param {number} candidate the candidate number
 * @returns {array[number]} the indices of the replaceable digits
 */
function getRCI(familySize, candidate) {
    const RCI = new Array();
    const replacement = 10 - familySize;
    const c = String(candidate)
    for (var i = 0; i < c.length; i++) {
        const digit = Number(c[i])
        if (digit <= replacement) RCI.push(i);
    }
    return RCI
}

function getRCITests() {
    console.log(getRCI(8, 101).toString())
    console.log(getRCI(8, 131).toString())
}

function getSubsets(RCI) {
    return RCI.permutations();
}




// Function to find the subsets of the given array
function findSubsets(nums) {
    // Loop through all possible subsets using bit manipulation
    const result = []
    const n = nums.length;
    const numSubsets = (1 << n); // 2^^n
    for (let i = 0; i < numSubsets; i++) {
        // Loop through all elements of the input array
        const subset = []
        for (let j = 0; j < n; j++) {
            // Check if the jth bit is set in the current subset
            if ((i & (1 << j)) !== 0) {
                // If the jth bit is set, add the jth element to the subset
                subset.push(nums[j])
            }
        }
        result.push(subset)
    }
    console.log(result);
    return result;
}

module.exports = {
    isPrime,
    containsReplacement,
    nextCandidate,
    getRCI,
    findSubsets
}
// Driver Code
// let arr = [1, 2, 3];
// let n = arr.length;
// findSubsets(arr, n);


