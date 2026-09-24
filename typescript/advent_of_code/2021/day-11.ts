import { readFile } from "node:fs/promises";

const data = await readFile(new URL(("input/day-11.txt"), import.meta.url), ('utf8'));
const dataLines = data.trimEnd().split("\n").map(String);

const initOctEnergies: Array<Array<number>> = new Array();

// console.log(dataLines)

// Parse number map for initial octopus energies
for (const n of dataLines){
    const splitLines = n.split(""); // Line of split string data
    let numberLine = new Array();

    for(const m of splitLines){
        numberLine.push(parseInt(m));
    }
    
    initOctEnergies.push(numberLine); 
}

// console.log(initOctEnergies)


console.log(" ");
console.log("Part 1");
console.log(" ");

let octEnergies = structuredClone(initOctEnergies)

let numberOfFlashes = 0;


for(let time = 0; time < 100; time ++){

    for (let row = 0; row < octEnergies.length; row ++){
        for (let col = 0; col < octEnergies[row].length; col ++){
            octEnergies[row][col] += 1;
        }
    }

    let hasFlashed = new Array();
    let flashList = new Array();


    numberOfFlashes = addCountFlashes(octEnergies, numberOfFlashes, hasFlashed, flashList);
    
}

console.log("Number of flashes in 100 Days", numberOfFlashes)




console.log(" ");
console.log("Part 2");
console.log(" ");

let octopusEnergies = structuredClone(initOctEnergies)

let letThereBeLight = false;
let numberOfTime = 0;

for (let time = 0; letThereBeLight == false; time ++){
    

    let numberOfLights = 0;
    let reqNumberOfLights =  octopusEnergies.length * octopusEnergies[0].length;

    for (let row = 0; row < octopusEnergies.length; row ++){
        for (let col = 0; col < octopusEnergies[row].length; col ++){
            octopusEnergies[row][col] += 1;
        }
    }

    let hasFlashed = new Array();
    let flashList = new Array();


    addCountFlashes(octopusEnergies, numberOfFlashes, hasFlashed, flashList);
    
    for (let row = 0; row < octopusEnergies.length; row ++){
        for (let col = 0; col < octopusEnergies[row].length; col ++){
            if (octopusEnergies[row][col] == 0){
                numberOfLights += 1
            }
        }
    }

    if (numberOfLights == reqNumberOfLights){
        numberOfTime = time + 1;
        letThereBeLight = true;
        break
    }
}


console.log("Number of Time required for all octopuses to simulatiously combust is: ", numberOfTime);
console.log(" ")




function addCountFlashes(octEnergies:Array<Array<number>>, numberOfFlashes:number, hasFlashed:Array<string>, flashList:Array<Array<number>>):number{
    
    let flashyTime:boolean = false;

    for (let row = 0; row < octEnergies.length; row ++){
        for (let col = 0; col < octEnergies[row].length; col ++){
            if (octEnergies[row][col] > 9){
                flashyTime = true;
                flashList.push([row, col, octEnergies[row][col]]);
            }
        }
    }

    if (flashyTime == false){
        return numberOfFlashes;
    }

    else{
        for(let flash of flashList){

            const row = flash[0];
            const col = flash[1];
            octEnergies[row][col] = 0;

            hasFlashed.push(`${row},${col}`);
            numberOfFlashes += 1;
            
            // Define all 8 neighbors clockwise (starting with 12:00)
            const neighbors:Array<Array<number>> = [[row, col + 1], [(row + 1), (col + 1)], [(row + 1), col], [(row + 1), (col - 1)], [(row), (col - 1)], [(row - 1), (col - 1)], [(row - 1), (col)], [(row - 1), (col + 1)]]

            for (let neighbor of neighbors){

                if (neighbor[0] < 0 || neighbor[0] > 9){
                    continue;
                }

                if(neighbor[1] >= 0 && neighbor[1] <= 9){

                    const neighborRow = neighbor[0];
                    const neighborCol = neighbor[1];

                    if (hasFlashed.includes(`${neighborRow},${neighborCol}`) == false){
                        octEnergies[neighborRow][neighborCol] += 1;
                    }
                    else{continue;}
                }

                else{
                    continue;
                }
            } 
        }


        flashList.length = 0;

        return numberOfFlashes = addCountFlashes(octEnergies, numberOfFlashes, hasFlashed, flashList)

    }
}