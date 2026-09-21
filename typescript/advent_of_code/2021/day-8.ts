
//  This is actuallt a pretty interesting puzzle
//  Find unique Signal patterns - figure out the associated numbers


import { readFile } from "node:fs/promises";


const data = await readFile(new URL("input/day-8.txt", import.meta.url), ('utf8'));
const lines = data.trimEnd().split("\n").map(String);

// console.log(lines);

console.log(" ");
console.log("Part 1");
console.log(" ");

// Part 1 : In the output values, how many times do digits 1, 4, 7, or 8 appear?
// 1 : 2 letters, 4: 4 letters, 7: 3 letters, 8: 7 letters

//  Map out input and output values

const decodingMap = new Map<string, string>();


for (let line of lines){
    let split = line.split(" | ");
    decodingMap.set(split[0], split[1]);
}

// console.log(decodingMap);


let simpleDigits = 0;

for (let value of decodingMap.values()){
    let digits = value.split(" ");
    // console.log(digits);

    for (let d of digits){

        let condition = (d.length == 2 || d.length == 4 || d.length == 3 || d.length == 7);

        if (condition){
            simpleDigits += 1;
        }

    }
}


console.log(" The amount of simple Digits in the data is: ", simpleDigits)

console.log(" ");
console.log("Part 2");
console.log(" ");

// Descipher the whole code for each line and sum up all output values

// Map every number to line combinations

const codeToNumber = new Map;

codeToNumber.set("0", ["a", "c", "f", "g", "e", "b"]);
codeToNumber.set("1", ["c", "f"]);
codeToNumber.set("2", ["a", "c", "g", "e", "d"]);
codeToNumber.set("3", ["a", "c", "f", "g", "d"]);
codeToNumber.set("4", ["c", "f", "b", "d"]);
codeToNumber.set("5", ["a", "f", "g", "b", "d"]);
codeToNumber.set("6", ["a", "f", "g", "e", "b", "d"]);
codeToNumber.set("7", ["a", "c", "f"]);
codeToNumber.set("8", ["a", "c", "f", "g", "e", "b", "d"]);
codeToNumber.set("9", ["a", "c", "f", "g", "b", "d"]);


let sumOfAllResults = 0;

for (let key of decodingMap.keys()){

    const codeMap = decodingString(key);

    // scrambled letter <-> real segment - for later lookup
    const reverseMap = new Map<string, string>();
    for (const [real, scrambled] of codeMap) {
        reverseMap.set(scrambled, real);
    }

    const resultNumbers = decodingMap.get(key);   // inferred: string | undefined
    if (resultNumbers === undefined) {
        throw new Error(`No entry for key: ${key}`);
    }

    let numbers = resultNumbers.split(" ");
    let result = "";


    for (let number of numbers){
        let partialResult = "";

        for (let [digit, segments] of codeToNumber){
            if (number.length == segments.length){
                let decoded = 0;
                for (let l of number){
                    if (segments.includes(reverseMap.get(l))){
                        decoded += 1;
                    }
                }

                if(decoded == number.length){
                    partialResult = digit;
                    break;
                }
            }
        
        }

        result = result.concat(partialResult);
    }

    sumOfAllResults = sumOfAllResults + parseInt(result);
    
}


console.log("Sum of all results: ", sumOfAllResults)



// Parse all Lines

function decodingString(key: string): Map<string, string> {


        let one: string[] = [];
        let three: string[] = [];
        let four: string[] = [];
        let seven: string[] = [];
        let six: string[] = [];
        let nine: string[] = [];
        let eight: string[] = [];


        const codeMap: Map<string, string> = new Map;

        let numbers = key.split(" ");

        for (let number of numbers){
            
            if (number.length == 2){
                one = number.split("");

            }

            else if (number.length == 3){
                seven = number.split("");
            }

            else if (number.length == 4){
                four = number.split("");
            }

            else if (number.length == 7){
                eight = number.split("");
            }
        }

        for(let l of seven){
            if (one.includes(l) == false){
                codeMap.set("a", l)
                }
            }

        for (let number of numbers){
            
            if (number.length == 5 && number.includes(one[0]) && number.includes(one[1])){
                three = number.split("");
                for(let l of three){
                    if (four.includes(l) && one.includes(l) == false){
                        codeMap.set("d", l)
                    }
                }
                for(let l of three){
                    if (four.includes(l) == false && seven.includes(l) == false){
                        codeMap.set("g", l)
                    }
                }

            }

        }

        for (let l of four){
            if(three.includes(l) == false){
                codeMap.set("b", l)
            }
        }
        const d = codeMap.get("d");
        if (d === undefined) {
            throw new Error(`Could not determine segment d for: ${key}`);
        }

        for (let number of numbers) {
            if (number.length == 6 && number.includes(d)) {
            if (number.split("").includes(one[0]) && number.split("").includes(one[1])){
                nine = number.split("");
            }
            else{six = number.split("");
                for(let l of one){
                    if(six.includes(l) == false){
                        codeMap.set("c", l)
                    }

                    else{
                        codeMap.set("f", l)
                    }
                }

            }

        }

        for (let l of eight){
            if(nine.includes(l) == false){
                codeMap.set("e", l)
            }
            
        }
    
    }

    return codeMap;
}



// ####################################################################################################

// Now, because I iked this puzzle - I gave the lines separately to my friend to calculate them by hand 
// --> Similar fun as a Sudoku of sorts --> To get the results for a specific line (she was on line 4):


console.log(" ");
console.log(" ########################################## ");
console.log(" ");

console.log("If you want to solve one of those puzzles: ")
console.log("Remember: Each letter is a vertical or horizontal line:")

console.log("")
console.log(" ____            ____    ____            ____ ")
console.log("|    |      |    ___ |   ___ |   |__ |  |___  ") 
console.log("|    |      |   |            |       |      | ") 
console.log(" ____            ____    ____            ___  ")

console.log(" ____    ____    ____     ___  ")
console.log("|____        |  |____|   |__ | ") 
console.log("|    |       |  |    |       | ") 
console.log(" ____            ____     ___  ")

console.log("")
console.log("(All horizontal lines are one letter each - the vertical size is split in two)")




console.log(" ");


const PUZZLE = new Array();

for (const [key, value] of decodingMap){
    PUZZLE.push([key, value]);
}


const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;


let whatPUZZLE = randomInt(0, PUZZLE.length);  // change here depending on how far you got on your solution

console.log( "Your puzzle input is: ", PUZZLE[whatPUZZLE][0]);
console.log("")
console.log( "Now Solve: ", PUZZLE[whatPUZZLE][1]);
console.log("")

// If there is interest:
// Buld a level design ...
// Build a new level creator ... 





