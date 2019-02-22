module.exports = function solveSudoku(matrix){
    for(var i = 0; i < matrix.length ; i++){
        for(var j = 0; j < matrix.length ; j++){
            if(matrix[i][j] === 0) {
                matrix[i][j] = setPosibleOption(matrix, [i,j]);
            }
        }
    }
    var flag = 0
    while (flag != 3){
        for(var i = 0 ; i < matrix.length ; i++){
            for (var j = 0 ; j < matrix.length ; j++){
                if(Array.isArray(matrix[i][j]) && matrix[i][j].length == 1){
                    matrix[i][j] = matrix[i][j][0];
                    cleanNumber(matrix , [i,j]);
                    continue;
                }
                var number = searchNumber(matrix, [i,j]);
                if(Array.isArray(matrix[i][j]) && number > 0){
                    matrix[i][j] = number;
                    cleanNumber(matrix , [i,j]);
                    continue;
                }
            }
        }
        flag++;
    }
    return matrix;
}
function setPosibleOption(matrix, position){
    var listOption = [1,2,3,4,5,6,7,8,9];
    var positionI = position[0];
    var positionJ = position[1];
    for(var i = 0 ; i < matrix.length ; i++){
        if(matrix[positionI][i] > 0 && listOption.indexOf(matrix[positionI][i]) !== -1){
            listOption.splice(listOption.indexOf(matrix[positionI][i]), 1);
        }
        if(matrix[i][positionJ] > 0 && listOption.indexOf(matrix[i][positionJ]) !== -1){
            listOption.splice(listOption.indexOf(matrix[i][positionJ]), 1);
        }
    }
    //start position square
    var startI = Math.floor(positionI/3)*3;
    var startJ = Math.floor(positionJ/3)*3;
    var finalI = startI+3;
    var finalJ = startJ+3;
    for(;startI < finalI ; startI++){
        for(;startJ < finalJ ; startJ++){
            if(matrix[startI][startJ] > 0 && listOption.indexOf(matrix[startI][startJ]) !== -1){
                listOption.splice(listOption.indexOf(matrix[startI][startJ]), 1);
            }
        }
        startJ = Math.floor(positionJ/3)*3;
    }
    return listOption;
}
function searchNumber(matrix, position) {
    var positionI = position[0];
    var positionJ = position[1];
    var listPosibleNumber = matrix[positionI][positionJ];
    var listLineNumber = [];
    var listRowNumber = [];
    var listSquareNumber = [];

    for(var i = 0 ; i < matrix.length ; i++){
        if( i !== positionJ && Array.isArray(matrix[positionI][i])){
            listLineNumber = listLineNumber.concat(matrix[positionI][i]);
        }
        if(i !== positionI && Array.isArray(matrix[i][positionJ])){
            listRowNumber = listRowNumber.concat(matrix[i][positionJ]);
        }
    }
    //start position square
    var startI = Math.floor(positionI/3)*3;
    var startJ = Math.floor(positionJ/3)*3;
    var finalI = startI+3;
    var finalJ = startJ+3;
    for(;startI < finalI ; startI++){
        for(;startJ < finalJ ; startJ++){
            if((startI !== positionI || startJ !== positionJ) && Array.isArray(matrix[startI][startJ])){
                listSquareNumber = listSquareNumber.concat(matrix[startI][startJ]);
            }
        }
        startJ = Math.floor(positionJ/3)*3;
    }
    return checkUniqNumber(listPosibleNumber, listLineNumber, listRowNumber, listSquareNumber);
}
function checkUniqNumber(listPosibleNumber, listLineNumber, listRowNumber, listSquareNumber) {
    var result = 0;
    for(var i = 0 ; i < listPosibleNumber.length ; i++){
        if(listLineNumber.indexOf(listPosibleNumber[i]) === -1 ||
            listRowNumber.indexOf(listPosibleNumber[i]) === -1 ||
            listSquareNumber.indexOf(listPosibleNumber[i]) === -1
        ){
            result = listPosibleNumber[i];
            break;
        }
    }
    return result;
}
function cleanNumber(matrix , position) {
    var positionI = position[0];
    var positionJ = position[1];
    var number = matrix[positionI][positionJ];
    for(var i = 0 ; i < matrix.length ; i++){
        if(Array.isArray(matrix[positionI][i]) && matrix[positionI][i].indexOf(number) !== -1){
            matrix[positionI][i].splice(matrix[positionI][i].indexOf(number), 1);
        }
        if(Array.isArray(matrix[i][positionJ]) && matrix[i][positionJ].indexOf(number) !== -1){
            matrix[i][positionJ].splice(matrix[i][positionJ].indexOf(number), 1);
        }
    }
    //start position square
    var startI = Math.floor(positionI/3)*3;
    var startJ = Math.floor(positionJ/3)*3;
    var finalI = startI+3;
    var finalJ = startJ+3;
    for(;startI < finalI ; startI++){
        for(;startJ < finalJ ; startJ++){
            if( Array.isArray(matrix[startI][startJ]) && matrix[startI][startJ].indexOf(number) !== -1){
                matrix[startI][startJ].splice(matrix[startI][startJ].indexOf(number), 1);
            }
        }
        startJ = Math.floor(positionJ/3)*3;
    }
}