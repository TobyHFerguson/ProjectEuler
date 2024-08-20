 const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

module.exports = {
    isPrime
}


function* nextCandidate(familySize) {
    var candidate = 11;
    while (true) {
        while (!isPrime(candidate) || !containsReplacement(familySize, candidate)) {
            candidate +=2
        }
        yield candidate;
        candidate += 2;
    }
}

const gen = nextCandidate(6);
for (let i = 0; i < 100; i++) {
    console.log(gen.next().value);
}

function containsReplacement(familySize, candidate) {
    const replacement = 10 - familySize;
    const c = String(candidate)
    for (var i = 0; i < c.length; i++) {
        const digit = Number(c[i])
        if (digit <= replacement) return true;
    }
    return false
}


function containsReplacementTests() {
    const t1 = containsReplacement(10, 123456789)
    console.log('Expecting false: ', t1)
    const t2 = containsReplacement(10, 1234567890)
    console.log('Expecting true', t2)
    const t3 = containsReplacement(9, 2345678)
    console.log('Expecting false: ', t3)

    const t4 = containsReplacement(9, 1234)
    console.log('Expecting true', t4)
}

console.log(containsReplacement(10, 3))

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
function findSubsets(nums, n) {
    // Loop through all possible subsets using bit manipulation
    const numSubsets = (1 << n);
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
        console.log(`i: ${i}`, subset);
    }
}

// Driver Code
// let arr = [1, 2, 3];
// let n = arr.length;
// findSubsets(arr, n);


