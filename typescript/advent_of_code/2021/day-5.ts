import { NONAME } from "node:dns";
import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-5.txt", import.meta.url), ('utf8'))
const lines = data.trimEnd().split("\n").map(String)

console.log(lines);

const onlyLinesBeginX: number[] = [];
const onlyLinesBeginY: number[] = [];
const onlyLinesEndX: number[] = [];
const onlyLinesEndY: number[] = [];

// Part 1 
// Parsing only horizontal and vertical line coordinates

for (let i = 0; i < lines.length; i++){

    let completeLine = lines[i].split(" -> ");

    let lineStart = completeLine[0].split(",");
    let lineEnd = completeLine[1].split(",");

    const x1 = Number(lineStart[0]);
    const y1 = Number(lineStart[1]);
    const x2 = Number(lineEnd[0]);
    const y2 = Number(lineEnd[1]);

    if (x1 == x2 || y1 == y2){
        onlyLinesBeginX.push(x1);
        onlyLinesBeginY.push(y1);
        onlyLinesEndX.push(x2);
        onlyLinesEndY.push(y2);
    }

}

// Coordinates given, now decide the number of interceptions between the lines

// You cannot count intercepts multiple times  - Intercept amount can be decided through list length

let interceptListXY: string[] = [];

let inner1 = 0;
let inner2 = 0;


// Intercept counting

for (let i = 0; i < onlyLinesBeginX.length; i++){

    const x1 = onlyLinesBeginX[i]; // I wanted to preserve the numbers but not parsing them by height is a liability later
    const y1 = onlyLinesBeginY[i];
    const x2 = onlyLinesEndX[i];
    const y2 = onlyLinesEndY[i];

    let yi1 = 0;
    let yi2 = 0;
    let xi1 = 0;
    let xi2 = 0;


    let yj1 = 0;
    let yj2 = 0;
    let xj1 = 0;
    let xj2 = 0;


    // Including height dependency

    if(y1 <= y2){
        yi1 = y1;
        yi2 = y2;
    }

    else{
        yi1 = y2;
        yi2 = y1;
    }

    if(x1 <= x2){
        xi1 = x1;
        xi2 = x2;
    }

    else{
        xi1 = x2;
        xi2 = x1;
    }

    for(let j = i+1; j < onlyLinesBeginX.length; j++){

        const xn1 = onlyLinesBeginX[j];
        const yn1 = onlyLinesBeginY[j];
        const xn2 = onlyLinesEndX[j];
        const yn2 = onlyLinesEndY[j];
            
        if (yn1 <= yn2){
            yj1 = yn1;
            yj2 = yn2;
        }
        else{
            yj1 = yn2;
            yj2 = yn1;
            
        }

        if (xn1 <= xn2){
            xj1 = xn1;
            xj2 = xn2;
        }

        else{
            xj1 = xn2;
            xj2 = xn1;
        }

        if (x1 == x2){

            // Vertical lines on the same horizontal position

            if(xj1 == xj2 && xj1 == x1){

                // same x coordinate but missing each other due to line length


                if (yi2 < yj1){  // yi are all under tha yj
                    continue
                }

                else if(yi1 > yj2){ // yi are all over than yj
                    continue
                }

                // yi embraced by yj
                else if (yi1 > yj1 && yi2 < yj2){

                    inner2 = yi2;
                    inner1 = yi1;
                    embracedLine(interceptListXY, inner1, inner2, x1, "x");
                }

                // yj embraced by yi
                else if (yi1 < yj1 && yj2 < yi2){

                    inner2 = yj2;
                    inner1 = yj1;
                    embracedLine(interceptListXY, inner1, inner2, x1, "x");
                }

                // partially overlapping line - yi bigger

                else if (yi1 >= yj1 && yi2 >= yj2){

                    if (yi1 == yj1 && yi2 == yj2){
                        equalLines(interceptListXY, yi1, yi2, x1, "x")
                    }

                    else{
                    let smaller1 = yj1;
                    let smaller2 = yj2;
                    let bigger1 = yi1;
                    let bigger2 = yi2;

                    overlappingLine(interceptListXY, smaller1, smaller2, bigger1, bigger2, x1, "x")
                    }   
                }

                // partially overlapping line - yj bigger
                // not checking equal lines again (would have been checked before)

                else if (yi1 <= yj1 && yi2 <= yj2){
                    let smaller1 = yi1;
                    let smaller2 = yi2;
                    let bigger1 = yj1;
                    let bigger2 = yj2;

                    overlappingLine(interceptListXY, smaller1, smaller2, bigger1, bigger2, x1, "x")
                }
        
                        
            }

            // two vertical lines parallel to each other
            else if(xj1 == xj2){
                continue
            }

            // 1 vertical and 1 horizontal line (possible cross)
            // Only possible cross is at x1 - if the line size matches
            else if (yn1 == yn2){
                if ((xj1 <= x1 && xj2 >= x1) && (yi1 <= yn1 && yi2 >= yn1)){

                    if (interceptListXY.includes(String(x1) + "," + String(yn1))){
                        continue
                    }
                    else{
                        interceptListXY.push(String(x1) + "," + String(yn1));
                    }
                }
            }

        }

        if (y1 == y2){

            // Vertical lines on the same horizontal position

            if(yj1 == yj2 && yj1 == y1){

                // same x coordinate but missing each other due to line length


                if (xi2 < xj1){  // xi are all under xj
                    continue
                }

                else if(xi1 > xj2){ // xi are all over xj
                    continue
                }

                // xi embraced by xj
                else if (xi1 > xj1 && xi2 < xj2){

                    inner2 = xi2;
                    inner1 = xi1;
                    embracedLine(interceptListXY, inner1, inner2, y1, "y");
                }

                // yj embraced by xi
                else if (xi1 < xj1 && xj2 < xi2){

                    inner2 = xj2;
                    inner1 = xj1;
                    embracedLine(interceptListXY, inner1, inner2, y1, "y");
                }

                // partially overlapping line - xi bigger

                else if (xi1 >= xj1 && xi2 >= xj2){

                    if (xi1 == xj1 && xi2 == xj2){
                        equalLines(interceptListXY, xi1, xi2, y1, "y")
                    }

                    else{
                    let smaller1 = xj1;
                    let smaller2 = xj2;
                    let bigger1 = xi1;
                    let bigger2 = xi2;

                    overlappingLine(interceptListXY, smaller1, smaller2, bigger1, bigger2, y1, "y")
                    }   
                }

                // partially overlapping line - xj bigger
                // not checking equal lines again (would have been checked before)

                else if (xi1 <= xj1 && xi2 <= xj2){
                    let smaller1 = xi1;
                    let smaller2 = xi2;
                    let bigger1 = xj1;
                    let bigger2 = xj2;

                    overlappingLine(interceptListXY, smaller1, smaller2, bigger1, bigger2, y1, "y")
                }
        
                        
            }

            // two vertical lines parallel to each other
            else if(yj1 == yj2){
                continue
            }

            // 1 vertical and 1 horizontal line (possible cross)
            // Only possible cross is at x1 - if the line size matches
            else if (xn1 == xn2){
                if ((yj1 <= y1 && yj2 >= y1) && (xi1 <= xn1 && xi2 >= xn1)){

                    if (interceptListXY.includes(String(xn1) + "," + String(y1))){
                        continue
                    }
                    else{
                        interceptListXY.push(String(xn1) + "," + String(y1));
                    }
                }
            }

        }

    }
             
}

console.log(" ");
console.log("Part 1");
console.log(" ");
console.log("The amount of singular overlaps of at least two lines is: ", interceptListXY.length);


function embracedLine(interceptListXY: string[], inner1:number, inner2:number, unchangedValue:number, unchanged:string){

    let interceptValue = inner2 - inner1;
    // Amount of intercept if j inside i

    for (let n = 0; n < interceptValue+1; n++){

        let inner = inner1 + n;
        
        if (unchanged == "x"){

            if (interceptListXY.includes(String(unchangedValue) + "," + String(inner))){
                continue
            }
            else{
                interceptListXY.push(String(unchangedValue) + "," + String(inner));
            }
        }

        else if (unchanged == "y"){
            if (interceptListXY.includes(String(inner) + "," + String(unchangedValue))){
                continue
            }
            else{
                interceptListXY.push(String(inner) + "," + String(unchangedValue));
            }

        }

    }

    return interceptListXY;

}




function overlappingLine(interceptListXY: string[], smaller1: number, smaller2: number, bigger1: number, bigger2: number, unchangedValue: number, unchanged: string){
    let interceptValue = Math.abs(smaller2 - bigger1);

    for (let v = 0; v < interceptValue+1; v++){

        let value = bigger1 + v;

        if (unchanged == "x"){

            if (interceptListXY.includes(String(unchangedValue) + "," + String(value))){
                    continue
                }
            else{
                    interceptListXY.push(String(unchangedValue) + "," + String(value));
                }
            }
        
        else if (unchanged == "y"){
            if (interceptListXY.includes(String(value) + "," + String(unchangedValue))){
                    continue
                }
            else{
                    interceptListXY.push(String(value) + "," + String(unchangedValue));
                }
        }
    }

    return interceptListXY
}






function equalLines(interceptListXY:string[], overlap1: number, overlap2: number, unchangedValue: number, unchanged:string){
    
    let interceptValue = Math.abs(overlap2 - overlap1);

    for (let v = 0; v < interceptValue+1; v++){
        
        let value = overlap1 + v;

        if (unchanged == "x"){

            if (interceptListXY.includes(String(unchangedValue) + "," + String(value))){
                    continue
                }
            else{
                    interceptListXY.push(String(unchangedValue) + "," + String(value));
                }
            }
        
        else if (unchanged == "y"){
            if (interceptListXY.includes(String(value) + "," + String(unchangedValue))){
                    continue
                }
            else{
                    interceptListXY.push(String(value) + "," + String(unchangedValue));
                }
        }
    }

}

