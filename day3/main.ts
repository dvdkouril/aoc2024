import { inputLong, inputLong2, inputShort } from "./inputs.ts";
console.log("day 3");

const mulOp = "mul(";
const mulOccurences: string[] = [];
let summedRes = 0;
let numOfMulFound = 0;
const doOp = "do()";
const dontOp = "don't()";
let reading = true;
for (const input of inputLong2) {
	for (let i = 0; i < input.length; i++) {
		const charWindow = input.slice(i, i + 4);
		const charWindowLonger = input.slice(i, i + 7);

		if (charWindow === doOp) {
			reading = true;
			console.log("found do()");
			continue;
		}

		if (charWindowLonger === dontOp) {
			reading = false;
			console.log("found don't()");
			continue;
		}

		if (!reading) {
			continue;
		}

		if (charWindow === mulOp) {
			numOfMulFound += 1;
			const searchWindow = 10;
			mulOccurences.push(input.slice(i, i + 4 + searchWindow));
			const operandsString = input.slice(i + 4, i + 4 + searchWindow);
			const rightParIndex = operandsString.indexOf(")");
			if (rightParIndex < 0) {
				continue;
			}
			const inside = operandsString.slice(0, rightParIndex);

			const commaIndex = inside.indexOf(",");
			const leftPart = inside.slice(0, commaIndex);
			const rightPart = inside.slice(commaIndex + 1, inside.length);
			const aStr = leftPart;
			const bStr = rightPart;
			if (!bStr) {
				continue;
			}
			if (Number.isNaN(aStr)) {
				continue;
			}
			if (
				!aStr
					.split("")
					.every((el, i) =>
						el.charCodeAt(0) >= 48 && el.charCodeAt(0) <= 57
					)
			) {
				continue;
			}
			if (
				!bStr
					.split("")
					.every((el, i) =>
						el.charCodeAt(0) >= 48 && el.charCodeAt(0) <= 57
					)
			) {
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
