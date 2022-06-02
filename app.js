//initial game state
let gameState= {
    //currentPlayer: 0,
    players: ['x', 'o'],
    names: [null, null],
    board: [],
}
console.log(gameState)

function newGame(){
    gameState.board =    
    [
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false}
    ]
}

const boardElement = document.querySelector('#board');
const playersElement = document.querySelector('#playerTurn');
//const playerName = document.querySelectorAll('.player-name')
const startGame = document.querySelector('.start')
const reset = document.querySelector('#reset')
let currentPlayer = gameState.players[0]

function renderBoard(){
    boardElement.innerHTML = '';
    for (let i = 0; i < gameState.board.length; i++){
        let cell = document.createElement('div');
        cell.innerHTML = gameState.board[i].value;
        cell.className = 'cell';
        cell.dataset.index = i;
        boardElement.appendChild(cell);
    }
}

function changePlayer() {
    let p1 = gameState.players[0];
    let p2 = gameState.players[1];
    if (currentPlayer === p1) {
        playerTurn.innerHTML = gameState.names[0] + "'s turn: X"
        console.log("player 1 is: " + p1);
        currentPlayer = p2;   
    } else {
        playerTurn.innerHTML = gameState.names[1] + "'s turn: O"
        console.log("player 2 is: " + p2);
        currentPlayer = p1;
    }
    return currentPlayer;
}
 
//(done)put names in gameState.name
//(done)clear input fields when start button is pressed
//when click start button display 'name's turn: X' the playerTurn id field   (gameState.names[0] + "'s turn: X")
//clear start button when pressed
//(done??)in boardElement event.listener switch between gameState.names[i] and (gameState.players[i] -m 'x or 0')
//changePlayer function is not right
//make board unclickable untill start??
//reset button set equal to newgame??
//add win conditions to gameState
//add computer play if only one player is playing
//random generator for computer play to play in empty spots

startGame.addEventListener('click', function(event){
    const player1 = document.querySelector('.player-name1').value
    const player2 = document.querySelector('.player-name2').value
    console.log(player1)
    console.log('hi')
    if (player1){
        gameState.names[0] = player1
        //playerTurn.innerHTML = player1 + " turn"
        document.getElementById("player1").style.display = "none";
    }
    if (player2){
        gameState.names[1]= player2
        //playerTurn.innerHTML = player2 + " turn"
        document.getElementById("player2").style.display = "none";
    }    
    console.log(player1)
})

boardElement.addEventListener('click', function(event) {
    let target = event.target
    let cellIdx = target.dataset.index
    //console.log(cellIdx)
    let clicked = gameState.board[cellIdx]
    //console.log(clicked)
    if (target.className !== 'cell') {
        return;
      }
    if (!clicked.isClicked){
        clicked.value = currentPlayer
        clicked.isClicked = true
    } else{
        return
    }
    changePlayer()
    console.log(gameState)
    renderBoard();
})
    



newGame();
renderBoard();