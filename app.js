// Game variables
        let gameSequence = [];
        let playerSequence = [];
        let level = 1;
        let score = 0;
        let isPlaying = false;
        let isPlayerTurn = false;

        // DOM elements
        const tiles = document.querySelectorAll('.tile');
        const startBtn = document.getElementById('startBtn');
        const resetBtn = document.getElementById('resetBtn');
        const status = document.getElementById('status');
        const levelEl = document.getElementById('level');
        const scoreEl = document.getElementById('score');

        // Initialize game
        function init() {
            tiles.forEach(tile => {
                tile.addEventListener('click', handleTileClick);
            });
            
            startBtn.addEventListener('click', startGame);
            resetBtn.addEventListener('click', resetGame);
            
            updateStatus('Click START to begin!');
            disableTiles();
        }

        function startGame() {
            gameSequence = [];
            playerSequence = [];
            level = 1;
            score = 0;
            isPlaying = true;
            updateDisplay();
            nextLevel();
        }

        function resetGame() {
            gameSequence = [];
            playerSequence = [];
            level = 1;
            score = 0;
            isPlaying = false;
            isPlayerTurn = false;
            updateDisplay();
            updateStatus('Game Reset! Click START to play.');
            disableTiles();
            startBtn.disabled = false;
        }

        function nextLevel() {
            startBtn.disabled = true;
            resetBtn.disabled = false;
            playerSequence = [];
            level++;
            updateDisplay();
            updateStatus(`Level ${level - 1} - Watch the pattern!`);
            
            // Add random tile to sequence
            const randomTile = Math.floor(Math.random() * 4);
            gameSequence.push(randomTile);
            
            setTimeout(playSequence, 1000);
        }

        function playSequence() {
            let i = 0;
            function playStep() {
                if (i < gameSequence.length) {
                    activateTile(gameSequence[i]);
                    i++;
                    setTimeout(playStep, 600);
                } else {
                    isPlayerTurn = true;
                    updateStatus('Your turn! Repeat the pattern.');
                    enableTiles();
                }
            }
            playStep();
        }

        function handleTileClick(e) {
            if (!isPlayerTurn || !isPlaying) return;
            
            const tileIndex = parseInt(e.currentTarget.dataset.tile);
            playerSequence.push(tileIndex);
            
            activateTile(tileIndex);
            
            // Check if correct
            const currentStep = playerSequence.length - 1;
            if (tileIndex !== gameSequence[currentStep]) {
                gameOver();
                return;
            }
            
            // Check if sequence complete
            if (playerSequence.length === gameSequence.length) {
                score += level * 10;
                updateDisplay();
                isPlayerTurn = false;
                disableTiles();
                
                setTimeout(nextLevel, 1000);
            }
        }

        function activateTile(tileIndex) {
            const tile = tiles[tileIndex];
            tile.classList.add('glow');
            
            setTimeout(() => {
                tile.classList.remove('glow');
            }, 300);
        }

        function gameOver() {
            isPlaying = false;
            isPlayerTurn = false;
            updateStatus(`Game Over! Final Score: ${score} | Click START to play again.`);
            startBtn.disabled = false;
            disableTiles();
            
            // Flash all tiles
            tiles.forEach((tile, index) => {
                setTimeout(() => {
                    tile.classList.add('glow');
                    setTimeout(() => tile.classList.remove('glow'), 200);
                }, index * 100);
            });
        }

        function enableTiles() {
            tiles.forEach(tile => tile.disabled = false);
        }

        function disableTiles() {
            tiles.forEach(tile => tile.disabled = true);
        }

        function updateDisplay() {
            levelEl.textContent = level - 1;
            scoreEl.textContent = score;
        }

        function updateStatus(message) {
            status.textContent = message;
        }

        // Start the game when page loads
        window.addEventListener('DOMContentLoaded', init);