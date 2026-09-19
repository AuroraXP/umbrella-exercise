import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-6.txt", import.meta.url), "utf8");

const fishData = data.trimEnd().split(",").map(Number);

console.log(" ");
console.log("Part 1");
console.log("Amount of fish at the beginning: ", fishData.length);
console.log(" ");


let fishList = fishData.slice();


// Fish multiply every 7 days - fish amount after 80 days 
// new fish multiply after 9 days 

for (let d = 0; d < 80; d++){
    for (let i = 0; i < fishList.length; i++){
        fishList[i] = fishList[i] - 1;
        if ( fishList[i] < 0) {
            fishList.push(9);
            fishList[i] = 6;
            }
      }
}


console.log("The amount of fish after 80 days is: ", fishList.length)
console.log(" ");
console.log(" ");
console.log("Part 2");
console.log(" ");



let ultimateFishList = fishData.slice();


const fishCache = new Map;  // build map for combinations (avoid repeats) - takes too long otherwise

function countChildren(fishTimer:number, daysLeft: number): number {

    if (fishTimer > daysLeft){
            return 1
        }    

    let key = `${fishTimer},${daysLeft}`;

    if (fishCache.has(key)){
        return fishCache.get(key)
    }

    // Count the amount of children each fish is able to produce - for each function call
    const amountOfChildren = Math.floor((daysLeft - (fishTimer + 1)) / 7) + 1;
    let totalChildren = 1;    

    for (let children = 0; children < amountOfChildren; children++){
        let timeLeft = daysLeft - (fishTimer + 1 + 7 * children);        
        totalChildren += countChildren(8, timeLeft);
    }

    fishCache.set(key, totalChildren);

    return totalChildren;

}

let sumOfFishes = 0;

for (let timer of ultimateFishList){

    let childrenNumber = countChildren(timer, 256);
    sumOfFishes += childrenNumber;

}

console.log("The amount of invincible, ultimate fishes after 256 days is: ", sumOfFishes);


