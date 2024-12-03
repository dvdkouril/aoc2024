import { inputLong, inputShort } from "./inputs.ts";
console.log("day 1");

const numbers: number[][] = [];
for (const line of inputLong.split("\n")) {
	// for (const line of inputShort.split("\n")) {
	const tokens = line.split(" ");
	const lineNumbers = tokens.map((el) => Number.parseInt(el));
	numbers.push(lineNumbers);
}
console.log(numbers);

let numOfSafeLines = 0;
for (const numLine of numbers) {
	const onlyDecr = numLine.every((el, i) =>
		i === 0 ? true : el - numLine[i - 1] < 0,
	);
	const onlyIncr = numLine.every((el, i) =>
		i === 0 ? true : el - numLine[i - 1] > 0,
	);
	const diffIsMaxThree = numLine.every((el, i) =>
		i === 0 ? true : Math.abs(el - numLine[i - 1]) <= 3,
	);
	console.log(numLine);
	console.log(`onlyDecr: ${onlyDecr}`);
	console.log(`onlyIncr: ${onlyIncr}`);
	console.log(`diffIsMaxThree: ${diffIsMaxThree}`);
	if ((onlyIncr || onlyDecr) && diffIsMaxThree) {
		numOfSafeLines += 1;
	}
}
console.log(`safe lines: ${numOfSafeLines}`);

// function checkAll(val: number, prev: number): boolean {
// 	return (
// 		(checkIsDecr(val, prev) || checkIsIncr(val, prev)) &&
// 		checkDiffLessThan3(val, prev)
// 	);
// }

function checkIsDecr(val: number, prev: number): boolean {
	return val - prev < 0;
}

function checkIsIncr(val: number, prev: number): boolean {
	return val - prev > 0;
}

function checkDiffLessThan3(val: number, prev: number): boolean {
	const diff = Math.abs(val - prev);
	return diff <= 3 && diff >= 1;
}

function runChecks(arr: number[]): boolean {
	let allDecr = true;
	let allIncr = true;
	let allDiffOK = true;
	for (const [i, num] of arr.entries()) {
		if (i === 0) continue;
		allDecr = checkIsDecr(num, arr[i - 1]) && allDecr;
		allIncr = checkIsIncr(num, arr[i - 1]) && allIncr;
		allDiffOK = checkDiffLessThan3(num, arr[i - 1]) && allDiffOK;
	}
	const safe = (allDecr || allIncr) && allDiffOK;
	return safe;
}

console.log("part2");
let numOfActuallySafe = 0;
for (const numLine of numbers) {
	// let allDecr = true;
	// let allIncr = true;
	// let allDiffOK = true;
	// for (const [i, num] of numLine.entries()) {
	// 	if (i === 0) continue;
	// 	allDecr = checkIsDecr(num, numLine[i - 1]) && allDecr;
	// 	allIncr = checkIsIncr(num, numLine[i - 1]) && allIncr;
	// 	allDiffOK = checkDiffLessThan3(num, numLine[i - 1]) && allDiffOK;
	// }
	// const safe = (allDecr || allIncr) && allDiffOK;
	const safe = runChecks(numLine);

	console.log(numLine);
	// console.log(`safe: ${safe} (${allDecr} ${allIncr} ${allDiffOK})`);
	console.log(`safe: ${safe}`);

	let actuallySafe = false;
	for (const [i, _] of numLine.entries()) {
		const arrayWithout = numLine.toSpliced(i, 1);
		// console.log(arrayWithout);
		const nowSafe = runChecks(arrayWithout);
		if (nowSafe) {
			actuallySafe = true;
			break;
		}
	}
	console.log(`actually safe: ${actuallySafe}`);
	if (actuallySafe) {
		numOfActuallySafe += 1;
	}
}
console.log(`num of actually safe: ${numOfActuallySafe}`);
