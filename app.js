//DOM selectors
const boardElement = document.querySelector('#board');
const resultDisplay = document.querySelector('#result');
const player1Name = document.querySelector('#player1');
const player2Name = document.querySelector('#player2');
const dispalyPlayer1Name = document.querySelector('#dispalyPlayer1Name');
const dispalyPlayer2Name = document.querySelector('#dispalyPlayer2Name');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

//initial game state
let gameState = {
    board: [],
    players: ['x', 'o'],
    playerNames: [null, null],
    numOfTurns: 0,
    winner: false,
    wins: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
}

//resetting game back to initial game state when reset button event listener is clicked
function newGame(){
    gameState.board = [        
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false}
    ];
    gameState.currentPlayer = 'x';
    gameState.playerNames = [null, null];
    gameState.players = ['x', 'o'];
    gameState.winner = false;
    gameState.numOfTurns = 0;
    resultDisplay.innerHTML = '';
    dispalyPlayer1Name.innerHTML = '';
    dispalyPlayer2Name.innerHTML = '';
    player1Name.style.display = 'initial';
    player2Name.style.display = 'initial';
    startButton.style.display = 'initial';
}

//changing between x and o for players turns when game.board is clicked on 
//displays who's turn it is
function changeTurn(){
    gameState.players = gameState.players === 'x' ? 'o' : 'x';
    if (gameState.players === 'x'){
        resultDisplay.innerHTML = gameState.playerNames[1] + "'s turn: o";
    }
    if (gameState.players === 'o'){
        resultDisplay.innerHTML = gameState.playerNames[0] + "'s turn: x";
    }
}

//checking winning combo's 
function win(){
    //loop through gameState.win / get index position and setting valeus to an new variable
    for (let i = 0; i < gameState.wins.length; i++){
        let winArrays = gameState.wins[i];
        let firstIdx = winArrays[0];
        let playerMark1 = gameState.board[firstIdx].value;
        let secondIdx = winArrays[1];
        let playerMark2 = gameState.board[secondIdx].value;
        let thirdIdx = winArrays[2];
        let playerMark3 = gameState.board[thirdIdx].value;
        if (
            (!playerMark1 || !playerMark2 || !playerMark3) ||                   
            (playerMark1 !== playerMark2 || playerMark2 !== playerMark3 || playerMark1 !== playerMark3)
            ) {
        }else {
            gameState.winner = true;
            resultDisplay.innerHTML = 'Player: ' + gameState.players + " win's";
            renderBoard();   
        }
    }
    //add tie conditions if game.board is full and no winning condition has been meet then it is a tie
    if ((gameState.winner === false) && (gameState.numOfTurns === 9)){
        resultDisplay.innerHTML = 'Game is a draw';
        renderBoard();
        return;
    }
}

//when only one person is playing the computer will be the second player
//computer plays in next isClicked === false possition 
function computerPlayO(){
    for (let i = 0; i < gameState.board.length; i++){
        if (gameState.board[i].isClicked === false){
            gameState.board[i].value = 'o';
            gameState.board[i].isClicked = true;
            gameState.numOfTurns++;
            changeTurn();
            break;
        }
    }
}

//rendering game board area to play tic-tac-toe 
//creating div elemets to place 'x' or 'o'/ creating class name/ creating dataset
//appending all elements together to create the game board to play tic-tac-toe
function renderBoard(){
    boardElement.innerHTML = '';
    for (let i = 0; i < gameState.board.length; i++){
        let square = document.createElement('div');
        square.innerHTML = gameState.board[i].value;
        square.className = "square";
        square.dataset.index = i;
        boardElement.appendChild(square);
    }
}

//event listeners
//renders board / checks for win / changes turn / adds computer play when single player
//prevents board being clicked on before names are given 
//prevents reassigning a value of a square is there already it already has a value
//prevents board from being clicked on after win
boardElement.addEventListener('click', function(event){
    let target = event.target;
    let squareIdx = target.dataset.index;
    let clicked = gameState.board[squareIdx];
    if (gameState.playerNames[0] === null && gameState.playerNames[1] === null){
        resultDisplay.innerHTML = 'please enter player names';
        return;
    }
    if (gameState.winner === true){
        return;
    }
    if (target.className !== 'square') {
        return;
    }
    if (!clicked.isClicked){
        gameState.numOfTurns++;
        changeTurn();
        clicked.value = gameState.players;
        clicked.isClicked = true;
        win();
        if ((gameState.playerNames[1] === 'Computer') && (gameState.winner === false)){
            computerPlayO();
        } 
    }
    else {
        return;
    }    
    win();
    renderBoard();
    //console.log(gameState)
})

//when state Game button is pressed then moves names input to gamestate/hides input fields and start game button
//alert play to input games to start game if trying to start with no names 
startButton.addEventListener('click', function(event){
    if (player1Name.value && player2Name.value){
        gameState.playerNames[0] = player1Name.value;
        gameState.playerNames[1] = player2Name.value;
        dispalyPlayer1Name.innerHTML = "Player 1: " + gameState.playerNames[0];
        dispalyPlayer2Name.innerHTML = "Player 2: " + gameState.playerNames[1];
    }
    if (!player1Name.value){
        alert('Enter player1 name to play agaist computer or player1 and player2 names to play two player');
        player1Name.value = '';
        player2Name.value = '';
        dispalyPlayer1Name.innerHTML = '';
        dispalyPlayer2Name.innerHTML = '';
        return;
    }
    if (!player2Name.value){
        gameState.playerNames[0] = player1Name.value;
        gameState.playerNames[1] = 'Computer';
        dispalyPlayer1Name.innerHTML = "Player 1: " + gameState.playerNames[0];
        dispalyPlayer2Name.innerHTML = "Player 2: " + gameState.playerNames[1];
    }
    resultDisplay.innerHTML = gameState.playerNames[0] + "'s turn: x";
    player1Name.value = '';
    player2Name.value = '';
    player1Name.style.display = 'none';
    player2Name.style.display = 'none';
    startButton.style.display = 'none';
    //console.log(gameState)
})

//resets game to initial game state so you can play again
resetButton.addEventListener('click', function(event){
    newGame();
    renderBoard();
})


//bootstrap
newGame();
renderBoard();