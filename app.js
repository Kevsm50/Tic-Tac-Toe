//initial game state
let gameState= {
    currentPlayer: 'x',
    players: ['x', 'o'],
    names: [null, 'Computer'],
    board: [],
    win: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    winner: false,
    numOfTurns: 0,
}


//new game fucntion help reset elsement back to original state
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
    ];
    gameState.currentPlayer = 'x';
    gameState.names = [null, 'Computer'];
    gameState.numOfTurns = 0;
    gameState.winner = false;
}

//DOM selectors/ variables
const boardElement = document.querySelector('#board');
const playersTurn = document.querySelector('#playerTurn');
const startGame = document.querySelector('.start')
const cells = document.querySelectorAll('.cell')
const reset = document.querySelector('#reset')
const p1Input = document.querySelector('#p1')
const p2Input = document.querySelector('#p2')

//helper functions
function renderBoard(){
    document.querySelector('.player-name1').value = ''
    document.querySelector('.player-name2').value = ''
    boardElement.innerHTML = '';
    for (let i = 0; i < gameState.board.length; i++){
        let cell = document.createElement('div');
        cell.innerHTML = gameState.board[i].value;
        cell.className = 'cell';
        cell.dataset.index = i;
        boardElement.appendChild(cell);
    }
}

//changes between "x" and "o" every click / displays who's turn it is
function changePlayer() {
    let p1 = gameState.players[0];
    let p2 = gameState.players[1];
    if (gameState.currentPlayer === p2) {
        playerTurn.innerHTML = gameState.names[0] + "'s turn: X"
        //console.log("player 1 is: " + p1);
        gameState.currentPlayer = p1;   
    } else {
        playerTurn.innerHTML = gameState.names[1] + "'s turn: O"
        //console.log("player 2 is: " + p2);
        gameState.currentPlayer = p2;
    }
    return gameState.currentPlayer;
}

function win(){
    for (let i = 0; i < gameState.win.length; i++){
        let array = gameState.win[i]
        let first = array[0]
        let playerMark1 = gameState.board[first].value
        let second = array[1]
        let playerMark2 = gameState.board[second].value
        let third = array[2]
        let playerMark3 = gameState.board[third].value
        if (
            (!playerMark1 || !playerMark2 || !playerMark3) || 
            (playerMark1 !== playerMark2 || playerMark2 !== playerMark3 || playerMark1 !== playerMark3)
            ) {
        }else {
            gameState.winner = true
            renderBoard()         
        }
    }
    //add tie conditions if game.board is full and no winning condition has been meet then it is a tie
    if ((gameState.winner === false) && (gameState.numOfTurns === 9)){
        //alert('draw')
        renderBoard()
        return
    }
}

//when only one person is playing the computer will be the second player
//function computerPlay(){
//    if (gameState.names[1] === 'Computer'){
//        //then computer plays in the next available index that is if open(false)
//        for(let i = 0; i < gameState.board.length; i++){
//            let el = gameState.board[i].isClicked
//            if (gameState.board[0].isClicked === false){
//               gameState.board[0].value = 'o'
//               changePlayer()
//            } 
//        }  
//    }
//}



//event listeners
//when state Game button is pressed then moves names input to gamestate/hides input fields and start game button
startGame.addEventListener('click', function(event){
    const player1 = document.querySelector('.player-name1').value
    const player2 = document.querySelector('.player-name2').value
    if (player1 && player2){
        gameState.names[0] = player1
        gameState.names[1]= player2
        //playerTurn.innerHTML = player1 + " turn"
        p1Input.innerHTML = "Player 1: " + player1
        p2Input.innerHTML = "Player 2: " + player2
        changeDisplay()
    }
    if (!player2){
        gameState.names[0] = player1
        gameState.names[1]= 'computer'
        p1Input.innerHTML = "Player 1: " + player1
        p2Input.innerHTML = 'Player 2: Computer'
        changeDisplay()
    }
    if (!player1){
        gameState.names[0] = 'computer'
        gameState.names[1]= player2
        p1Input.innerHTML = 'Player 2: Computer'
        p2Input.innerHTML = 'Player 2: ' + player2
        changeDisplay()
    }
    playersTurn.innerHTML = gameState.names[0] + "'s turn: X"    
    startGame.style.display = "none"
})

function changeDisplay(){
    document.getElementById("player1").style.display = "none";
    document.getElementById("player2").style.display = "none";
}

boardElement.addEventListener('click', function(event) {
    let target = event.target
    let cellIdx = target.dataset.index
    let clicked = gameState.board[cellIdx]
    if (gameState.names[0] === null && gameState.names[1] === "Computer"){
        alert('Please enter player names and press the Start Game button')
        return
    }
    if (target.className !== 'cell') {
        return;
    }
    if (gameState.winner === true){
        return
    }
    if (!clicked.isClicked){        
        gameState.numOfTurns++
        clicked.value = gameState.currentPlayer
        clicked.isClicked = true
        //computerPlay()
        win()
    } else{
        return
    }
    if (gameState.winner === true){
        playersTurn.innerHTML = gameState.currentPlayer + "'s win"
        return
    }
    if ((gameState.winner === false) && (gameState.numOfTurns === 9)){
        playersTurn.innerHTML = 'Game is a draw'
        return
    }
    
    changePlayer()
    renderBoard();
    console.log(gameState)
})

//reset to original state
reset.addEventListener('click', function(event){
    playersTurn.innerHTML = "";
    p1Input.innerHTML = ''
    p2Input.innerHTML = ''
    document.querySelector(".player-name1").style.display = "inline-block";
    document.querySelector(".player-name2").style.display = "inline-block";
    document.querySelector(".start").style.display = 'block'
    
    newGame()
    renderBoard()
    console.log(gameState)
})

newGame();
renderBoard();


//I think I got the draw to work. 
//I added winner: false and numOfTurns: 0, to game state object. 
//in board event listener I add incremented to numOfTurns
//in else statement of win function I turned winner: true
//then added and if ((gameState.winner === false) && (gameState.numOfTurns === 9)) at the bottom of the win function 




//function winn(){
//    for (let i = 0; i < gameState.win.length; i++){
//        let indexes = gameState.win[i]
//        
//        for (let j = 0; j < 3; j++){
//            let index = indexes[j]
//            console.log(index)
//            let val = gameState.board[index].value
//        //if index[0] is not equal to index[1] then return
//        //check if the value of cells are same
//        //if some one has one then return 
//    }
//}





//startGame.addEventListener('click', function(event){
//    const player1 = document.querySelector('.player-name1').value
//    const player2 = document.querySelector('.player-name2').value
//    const p1Input = document.querySelector('#p1')
//    const p2Input = document.querySelector('#p2')
//    if (player1){
//        gameState.names[0] = player1
//        //playerTurn.innerHTML = player1 + " turn"
//        p1Input.innerHTML = "Player 1: " + player1
//        document.getElementById("player1").style.display = "none";
//        document.getElementById("player2").style.display = "none";
//    }
//    if (player2){
//        gameState.names[1]= player2
//        p2Input.innerHTML = "Player 2: " + player2
//        //playerTurn.innerHTML = player2 + " turn"
//        document.getElementById("player2").style.display = "none";
//    }
//    playersTurn.innerHTML = gameState.names[0] + "'s turn: X"    
//    startGame.style.display = "none"
//})