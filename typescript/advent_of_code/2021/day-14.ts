import {readFile} from "node:fs/promises"
import { start } from "node:repl";

const data = await readFile (new URL ("input/day-14.txt", import.meta.url), ("utf8"));
const dataOverall = data.trimEnd().split("\n").map(String);

console.log(" ");
console.log("Part 1");
console.log(" ");

// 0. Exercise

// Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result.
// What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?


// 1. Separate Polymer from growth rules


// console.log(dataOverall)

const startingPolymer = dataOverall[0];

const growthRules = dataOverall.slice(2,);

// console.log(startingPolymer,"\n");
// console.log(growthRules)



// 2. Build growth function (build pairs, end of one pair = start of next pair)

function growPolymer (polymer:String, growthRules:Array<String>):String{

    let newPolymer = polymer;

    for (let i = 0; i < newPolymer.length-1; i = i + 2){
        
        const pair = newPolymer[i] + newPolymer[i+1];

        for (let rule of growthRules){

            const split = rule.split(" -> ")
            const rulePair = split[0];
            const middleObj = split[1];

            if (pair == rulePair){

                newPolymer = newPolymer.slice(0,i+1) + middleObj + newPolymer.slice(i+1, )
                break                
            }

        }
    }

return newPolymer
}


// 3. Check logic

// console.log(startingPolymer, "\n")
// console.log(growPolymer(startingPolymer, growthRules))


//4. Build 10 step loop 

let polymer:String = startingPolymer;

for (let i = 0; i < 10; i++){

    let grownPolymer = growPolymer(polymer, growthRules);
    polymer = grownPolymer
}

console.log("The number of elements in the polymer after 10 steps is: " , polymer.length);



// 5. What different characters are included in the string?

let uniqueChars = new Array();

for (let char of polymer){

    if (uniqueChars.includes(char)){
        continue
    }
    else{
        uniqueChars.push(char);
    }
}

console.log("The unique elements of the polymer are: ", uniqueChars);



// 6. Count

let charCountArr = new Array();

for (let u of uniqueChars){

    let charCount = 0;
    
    for (let char of polymer){
        if (char == u){

            charCount ++;

        }
    }

    charCountArr.push(charCount);
}

console.log("The amount of the different elements found after 10 growth steps is: " , charCountArr)



// 7.  Calculate max - min

let max = Math.max(...charCountArr);
let min = Math.min(...charCountArr);

console.log("The answer for Part 1 is: ", max - min);

const controlMap = uniqueChars.map((entry, index) => [entry, charCountArr[index]] as [string, number]);

console.log(new Map(controlMap));


// --------------------------------------------------------------------------------------------------------------------


console.log(" ");
console.log("Part 2");
console.log(" ");

// Calculate for 40 steps


console.log(startingPolymer)
const rules = new Map(growthRules.map((entry) => entry.split(" -> ") as [string, string]));

console.log(rules)

const learningMap = new Map();
// learning Map build: "pair" => [number of steps, resulting growth] (necessary for how log?)

const counterMap = new Map<string,number>();


let poly = startingPolymer.slice();




function deriveBuild(pair:string, stepsLeft:number){

    if (learningMap.has(pair)){

        let [steps, growth] = learningMap.get(pair);

        if (steps >= stepsLeft){
            let derive = Number(steps) - stepsLeft

            // console.log(growth) // testing function
            // console.log(steps)
            // console.log(stepsLeft)

            for (let i = 0; i < derive; i++){
                for (let p = 1; p < growth.length; p ++){
                    growth = growth.slice(0,p) + growth.slice(p+1,);
                }
            }
            // console.log(growth)
            return growth;
        }
    }
}










