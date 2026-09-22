import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-10.txt", import.meta.url), "utf8");

const stringList = data.trimEnd().split("\n").map(String);


// Parse everything in one map for later accessibility 
// [row, col, char, open/closed]

let completeMap: Array<Array<string>> = new Array();

let noCorruptLines = new Array();

let score = 0;

let openList = ["(", "[", "{", "<"];
let closedList = [")", "]", "}", ">"];
let scoreList = [3, 57, 1197, 25137];

for (let line = 0; line < stringList.length;  line++){

    let corrupted = false; // build Array with only not corrupted lines
}