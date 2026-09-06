import { error } from "node:console";
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




// PART 2


console.log(" ")
console.log("Part 2")
console.log(" ")


let oxygenGen = binaryLines.slice();
let COScrubber = binaryLines.slice();



while (oxygenGen.length > 1){

    for (let i = 0; i < oxygenGen[0].length; i++){
        let counter = 0
        let keepValue: string;


        for (let line = 0; line < oxygenGen.length; line++){
           if (oxygenGen[line][i] == "1"){
            counter = counter + 1
           }
        }

        if (counter > (oxygenGen.length/2)){
            keepValue = "1";
        }

        else if (counter == (oxygenGen.length/2)){
            keepValue = "1";
        }

        else {
            keepValue = "0";
        }

        oxygenGen = oxygenGen.filter(line => line[i] === keepValue);
        
    }
}
   

const oxygenRating = oxygenGen[0]

if (oxygenGen.length != 1){
   error("Your filtering process failed! Fix it!")
}    

console.log("The oxygen generator rating: ", oxygenRating)
console.log(" ")


while (COScrubber.length > 1){

    for (let i = 0; i < COScrubber[0].length; i++){
        let counter = 0
        let keepValue: string;


        for (let line = 0; line < COScrubber.length; line++){
           if (COScrubber[line][i] == "1"){
            counter = counter + 1
           }
        }

        if (counter > (COScrubber.length/2)){
            keepValue = "0";
        }

        else if (counter == (COScrubber.length/2)){
            keepValue = "0";
        }

        else {
            keepValue = "1";
        }

        COScrubber = COScrubber.filter(line => line[i] === keepValue);
        if (COScrubber.length == 1){
            break
        }

        }
    }

const CO2Rating = COScrubber[0]

if (COScrubber.length != 1){
   error("Your filtering process failed! Fix it!")
}   

console.log("The CO2 scrubber rating: ", CO2Rating)
console.log(" ")

let oxygenRateAmount = parseInt(oxygenRating, 2);
let CO2RateAmount = parseInt(CO2Rating, 2);

console.log("The life support rating of the submarine is: ", oxygenRateAmount*CO2RateAmount)
console.log(" ")