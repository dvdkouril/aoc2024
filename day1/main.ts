import { inputLong, inputShort } from "./inputs.ts";
console.log("day 1");

const leftList = [];
const rightList = [];
for (const line of inputLong.split("\n")) {
	// for (const line of inputShort.split("\n")) {
	const tokens = line.split(" ").filter((s) => s !== "");
	leftList.push(Number.parseInt(tokens[0]));
	rightList.push(Number.parseInt(tokens[1]));
}
const leftListSorted = leftList.sort();
const rightListSorted = rightList.sort();

const differences = leftListSorted.map((el, i) =>
	Math.abs(el - rightListSorted[i]),
);
const sum = differences.reduce((acc, val) => acc + val, 0);

console.log(sum);

const occurences: Map<number, number> = new Map<number, number>();
for (const a of rightList) {
	const previousOcc = occurences.get(a) || 0;
	occurences.set(a, previousOcc + 1);
}
let sum2 = 0;
for (const a of leftList) {
	sum2 = sum2 + a * (occurences.get(a) || 0);
}
console.log(sum2);
