document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const statusText = document.getElementById('status-text');
    const resetBtn = document.getElementById('reset-btn');
    const pikaIndicator = document.getElementById('pika-indicator');
    const eeveeIndicator = document.getElementById('eevee-indicator');

    let currentPlayer = 'pikachu'; // 'pikachu' or 'eevee'
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleBoxClick(clickedBoxEvent) {
        const clickedBox = clickedBoxEvent.target.closest('.box');
        const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-index'));

        if (gameState[clickedBoxIndex] !== "" || !gameActive) {
            return;
        }

        handleBoxPlayed(clickedBox, clickedBoxIndex);
        handleResultValidation();
    }

    function handleBoxPlayed(clickedBox, clickedBoxIndex) {
        gameState[clickedBoxIndex] = currentPlayer;

        const img = document.createElement('img');
        img.src = `${currentPlayer}.png`;
        img.alt = currentPlayer;
        clickedBox.appendChild(img);
        clickedBox.classList.add('taken');
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.innerText = `${currentPlayer === 'pikachu' ? 'Pikachu' : 'Eevee'} wins the Battle!`;
            statusText.style.color = currentPlayer === 'pikachu' ? 'var(--pika-yellow)' : 'var(--eevee-cream)';
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusText.innerText = "Battle Draw!";
            statusText.style.color = "white";
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "pikachu" ? "eevee" : "pikachu";
        statusText.innerText = `${currentPlayer === 'pikachu' ? 'Pikachu' : 'Eevee'}'s Turn!`;

        if (currentPlayer === 'pikachu') {
            pikaIndicator.classList.add('active');
            eeveeIndicator.classList.remove('active');
        } else {
            eeveeIndicator.classList.add('active');
            pikaIndicator.classList.remove('active');
        }
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "pikachu";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusText.innerText = "Pikachu's Turn!";
        statusText.style.color = "var(--pika-yellow)";
        pikaIndicator.classList.add('active');
        eeveeIndicator.classList.remove('active');
        boxes.forEach(box => {
            box.innerHTML = "";
            box.classList.remove('taken');
        });
    }

    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
    resetBtn.addEventListener('click', handleRestartGame);
});
