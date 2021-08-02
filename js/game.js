'use strict'
const WALL = '🟦'
const FOOD = '◽'
const EMPTY = ' ';
const POWERFOOD = '⚪'
const CHERRY = '🍒'

const ROWS = 10;
const COLS = 25;


var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

var gTargetScore;
var gIntervalCherry;
var gEmptyCells;

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    
    createGhosts(gBoard);
    
    // Create walls
    createLineOfWalls(2,2,9);
    createLineOfWalls(4,2,9);
    createLineOfWalls(5,2,9);
    createLineOfWalls(7,2,9);
    
    createLineOfWalls(7,18,5);
    createLineOfWalls(5,18,5);
    createLineOfWalls(4,18,5);
    createLineOfWalls(2,18,5);
    
    gBoard[5][15] === EMPTY;
    
    gTargetScore = countTargetScore(gBoard);
    
    gEmptyCells = [];

    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gGame.score = 0;
    updateScore(0);
    


    document.querySelector('.game-msg').style.display = 'none';

    gIntervalCherry = setInterval(function(){

        var randEmptyIdx = getRandomIntInt(0,gEmptyCells.length);

        var randEmptyCell = gEmptyCells[randEmptyIdx];

        gBoard[randEmptyCell.i][randEmptyCell.j] = CHERRY;
        renderCell(randEmptyCell,CHERRY);
        
    },15000)
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < ROWS; i++) {
        board.push([]);
        for (var j = 0; j < COLS; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === ROWS - 1 ||
                j === 0 || j === COLS - 1 ) {
                // board[i][j] = `${i},${j}`;
                board[i][j] = WALL;
            }
        }
    }


    board[4][14] = WALL;
    board[5][14] = WALL;
    board[4][15] = WALL;
    board[5][16] = WALL;
    board[4][16] = WALL;
    
    // board[1][11] = WALL;
    board[1][12] = WALL;
    board[ROWS-2][12] = WALL;


    // Create PowerFood    
    board[1][1] = POWERFOOD;
    board[1][COLS-2] = POWERFOOD;
    board[ROWS-2][1] = POWERFOOD;
    board[ROWS-2][COLS-2] = POWERFOOD;

    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameResult(isWin) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    
    var elGameMsgModal = document.querySelector('.game-msg');
    var elGameMsgText = document.querySelector('.game-msg h2');
    elGameMsgModal.style.display = 'block';
    
    if(isWin){
        elGameMsgText.style.color = 'green';
        elGameMsgText.innerText = 'You Won!';
    } else{
        elGameMsgText.style.color = 'red';
        elGameMsgText.innerText = 'You Lost!';
    }
    
}


function countTargetScore(gBoard){
    var counter = 0;

    for(var i = 1; i < gBoard.length - 1;i++){
        for(var j = 1; j < gBoard[0].length - 1; j++){
            if(gBoard[i][j] === FOOD) counter++;
        }
    }
    return counter;
}


function createLineOfWalls(row,col,amount){

    for(var i = col; i < amount + col; i++){
        gBoard[row][i] = WALL;
    }
}