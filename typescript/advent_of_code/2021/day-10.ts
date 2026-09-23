import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-10.txt", import.meta.url), "utf8");

const stringList = data.trimEnd().split("\n").map(String);


let noCorruptLines = new Array();

let score = 0;

let openList = ["(", "[", "{", "<"];
let closedList = [")", "]", "}", ">"];
let scoreList = [3, 57, 1197, 25137];

for (let line = 0; line < stringList.length;  line++){

    let corrupted = false; // build Array with only not corrupted lines
    let characters = stringList[line].split("");
    let stack: Array<string> = new Array();


    for(let c = 0; c < characters.length; c ++){

        let char = characters[c];

        if (openList.includes(char)){
            stack.push(char);
        }

        else {
            for(let n = 0; n < closedList.length; n++){
                if (closedList[n] == char){
                    if (stack[stack.length-1] != openList[n]){
                        corrupted = true;
                        score += scoreList[n];
                        break
                    }

                    else {
                        stack.pop();
                    }

                }
            }
        }

        if (corrupted == true){
            break
        }

    }

    if (corrupted == false){
        noCorruptLines.push(stringList[line]);
    }

}

console.log("The gathered score of the corrupt lines is: ", score)


console.log(" ");
console.log("Part 2");
console.log(" ");

let correctionScoreArray = [];

for (let line = 0; line < noCorruptLines.length;  line++){
    let correctionScore = 0;

    let characters = noCorruptLines[line].split("");
    let stack: Array<string> = new Array();


    for(let c = 0; c < characters.length; c ++){

        let char = characters[c];

        if (openList.includes(char)){
            stack.push(char);
        }

        else {
            for(let n = 0; n < closedList.length; n++){
                if (closedList[n] == char){
                    if (stack[stack.length-1] == openList[n]){
                        stack.pop();
                    }

                    else{
                        throw Error(" Corrupt Lines still in Code. ")
                    }

                }
            }
        }
    }

    if (stack.length != 0){
        
        const stackSize = stack.length

        for (let s = stackSize-1; s >= 0; s --){
            for(let n = 0; n < openList.length; n++){
                if (stack[s] == openList[n]){
                    correctionScore = (correctionScore * 5) + (n + 1); // Adjust score calculation
                    stack.pop()
                    break
                }
            }
        }

        correctionScoreArray.push(correctionScore);
    }
}

let scoreArray = correctionScoreArray.sort((a,b) => a-b);

console.log(scoreArray)

let middle = scoreArray[Math.floor(scoreArray.length/2)]


console.log("The gathered correction score of the incomplete lines is: ", middle) 
