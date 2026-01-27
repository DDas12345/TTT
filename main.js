const boxes = document.querySelectorAll(".box");
const winnerText = document.querySelector(".winner");
const resetBtn = document.querySelector(".reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // Track the 9 boxes
let gameActive = true;

// Define the indices that result in a win
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle user clicks
function handleBoxClick(event) {
    const clickedBox = event.target;
    const boxIndex = parseInt(clickedBox.getAttribute("data-index"));

    // Ignore click if box is filled or game is over
    if (gameState[boxIndex] !== "" || !gameActive) {
        return;
    }

    updateBox(clickedBox, boxIndex);
    checkResult();
}

// Update the UI and the state array
function updateBox(box, index) {
    gameState[index] = currentPlayer;
    box.textContent = currentPlayer;
}

// Switch player
function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    winnerText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winnerText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        resetBtn.disabled = false;
        return;
    }

    // Check for draw
    if (!gameState.includes("")) {
        winnerText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        resetBtn.disabled = false;
        return;
    }

    changePlayer();
}

// Reset the game
function resetGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    winnerText.textContent = "Winner?";
    resetBtn.disabled = true;
    boxes.forEach(box => box.textContent = "");
}

// Event Listeners
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
resetBtn.addEventListener("click", resetGame);