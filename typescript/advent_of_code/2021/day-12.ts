import { readFile } from "node:fs/promises";

const data = await readFile(new URL(("input/day-12.txt"), import.meta.url), ('utf8'));
const dataLines = data.trimEnd().split("\n").map(String);

let caveSystem = new Map();
const parseCaves = new Array();

// console.log(dataLines)

// small letters - small caves / large letters - large caves (visit small caves only once)
// Exercise: Find all ways through the caves (start - end)

