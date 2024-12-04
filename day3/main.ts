import { inputLong, inputLong2, inputShort } from "./inputs.ts";
console.log("day 3");

// console.log(inputShort);
// for (const line of inputLong.split("\n")) {
// for (const line of inputShort.split("\n")) {
// 	const tokens = line.split(" ");
// 	const lineNumbers = tokens.map((el) => Number.parseInt(el));
// 	numbers.push(lineNumbers);
// }
// console.log(numbers);

const mulOp = "mul(";
const mulOccurences: string[] = [];
// const input = inputShort;
// const input = inputLong;
// const input = inputLong2;
let summedRes = 0;
const multiplicationStrings: string[] = [];
let numOfMulFound = 0;
for (const input of inputLong2) {
	for (let i = 0; i < input.length; i++) {
		const charWindow = input.slice(i, i + 4);
		if (charWindow === mulOp) {
			numOfMulFound += 1;
			const searchWindow = 10;
			mulOccurences.push(input.slice(i, i + 4 + searchWindow));
			const operandsString = input.slice(i + 4, i + 4 + searchWindow);
			// console.log("%coperands: ", "color: red");
			// console.log(`${operandsString}`);
			const tokens = operandsString.split(",");
			if (tokens.length < 2) {
				continue;
			}
			const aStr = tokens[0];
			const bStr = tokens[1].split(")")[0];
			if (aStr === "411" && bStr === "270") {
				console.log(tokens);
				console.log(`bStr: ${bStr}`);
				continue;
			}
			if (!bStr) {
				continue;
			}
			// console.log(`aStr: ${aStr}`);
			// console.log(`bStr: ${bStr}`);
			if (Number.isNaN(aStr)) {
				// console.log(`${aStr} is not a Number!`);
				continue;
			}
			if (
				!aStr
					.split("")
					.every((el, i) =>
						el.charCodeAt(0) >= 48 && el.charCodeAt(0) <= 57
					)
			) {
				// console.log("%cNOOOOT a Number!", "color: orange");
				continue;
			}
			if (
				!bStr
					.split("")
					.every((el, i) =>
						el.charCodeAt(0) >= 48 && el.charCodeAt(0) <= 57
					)
			) {
				// console.log("%cNOOOOT a Number!", "color: orange");
				continue;
			}
			const a = Number.parseInt(aStr);
			const b = Number.parseInt(bStr);
			if (a === undefined || b === undefined) {
				continue;
			}
			const res = a * b;
			summedRes += res;
			const mulStrReconstructed = `mul(${a},${b})`;
			const fullStr = charWindow + operandsString;
			if (fullStr.indexOf(mulStrReconstructed) < 0) {
				console.log(`window: ${charWindow}`);
				console.log(`should be: ${mulStrReconstructed}`);
			}
		}
	}
}
// console.log(mulOccurences);
console.log(`numOfMulFound: ${numOfMulFound}`);
console.log(`res: ${summedRes}`);
