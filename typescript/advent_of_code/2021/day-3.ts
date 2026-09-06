import { count } from "node:console";
import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-3.txt", import.meta.url), ("utf8"));
const binaryLines = data.trimEnd().split("\n").map(String);


// PART 1

// console.log(binaryLines)
let counterList: number[] = [];

for (let n = 0; n < binaryLines[0].length; n++){
    counterList.push(0)};


// console.log(counterList)



for (let line = 0; line < binaryLines.length; line++){

    for (let i = 0; i < binaryLines[0].length; i++){
        
        let number = binaryLines[line][i];

        if (number == "1"){
            counterList[i] = counterList[i] + 1
        }
    }
}


console.log(" ")
console.log("Part 1")
console.log(" ")
console.log("The List showing the amount of ones in the data columns is: ")
console.log(counterList)
console.log(" ")


let gammaRate = ""
let epsilonRate = ""

for (let i = 0; i < binaryLines[0].length; i++){
    if (counterList[i] > (binaryLines.length/2)){
        gammaRate = gammaRate.concat("1".toString());
        epsilonRate = epsilonRate.concat("0".toString());
    }
    else{
        gammaRate = gammaRate.concat("0".toString());
        epsilonRate = epsilonRate.concat("1".toString());

    }   
}

let gammaRateAmount = parseInt(gammaRate, 2);
let epsilonRateAmount = parseInt(epsilonRate, 2);


console.log("The calculated gamma rate is: ",gammaRate, "Number: ", gammaRateAmount)
console.log("The calculated epsilon rate is: ",epsilonRate, "Number: ", epsilonRateAmount)
console.log(" ")

console.log("The power consumption of the submarine is: ", gammaRateAmount*epsilonRateAmount)
console.log(" ")


