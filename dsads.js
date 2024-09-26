const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
function Player (marker) {
    
    return { marker };
  }
const GameBoard = (function() {
    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell=event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }
        board[index]==currentPlayer;
        cell,textContent =currentPlayer;

        if(checkWin){
            alert(`${currentPlayer} is the winner!`)
            gameActive=false;
        }
     else if (board.every(cell => cell !== '')) {
        alert('It\'s a draw!');
        gameActive = false;
        return;
    }
        SwitchPlayer();

    }

    // Return any necessary properties or methods if needed
    return {
        handleCellClick
    };
})();
const GameManger= (function(){
    function initializeGame(){
        let board=["","","","","","","","",""]
        gameActive=true
    }
    function SwitchPlayer(){
        let currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    }
    
})
const Player1 = createUser("X");
const Player2 = createUser("O");