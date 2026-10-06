import {readFile} from "node:fs/promises"


const data = await readFile (new URL ("input/day-14.txt", import.meta.url), ("utf8"));
const dataOverall = data.trimEnd().split("\n").map(String);

console.log(" ");
console.log("Part 2");
console.log(" ");

// 0. Exercise

// Apply 40 steps of pair insertion to the polymer template and find the most and least common elements in the result.
// What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?


// 1. Separate Polymer from growth rules


// console.log(dataOverall)

const startingPolymer = dataOverall[0];

const growthRules = dataOverall.slice(2,);

// console.log(startingPolymer,"\n");
// console.log(growthRules)

const rules = new Map(growthRules.map((entry) => entry.split(" -> ") as [string, string]));

// console.log(rules);



// Calculate 40 steps deep only once - cache count results 

const cacheMap = new Map<string, Map<string, number>>();

function resolvePair(pair:string, stepsLeft:number){
    
    const counterMap = new Map< string, number>();

    if (stepsLeft == 0){
        return new Map();
    }

    const key = pair + stepsLeft;
    if (cacheMap.has(key)){
        return cacheMap.get(key)!;
    }

    const insert = rules.get(pair) as string;
    const pairSplit = pair.split("");
    
    counterMap.set(insert, counterMap.has(insert)?(counterMap.get(insert) as number +1):1)

    const newPair1 = pairSplit[0] + insert;
    const left = resolvePair(newPair1, stepsLeft-1);

    const newPair2 = insert + pairSplit[1]; 
    const right = resolvePair(newPair2, stepsLeft-1);
    
    for (const childMap of [left, right]){
        for (const [letter, count] of childMap){
            counterMap.set(letter, (counterMap.get(letter) ?? 0) + count);
        }
    }
   
    cacheMap.set(key, counterMap);
    return counterMap;
    

}


const ultimateCounts = new Map<string, number>();

for (const letter of startingPolymer){
    ultimateCounts.set(letter, (ultimateCounts.get(letter) ?? 0) + 1);
}

for (let i = 0; i < startingPolymer.length - 1; i++){
    const calcPair = startingPolymer[i] + startingPolymer[i + 1];

    for (const [letter, count] of resolvePair(calcPair, 40)){
        ultimateCounts.set(letter, (ultimateCounts.get(letter) ?? 0) + count);
    }
}

console.log(ultimateCounts);

console.log(Math.max(...ultimateCounts.values())- Math.min(...ultimateCounts.values()))


