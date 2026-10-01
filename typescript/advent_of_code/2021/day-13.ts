import {readFile} from "node:fs/promises"


// Data Parsing

const data = await readFile (new URL ("input/day-13.txt", import.meta.url), ("utf8"));
const dataOverall = data.trimEnd().split("\n").map(String);


// Split Puzzle Data from folding Instructions
let foldingData = false;
let rawMarkingList = new Array();
let rawFoldingInstructions = new Array();

let foldingIns = new Array()

for (let item of dataOverall){
    
    if (item == ""){
        foldingData = true;
        continue
    }

    if (foldingData == false){
        let split = item.split(",");
        rawMarkingList.push(split);
    }

    else{
        rawFoldingInstructions.push(item);
    }
}

// Testing...
// console.log(rawMarkingList)
// console.log(rawFoldingInstructions)

// Map folding instructions
for (let item of rawFoldingInstructions){

    let splitIns = item.split(" ");
    let directionalSplit = splitIns[2].split("=");

    foldingIns.push([directionalSplit[0], directionalSplit[1]]);
}

// console.log(foldingIns)

console.log(" ");
console.log("Part 1");
console.log(" ");

// Calculate puzzle data after fold (only first fold relevant for Part 1)

function fold(foldingValue:Array<string>, puzzleData:Array<Array<string>>):Array<Array<string>>{
    
    let newPuzzleData: Array<Array<string>> = new Array();
    let foldDirection = foldingValue[0];
    let foldNumber = Number(foldingValue[1]);

    if (foldDirection == "x"){
        for (let marking of puzzleData){

            const x = Number(marking[0]);

            if (x > foldNumber){
                let difference = x - foldNumber;
                let newX = foldNumber - difference;
                newPuzzleData.push([newX.toString(), marking[1]])
            }

            else{newPuzzleData.push(marking)}

        }
    }
    
    else if (foldDirection == "y"){
        for (let marking of puzzleData){

            const y = Number(marking[1]);

            if (y > foldNumber){
                let difference = y - foldNumber;
                let newY = foldNumber - difference;
                newPuzzleData.push([marking[0], newY.toString()])
            }

            else{newPuzzleData.push(marking)}

        }
    }

    return newPuzzleData

}

// Calculate first fold for Part 1

let firstPuzzleResult = fold(foldingIns[0], rawMarkingList);

// Calculate puzzle size
let sizeArrayX:Array<number> = new Array();
let sizeArrayY:Array<number> = new Array();

for (let marking of firstPuzzleResult){
    sizeArrayX.push(Number(marking[0]));
    sizeArrayY.push(Number(marking[1]));
}

let maxX = Math.max(...sizeArrayX);
let maxY = Math.max(...sizeArrayY);

// Sum up the amount of unmarked spaces



let dotCounter = 0;

for (let i = 0; i <= maxX; i++){
    for (let j = 0; j <= maxY; j++){

        let found = false;

        for (let item of firstPuzzleResult){
            if (i.toString() == item[0] && j.toString() == item[1]){
                found = true;
            }
        }

        if (found == false){continue;}
        else{
            dotCounter += 1;
        }

    }
}

// Not necessarily a good solution 

console.log("The amount of empty spaces after folding the marked List for the first time is: ", dotCounter);


console.log(" ");
console.log("Part 2");
console.log(" ");

// Finish folding and - the letters are probably the visible output -

let newPuzzle = rawMarkingList.slice();

for(let foldPart of foldingIns){
    newPuzzle = fold(foldPart, newPuzzle);
}

let sizeX:Array<number> = new Array();
let sizeY:Array<number> = new Array();

for (let marking of newPuzzle){
    sizeX.push(Number(marking[0]));
    sizeY.push(Number(marking[1]));
}

let Xmax = Math.max(...sizeX);
let Ymax = Math.max(...sizeY);


let buildShow = new Array();

for (let i = 0; i <= Ymax; i++){

    let buildRow = new String();

    for (let j = 0; j <= Xmax; j++){

        let found = false;

        for (let item of newPuzzle){
            if (i.toString() == item[1] && j.toString() == item[0]){
                found = true;
            }
        }

        if (found == false){buildRow += '.';}
        else{
            buildRow += '#';
        }

    }

    buildShow.push(buildRow);
}

// Now just read the letters!

console.log("Now just read the letters!\n\n", buildShow)
