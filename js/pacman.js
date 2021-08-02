'use strict'
// const PACMAN = '🤪';
var PACMAN = '<img src="img/PacmanRight.png"</img>';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return;

    if(nextCell === POWERFOOD){
        // Cannot eat another power food
        if(gPacman.isSuper) return;
        goPowerMode();
    } 

    // Lost
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameResult(false);
        renderCell(gPacman.location, EMPTY)
        return;

        // Eat Ghost
    } else if(nextCell === GHOST && gPacman.isSuper){

        for(var i = 0; i < gGhosts.length; i++){
            // Find the ghost in the gGhosts array
            if(gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j){
                // If cell is also Ghost and also Food
                if(gGhosts[i].currCellContent === FOOD) {
                    gGhosts[i].currCellContent === EMPTY;
                    updateScore(1);
                }
                // Remove ghost from array
                gGhosts.splice(i,1);
            }
        }
    }
    
    if(nextCell === FOOD){
        updateScore(1);  
    }

    if(nextCell === CHERRY){
        document.querySelector('h2 span').innerText = gGame.score + 10;
    } 

    // console.log( gGame.score , gTargetScore);
    if(gGame.score === gTargetScore){
        gameResult(true);
        renderCell(gPacman.location,PACMAN);
        return;
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    
    // update the dom
    renderCell(gPacman.location, EMPTY);
    
    gPacman.location = nextLocation;
    
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };

    var currLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            PACMAN = '<img src="img/PacmanUP.png"</img>';
            break;
        case 'ArrowDown':
            nextLocation.i++;
            PACMAN = '<img src="img/PacmanDOWN.png"</img>';
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PACMAN = '<img src="img/PacmanLEFT.png"</img>';
            break;
        case 'ArrowRight':
            nextLocation.j++;
            PACMAN = '<img src="img/PacmanRight.png"</img>';
            break;
        default:
            return null;
    }
    gEmptyCells.push(currLocation);

    return nextLocation;
}

function goPowerMode(){
    gPacman.isSuper = true;

    for(var i = 0; i < gGhosts.length; i++){
        gGhosts[i].color = 'blue';
    }

    setTimeout(function(){
        gPacman.isSuper = false;

        var newGhosts = [];

        for(var i = 0; i < gGhostsCount; i++){
            if(!gGhosts[i]){
                newGhosts.push({
                    location: {
                        i: 5,
                        j: 15
                    },
                    currCellContent: gBoard[3][3],
                    color: getRandomColorStr()
                });
            } else {
                newGhosts.push(gGhosts[i]);
            }
        }

        gGhosts = newGhosts;

        for(var i = 0; i < gGhosts.length; i++){
            gGhosts[i].color = getRandomColorStr();
        }
    },5000)


}