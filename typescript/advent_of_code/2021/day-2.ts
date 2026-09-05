import { readFile } from "node:fs/promises";

const file = await readFile(new URL("input/day-2.txt", import.meta.url), "utf8");
const commands = file.trimEnd().split("\n").map(String);

// console.log(commands);

// PART 1


let horizontal = 0;
let depth = 0;


for (let n = 0; n < commands.length; n++){
    
    let ramp = commands[n].split(" ");

    let direction = ramp[0];
    let amount = Number(ramp[1]);

    if (direction == "forward"){
        horizontal = horizontal + amount
    }
    
    else if (direction == "up"){
        depth = depth - amount
    }

    else if (direction == "down"){
        depth = depth + amount
    }
}

console.log(" ")
console.log("Part 1")
console.log("The final submarine depth is: ", depth)
console.log("The final submarine horizontal position is: ", horizontal)
console.log("The multiplied answer is: ", depth*horizontal)
console.log(" ")



// PART 2

let aim = 0 
let horizontalPosition = 0
let strangeDepth = 0


for (let n = 0; n < commands.length; n++){
    
    let ramp = commands[n].split(" ");

    let direction = ramp[0];
    let amount = Number(ramp[1]);

    if (direction == "forward"){
        horizontalPosition = horizontalPosition + amount
        strangeDepth = strangeDepth + (aim * amount)
    }
    
    else if (direction == "up"){
        aim = aim - amount
    }

    else if (direction == "down"){
        aim = aim + amount
    }
}

console.log(" ")
console.log("Part 2")
console.log("The final submarine depth is: ", strangeDepth)
console.log("The final submarine horizontal position is: ", horizontalPosition)
console.log("The multiplied answer is: ", strangeDepth * horizontalPosition)
console.log(" ")
