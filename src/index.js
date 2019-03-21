module.exports = function solveSudoku(matrix){
    var row = 0;
    var col = 0;
    if(isSolved(matrix)) return matrix;
    for(var number = 1; number<=9; number++){
        if(checkSquare(matrix, row, col, number) && checkRowAndCol(matrix, row, col, number)){
          matrix[row][col] = number;
          if(solveSudoku(matrix)) return matrix;
          matrix[row][col] = 0;
        }
    }
    return false;
    function isSolved(matrix){
        var lengthMatrix = matrix.length;
        for(let i = 0 ; i < lengthMatrix ; i++){
            for(let j = 0 ; j < lengthMatrix ; j++){
                if(matrix[i][j] === 0){
                    row = i;
                    col = j;
                    return false;
                }
            }
        }
        return true;
    }
    function checkSquare(matrix, positionI, positionJ, number){
        var startI = Math.floor(positionI/3)*3;
        var startJ = Math.floor(positionJ/3)*3;
        for(let i = startI; i < startI+3 ; i++){
            for(let j = startJ; j < startJ+3 ; j++){
                if(number == matrix[i][j]) return false;
            }
        }
        return true;
    }
    function checkRowAndCol(matrix, row, col, number){
        for(var i = 0 ; i < matrix.length ; i++){
            if( matrix[row][i] === number || matrix[i][col] === number) return false;
        }
        return true;
    }
}