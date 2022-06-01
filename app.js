//initial game state
let gameState= {
    players: ['x', 'o'],
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

let boardElement = document.querySelector('#board');
let playersElement = document.querySelector('#playerTurn');
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
        playerTurn.innerHTML = "Player X Turn"
        console.log("player 1 is: " + p1);
        currentPlayer = p2;   
    } else {
        playerTurn.innerHTML = "Player O Turn"
        console.log("player 2 is: " + p2);
        currentPlayer = p1;
    }
    return currentPlayer;
}
  
boardElement.addEventListener('click', function(event) {
    let target = event.target
    let cellIdx = target.dataset.index
    console.log(cellIdx)
    let clicked = gameState.board[cellIdx]
    console.log(clicked)
    if (target.className !== 'cell') {
        return;
      }
    if (!clicked.isClicked){
        clicked.value = currentPlayer
        clicked.isClicked = true
    } 
    changePlayer()
    console.log(gameState)
    renderBoard();
  })
    



newGame();
renderBoard();