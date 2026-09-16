import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-4.txt", import.meta.url), ("utf8"));
const lines = data.trimEnd().split("\n").map(String);

console.log(lines)

// Part 1

console.log(" ");
console.log("Part 1");
console.log(" ");

// Parse drawn numbers

const numbers = String(lines[0]);
const drawnNumbers = numbers.split(",");
const calledNumbers = []

for (let n = 0; n < drawnNumbers.length; n++){
    calledNumbers.push(Number(drawnNumbers[n]));
}


console.log("Drawn numbers are: ", calledNumbers);


// Parse boards to map

let bingoBoards = new Map();
let counter = 0;
let boards: string[] = [];


for ( let i = 2; i < lines.length; i++){
    
    if (lines[i] != ''){
        boards.push(lines[i]);
    }

    if (lines[i] == '' || i == lines.length-1) {
        let numberBoards: Array<number>[] = [];
        let stringLine: string[] = [];

        // Separate boards to numbers 
        for (let n = 0; n < boards.length; n++){

            stringLine = boards[n].trim().split(/\s+/);            
            let numberLine: number[] = [];

            for (let m = 0; m < stringLine.length; m++){
                numberLine[m] = Number(stringLine[m])
            }

            numberBoards.push(numberLine)
        }

        bingoBoards.set(counter, numberBoards);
        counter = counter + 1
        boards = []
    }
}

// Mapped boards using number arrays for each line 

// console.log(bingoBoards);

// Winning logic : whole line/row required - first board as output 
// Check all rows, check all lines (first with numbers matching all wins)

let winningBoard = 200;
let winningDraw = 200;

outer: for(let draw = 4; draw < calledNumbers.length; draw++){

        // List of already drawn numbers
        let calledList = [];

        for(let d = 0; d <= draw; d++){
            calledList.push(calledNumbers[d])
        }

        let vCounter = 0 

        for(const v of bingoBoards.values()){

            // Check rows
            for(const s of v){
                let rowFive = 0

                for(const number of s){
                    if (calledList.includes(number)){
                        rowFive = rowFive + 1
                    }
                }
                if (rowFive == 5){
                    winningBoard = vCounter
                    winningDraw = draw
                    break outer;
                }
            }

            // Check columns
                for(let i = 0; i < v.length; i++){  
                    let colFive = 0
                    for(const s of v){
                        if (calledList.includes(s[i])){
                            colFive = colFive + 1
                        }
                    if (colFive == 5){
                        winningBoard = vCounter
                        winningDraw = draw
                        break outer;
                    }
                }
            }

            vCounter = vCounter + 1
        }   
        

}
console.log("")
console.log(" Considering all Boards - Columns and Rows - the first winning board is: ", winningBoard,"\n","With draw: ",  winningDraw);
console.log("")
console.log(" Calculate the winning score: ...", "\n")


// Define winning Board data
const goldBoard = bingoBoards.get(winningBoard);


// Calculate sum of unmarked numbers

let markedNumbers = [];
for(let n = 0; n < 25; n++){
    markedNumbers.push(calledNumbers[n])
}

let sumOfUnmarked = 0

for (const s of goldBoard){
    for(const n of s){
        if (markedNumbers.includes(n)){
            continue
        }
        else{
            sumOfUnmarked = sumOfUnmarked + n
        }
    }
}

// multiply by last drawn value

console.log("The final score is: ", sumOfUnmarked * calledNumbers[winningDraw])

// Part 2

console.log(" ");
console.log(" ");
console.log(" ");

console.log("Part 2");
console.log(" ");

let losingBoard = 200;
let losingDraw = 200;
let winList: number[] = [];

console.log(" The number of boards is: ", bingoBoards.size);


loser: for(let draw = 4; draw < calledNumbers.length; draw++){

    // List of already drawn numbers
    let calledList = [];

        for(let d = 0; d <= draw; d++){
            calledList.push(calledNumbers[d]);
        }

        let vCounter = 0;

        for(const v of bingoBoards.values()){

            // Check rows
            for(const s of v){
                let rowFive = 0;

                for(const number of s){
                    if (calledList.includes(number)){
                        rowFive = rowFive + 1;
                    }
                }
                if (rowFive == 5){
                    winningBoard = 0;
                    winningBoard = vCounter;
                    winningDraw = draw;
                    if (winList.includes(winningBoard)){
                        continue
                    }
                    else{
                        winList.push(winningBoard);
                    }
                }
            }

            // Check columns
                for(let i = 0; i < v.length; i++){  
                    let colFive = 0;
                    for(const s of v){
                        if (calledList.includes(s[i])){
                            colFive = colFive + 1;
                        }
                    if (colFive == 5){

                        winningBoard = 0;
                        winningBoard = vCounter;
                        winningDraw = draw;

                        if (winList.includes(winningBoard)){
                            continue
                        }
                        else{
                            winList.push(winningBoard);
                        }
                    }
                }
            }

            vCounter = vCounter + 1;

            if (winList.length == bingoBoards.size){
                losingBoard = winningBoard;
                losingDraw = winningDraw;
                break loser;
            }
        }   
}

console.log(" ");
console.log(" The losing board is: ", losingBoard," | After draw: ", losingDraw)
console.log(" ");


// Define winning Board data
const coldBoard = bingoBoards.get(losingBoard);


// Calculate sum of unmarked numbers

let marked = [];
for(let n = 0; n < losingDraw+1; n++){
    marked.push(calledNumbers[n])
}

let sum = 0

for (const s of coldBoard){
    for(const n of s){
        if (marked.includes(n)){
            continue
        }
        else{
            sum= sum + n
        }
    }
}
console.log("The final score is: ", sum * calledNumbers[losingDraw])
