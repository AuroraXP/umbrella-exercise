import { readFile } from "node:fs/promises";

const data = await readFile(new URL("input/day-9.txt", import.meta.url), "utf8");

const stringList = data.trimEnd().split("\n").map(String);


console.log(" ");
console.log("Part 1");
console.log(" ");

// Build matrix - row and columns

let mat: Array<Array<number>> = new Array();

for (let string = 0; string < stringList.length; string++){
    let rowSplit = stringList[string].split("");
    let row = [];
    
    for (let s of rowSplit){
        row.push(parseInt(s))
    }
    mat.push(row);
}

// now using matrix - find the lowest points 


let listOfPoints = new Array();
let riskAssessmentSum = 0;

for (let col = 0; col < mat.length; col++){
    for (let row = 0; row < mat[col].length; row++){
        
        let isLow = checkPoint(mat, col, row);
        if (isLow){
            listOfPoints.push([col, row]);
            riskAssessmentSum += 1 + mat[col][row];
        }
    }

}

console.log("Sum of all results: ", riskAssessmentSum)


function parseSides(mat:Array<Array<number>>, col:number, row:number){

    let left =  mat[col][row - 1];
    let right =  mat[col][row + 1];

    let up;
    if (col > 0) {
        up = mat[col - 1][row];
    } 
    
    else {
    up = 9;
    }

    let down;
    if (col < mat.length-1) {
        down = mat[col + 1][row];
    } 
    
    else {
        down = 9;
    }


    if (row == 0){
        left = 9;
    }

    if (row == mat[col].length-1){
        right = 9;
    }
    
    return [left, right, up, down];


}



function checkPoint(mat:Array<Array<number>>, col:number, row:number){
    
    let number = mat[col][row];

    let [left, right, up, down] = parseSides(mat, col, row);

    let condition = left > number && right > number && up > number && down > number;

    if(condition){
        return true;
    }

    return false;
}

console.log(" ");
console.log("Part 2");
console.log(" ");
console.log("Calculate the largest basins: ");
console.log("Oasis around Lowest Point, delimited by values of 9.")


// use previous list of points

// testing ... 
// console.log("");
// console.log(findBasinSize(mat, listOfPoints[20][0], listOfPoints[20][1]))

let topThreeSize: Array<number> = new Array;

for (let deep = 0; deep < listOfPoints.length; deep ++){
    let size = findBasinSize(mat, listOfPoints[deep][0], listOfPoints[deep][1]);

    if (topThreeSize.length < 3){
        topThreeSize.push(size);
    }

    else{
        topThreeSize.push(size);
        if (topThreeSize.length < 4){ continue;}
        let smallest = Math.min(topThreeSize[0], topThreeSize[1], topThreeSize[2], topThreeSize[3]);
        
        let onlySplice = false;
        for (let n = 0; n < topThreeSize.length; n++){

            if (topThreeSize[n] == smallest && onlySplice == false){
                topThreeSize.splice(n, 1);
                onlySplice = true;
            }
        }

    }

}

let totalAmountPart2 = topThreeSize[0] * topThreeSize[1] * topThreeSize[2]


console.log("The added sizes of the biggest water holes is: ", totalAmountPart2);
console.log(" ");



function findBasinSize(mat:Array<Array<number>>, col:number, row:number){

    // Parse Basin Base
    let basin:Array<string> = new Array();
    basin.push(`${col},${row}`)
    let size:number  = 1;


    if(checkPoint(mat, col, row) == false){
        return size;
    }

    [basin, size] = checkDirections(mat, col, row, basin, size);

    let nonRepeatList:Array<string> = new Array();

    while (nonRepeatList.length != basin.length){
        for (let n of basin){
            if (!nonRepeatList.includes(n)){  
                const [col, row] = n.split(",").map(Number);
                [basin, size] = checkDirections(mat, col, row, basin, size);
            }
            nonRepeatList.push(n)
        }
    }

    return size;

}


function checkDirections(mat:Array<Array<number>>, col:number, row:number, basin:Array<string>, size:number): [Array<string>, number] {

        let [left, right, up, down] = parseSides(mat, col, row);
        

        // Check Left
        for (let l = 1; left != 9 ;l++){

            let lrow = row - l;
            if (lrow >= 0) {

                left = mat[col][lrow];
                if (left == 9) {break;}


                if (basin.includes(`${col},${lrow}`) == false){
                    basin.push(`${col},${lrow}`);
                    size += 1;
                }

            } 
            else {
                break;
            }
        }

        // Check Right
        for (let r = 1; right != 9 ;r++){
            let rrow = row + r

            if (rrow < mat[col].length) {

                right = mat[col][rrow];
                if (right == 9) {break;}

                if (basin.includes(`${col},${rrow}`) == false){
                    basin.push(`${col},${rrow}`);
                    size += 1;
                }
            } 
            else {
                break;
            }
        }

        // Check Down
        for (let d = 1; down != 9 ;d++){
            let dcol = col + d;

            if (dcol < mat.length) {

                down = mat[dcol][row];
                if (down == 9) {break;}

                if (basin.includes(`${dcol},${row}`) == false){
                    basin.push(`${dcol},${row}`) ;
                    size += 1;
                }
            } 
            else {
                break;
            }
        }

        // Check Up
        for (let u = 1; up != 9 ;u++){
            let ucol = col - u;

            if (ucol >= 0) {
                up = mat[ucol][row];
                if (up == 9) {break;}

                if (basin.includes(`${ucol},${row}`) == false){
                    basin.push(`${ucol},${row}`);
                    size += 1;
                }

            } 
            else {
                break;
            }
        }


    return [basin, size]
}
