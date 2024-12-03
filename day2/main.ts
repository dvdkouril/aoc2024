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

// for (const numLine of numbers) {
// 	const lineRes = numLine.reduce((prev, val) => prev - val, 0);
// 	console.log(lineRes);
// }

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
