let currentPlayer = 'X';
let moves = 0;
let gameOver = false;

function makeMove(cell) {
    if (!cell.textContent && !gameOver) {
        cell.textContent = currentPlayer;
        cell.classList.add('disabled');
        moves++;

        if (checkWin()) {
            document.querySelector('.result').textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            enableResetButton();
        } else if (moves === 9) {
            document.querySelector('.result').textContent = "It's a draw!";
            enableResetButton();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector('.result').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            return true;
        }
    }

    return false;
}

function enableResetButton() {
    document.getElementById('reset-btn').disabled = false;
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.textContent = '';
        cell.classList.remove('disabled', 'winning-cell');
    }

    currentPlayer = 'X';
    moves = 0;
    gameOver = false;

    document.querySelector('.result').textContent = "Player X's turn";
    document.getElementById('reset-btn').disabled = true;
}
