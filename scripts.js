const Cell = () => {
    let value = null; 
    
    const addToken = (player) => {
        if (value === null) { 
            value = player; 
        }
    };
    
    const getValue = () => value;

    return { addToken, getValue }; 
};

function Player(name, marker) {
    return { name, marker };
}
    
const GameController = (function () {
    const player1 = Player('Player X', 'X');
    const player2 = Player('Player O', 'O');
    let currentPlayer = player1;
    let gameActive = true;

    const startRound = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        gameActive = true;
    };

    const handleCellClick = (event) => {
        if (!gameActive) return;

        const row = parseInt(event.target.dataset.row, 10);
        const column = parseInt(event.target.dataset.column, 10);

        if (Gameboard.getBoard()[row][column].getValue() === null) {
            Gameboard.placeToken(row, column, currentPlayer.marker);

            const winner = Gameboard.checkWinners();

            if (winner) {
                alert(`Winner: ${winner}`);
                gameActive = false;
            } else if (Gameboard.availableCells().length === 0) {
                alert("It's a tie!");
                gameActive = false;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    };

    document
        .getElementById('reset-button')
        .addEventListener('click', startRound);

    return { startRound };
})();

const Gameboard = (function() {
    const rows = 3; 
    const columns = 3; 
    let board = [];

    const initializeBoard = () => {
        board = [];
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = Cell(); // Fill the board with new empty cells
            }
        }
    };

    // Initialize the board when Gameboard is created
    initializeBoard();

    const resetBoard = () => {
        initializeBoard(); // Call to reinitialize the board for a new round
    };

    const getBoard = () => board; // Return the current state of the board

    const availableCells = () => {
        const moves = [];
        for (let i = 0; i < rows; i++) { // Iterate over rows
            for (let j = 0; j < columns; j++) { // Iterate over columns
                if (board[i][j].getValue() === null) {
                    moves.push({ row: i, column: j }); // Store available cell coordinates
                }
            }
        }
        return moves; // Return the list of available moves
    };
    
    const placeToken = (row, column, player) => {
        if (board[row][column].getValue() === null) { // Check if the cell is empty
            board[row][column].addToken(player); // Add the player's token
        } else {
            console.log("This cell is already full.");
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue() || " "));
        console.log(boardWithCellValues); // Display the board
    };

    const checkWinners = () => {
        const size = board.length; // Size of the board (usually 3 for Tic-Tac-Toe)

        // Define all winning combinations (rows, columns, and diagonals)
        const winningCombinations = [];

        // Add rows to the winning combinations
        for (let row = 0; row < size; row++) {
            winningCombinations.push([board[row][0].getValue(), board[row][1].getValue(), board[row][2].getValue()]);
        }

        // Add columns to the winning combinations
        for (let col = 0; col < size; col++) {
            winningCombinations.push([board[0][col].getValue(), board[1][col].getValue(), board[2][col].getValue()]);
        }

        // Add diagonals to the winning combinations
        winningCombinations.push([board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue()]);
        winningCombinations.push([board[0][2].getValue(), board[1][1].getValue(), board[2][0].getValue()]);

        // Check each winning combination
        for (const combination of winningCombinations) {
            if (combination[0] && combination[0] === combination[1] && combination[1] === combination[2]) {
                return combination[0]; // Return the winner ('X' or 'O')
            }
        }

        return null; // No winner
    };

    return { 
        getBoard, 
        placeToken, 
        printBoard, 
        availableCells, 
        checkWinners,
        resetBoard
    };
})();

// Start the game
GameController.startRound();
