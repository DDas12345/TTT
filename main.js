document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const statusText = document.getElementById('status-text');
    const resetBtn = document.getElementById('reset-btn');
    const pikaIndicator = document.getElementById('pika-indicator');
    const eeveeIndicator = document.getElementById('eevee-indicator');
    const hostBubble = document.querySelector('.host-bubble');

    const GRID_SIZE = 5;
    const WIN_COUNT = 5; // 5 in a row to win
    let currentPlayer = 'pikachu';
    let gameState = Array(GRID_SIZE * GRID_SIZE).fill("");
    let gameActive = true;

    const hostMessages = {
        start: "Welcome to the Divine Battle. Choose your side.",
        pikaTurn: "Pikachu, use your speed!",
        eeveeTurn: "Eevee, show your potential!",
        pikaWin: "Pikachu has triumphed! A legendary victory.",
        eeveeWin: "Eevee has evolved into a winner!",
        draw: "A stalemate... even I, Arceus, am impressed."
    };

    function createGrid() {
        gridContainer.innerHTML = '';
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.setAttribute('data-index', i);
            box.addEventListener('click', handleBoxClick);
            gridContainer.appendChild(box);
        }
    }

    function handleBoxClick(e) {
        const clickedBox = e.target;
        const index = parseInt(clickedBox.getAttribute('data-index'));

        if (gameState[index] !== "" || !gameActive) return;

        gameState[index] = currentPlayer;
        const img = document.createElement('img');
        img.src = `${currentPlayer}.png`;
        clickedBox.appendChild(img);
        clickedBox.classList.add('taken');

        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        // Check rows, cols, and diagonals
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            if (gameState[i] === "") continue;

            const row = Math.floor(i / GRID_SIZE);
            const col = i % GRID_SIZE;

            // Horizontal
            if (col <= GRID_SIZE - WIN_COUNT) {
                if (checkLine(i, 1)) roundWon = true;
            }
            // Vertical
            if (row <= GRID_SIZE - WIN_COUNT) {
                if (checkLine(i, GRID_SIZE)) roundWon = true;
            }
            // Diagonal Right
            if (col <= GRID_SIZE - WIN_COUNT && row <= GRID_SIZE - WIN_COUNT) {
                if (checkLine(i, GRID_SIZE + 1)) roundWon = true;
            }
            // Diagonal Left
            if (col >= WIN_COUNT - 1 && row <= GRID_SIZE - WIN_COUNT) {
                if (checkLine(i, GRID_SIZE - 1)) roundWon = true;
            }

            if (roundWon) break;
        }

        if (roundWon) {
            const winnerName = currentPlayer === 'pikachu' ? 'Pikachu' : 'Eevee';
            statusText.innerText = `${winnerName} Wins!`;
            statusText.style.color = currentPlayer === 'pikachu' ? 'var(--pika-yellow)' : 'var(--eevee-cream)';
            hostBubble.innerText = currentPlayer === 'pikachu' ? hostMessages.pikaWin : hostMessages.eeveeWin;
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            statusText.innerText = "It's a Draw!";
            statusText.style.color = "white";
            hostBubble.innerText = hostMessages.draw;
            gameActive = false;
            return;
        }

        switchPlayer();
    }

    function checkLine(start, step) {
        const player = gameState[start];
        for (let i = 1; i < WIN_COUNT; i++) {
            if (gameState[start + i * step] !== player) return false;
        }
        return true;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'pikachu' ? 'eevee' : 'pikachu';
        const winnerName = currentPlayer === 'pikachu' ? 'Pikachu' : 'Eevee';
        statusText.innerText = `${winnerName}'s Turn`;
        statusText.style.color = currentPlayer === 'pikachu' ? 'var(--pika-yellow)' : 'var(--eevee-cream)';
        hostBubble.innerText = currentPlayer === 'pikachu' ? hostMessages.pikaTurn : hostMessages.eeveeTurn;

        if (currentPlayer === 'pikachu') {
            pikaIndicator.classList.add('active');
            eeveeIndicator.classList.remove('active');
        } else {
            eeveeIndicator.classList.add('active');
            pikaIndicator.classList.remove('active');
        }
    }

    resetBtn.addEventListener('click', () => {
        gameState.fill("");
        gameActive = true;
        currentPlayer = 'pikachu';
        statusText.innerText = "Pikachu's Turn";
        statusText.style.color = "var(--pika-yellow)";
        hostBubble.innerText = hostMessages.start;
        pikaIndicator.classList.add('active');
        eeveeIndicator.classList.remove('active');
        createGrid();
    });

    createGrid();
});
