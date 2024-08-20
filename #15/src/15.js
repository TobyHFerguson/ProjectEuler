function sqArray(length, value = 1) { return Array.from({ length: length }, (_, i) => Array.from({ length: length }, (_, i) => value)) };

const a = sqArray(21, 1);

let result = a.reduce((accumulator, rowValue, rowIndex, arry) => {
	const newRow = rowValue.reduce((rowAcc, colValue, colIndex) => {
		const v = (rowIndex === 0 || colIndex === 0) ? 1 : accumulator[Math.max(0, rowIndex - 1)][colIndex] + rowAcc[Math.max(0, colIndex - 1)];
		rowAcc[colIndex] = v;
		return rowAcc
	},
		Array.from(rowValue)
	)
	accumulator[rowIndex] = newRow
	return accumulator
},
	Array.from(a))
console.log(result.at(-1).at(-1))
