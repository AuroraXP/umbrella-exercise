
import { readFile } from "node:fs/promises";

const inputData = await readFile(new URL("input/day-1.txt", import.meta.url), "utf8");
const numbers = inputData.trimEnd().split("\n").map(Number);

// console.log(numbers)

// Part 1

// count increased numbers comparing to previous

let counter = 0

for (let n = 0; n < numbers.length; n++){
    if (n != 0){
        if (numbers[n-1] < numbers[n]){
            counter++
        }     
    }
}
console.log(" ")
console.log("Part 1")
console.log("The number of increasing floor depth data: ", counter)
console.log(" ")

// Part 2


let threefoldCounter = 0;
let previousTrio = 0;
let currentTrio = 0;

for (let n = 3; n < (numbers.length); n++){

    previousTrio = numbers[n - 3] + numbers[n - 2] + numbers[n - 1];
    currentTrio = numbers[n - 2] + numbers[n - 1] + numbers[n];


    if (previousTrio < currentTrio){
        threefoldCounter++
    }     

}

console.log(" ")
console.log("Part 2")
console.log("The number of increasing floor depth data with trio-calculation: ", threefoldCounter)
console.log(" ")