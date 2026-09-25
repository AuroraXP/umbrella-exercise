import { readFile } from "node:fs/promises";

const data = await readFile(new URL(("input/day-12.txt"), import.meta.url), ('utf8'));
const dataLines = data.trimEnd().split("\n").map(String);

let caveSystem = new Map();
const parseCaves = new Array();
const smallCaves = new Array();

// console.log(dataLines)

// small letters - small caves / large letters - large caves (visit small caves only once)
// Exercise: Find all ways through the caves (start - end)

for (const n of dataLines){
    const splitLines = n.split("-");
    const cave1 = splitLines[0];
    const cave2 = splitLines[1];

    const isSmall = (cave: string) => cave === cave.toLowerCase();
    if (isSmall(cave1) && !smallCaves.includes(cave1)){
        smallCaves.push(cave1);
    }
    if (isSmall(cave2) && !smallCaves.includes(cave2)){
        smallCaves.push(cave2);
    }

    parseCaves.push([cave1, cave2]);
    parseCaves.push([cave2, cave1]);

}

// console.log(parseCaves);

let options = true;

let pathsLongGone = new Array();

while (options == true){

    let visitedSmalls = new Array();
    let buildStack = new Array();

    for (const [cave1, cave2] of parseCaves){

        if (buildStack.length == 0){
          buildStack.push('start');  
        }

        let caveHere = buildStack[buildStack.length-1]
        // console.log(caveHere)
        // options = false



    }


}



