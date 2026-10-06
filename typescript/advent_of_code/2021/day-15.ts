import { readFile } from "node:fs/promises"; 

const data = await readFile ( new URL ("input/day-15.txt", import.meta.url), ("utf8"));
const dataList = data.trimEnd().split("\n").map(String);

// console.log(dataList)

const chitonMap = new Map();


// chitonMap is a risk map, mapping the location of all different risks of running into a chiton
// Build chitonMap

for (let i = 0; i < dataList.length; i++){

    const numbers = dataList[i].split("");

    for( let n = 0; n < numbers.length; n++){

        let key = `${i},${n}` // row, col
        chitonMap.set(key, numbers[n]);
    }
}

console.log(chitonMap)

