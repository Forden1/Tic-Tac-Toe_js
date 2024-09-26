// Select all the cells and the reset button from the DOM
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

// Player factory function to create player objects with a marker ('X' or 'O')
function Player(marker) {
    return { marker };
}

// Immediately invoked function expression (IIFE) for the GameBoard module
const GameBoard = (function() {
    // Game state variables
    let board = ["", "", "", "", "", "", "", "", ""]; // Array representing the game board
    let currentPlayer = 'X'; // Set initial player
    let gameActive = true; // Game is active

    // Define all winning combinations of indexes
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

    // Check if the current player has won
    function checkWin() {
        // Return true if any winning combination is satisfied by the current player's markers
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    // Handle click event on a cell
    function handleCellClick(event) {
        const cell = event.target; // Get the clicked cell
        const index = cell.getAttribute('data-index'); // Get the index of the clicked cell

        // Check if the cell is already occupied or the game is not active
        if (board[index] !== '' || !gameActive) {
            return;
        }

        // Mark the board with the current player's marker
        board[index] = currentPlayer; 
        cell.textContent = currentPlayer; // Update the cell's text to display the marker

        // Check for a win after the move
        if (checkWin()) {
            alert(`${currentPlayer} is the winner!`); // Alert the winner
            gameActive = false; // Stop the game
        } else if (board.every(cell => cell !== '')) { // Check for a draw
            alert('It\'s a draw!');
            gameActive = false; // Stop the game
        } else {
            switchPlayer(); // Switch to the other player
        }
    }

    // Function to switch the player
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle between 'X' and 'O'
    }

    // Reset the game to the initial state
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""]; // Clear the board
        cells.forEach(cell => cell.textContent = ''); // Clear the text in all cells
        currentPlayer = 'X'; // Reset the first player to 'X'
        gameActive = true; // Make the game active again
    }

    // Add event listeners to each cell
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    
    // Add event listener to the reset button
    resetButton.addEventListener('click', resetGame);

    // Return any necessary properties or methods if needed
    return {
        handleCellClick,
        resetGame,
        switchPlayer
    };
})();

// Create players using the Player factory function
const Player1 = Player("X");
const Player2 = Player("O");

// The GameManager module for initializing and managing the game
const GameManager = (function() {
    // Initialize the game and reset the board
    function initializeGame() {
        GameBoard.resetGame(); // Reset the game using GameBoard's reset function
    }

    // Return any necessary methods to be accessed outside
    return {
        initializeGame
    };
})();

// Initialize the game when the script loads
GameManager.initializeGame();
