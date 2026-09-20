import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-7.txt", import.meta.url), "utf8");

const crabPositions = data.trimEnd().split(",").map(Number);

console.log(" ");
console.log("Part 1");
console.log(" ");

// Least amount of movement necessary - solved with median

// console.log(crabPositions);

let sortedCrab = crabPositions.sort((a,b) => a-b);

let median = sortedCrab[Math.floor(sortedCrab.length/2)]

let necessaryFuel = 0;

for (let n of crabPositions){
    let fuel = Math.max(n, median) - Math.min(n, median);
    necessaryFuel += fuel
}

console.log("The least possible amount of fuel is: ", necessaryFuel)

console.log(" ");
console.log("Part 2");
console.log(" ");

// Least amount of Fuel necessary, with linear growth of fuel requirement for movement

// Least amount of multiple steps

let positionSum = 0;

for (let i = 0; i < crabPositions.length; i++){
    positionSum += crabPositions[i];
}

let mean = Math.floor(positionSum/crabPositions.length)

let requiredFuel = 0;

for (let n of crabPositions){
    let fuelSteps = Math.max(n, mean) - Math.min(n, mean);
    for (let f = 0; f <= fuelSteps; f++){    
        requiredFuel += f
    }
}

console.log("The fuel required with considering increasing amount of fuel at each step: ", requiredFuel, "\n")