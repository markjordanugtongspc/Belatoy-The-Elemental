const choices = ['fire', 'water', 'earth']; 
        const playerChoice = document.querySelector('.player-choice');
        const computerChoice = document.querySelector('.computer-choice');
        const resultDisplay = document.querySelector('.result');
        const startButton = document.getElementById('start-button');
        const countdownDisplay = document.createElement('div'); // For the countdown
        const playerScoreDisplay = document.getElementById('player-score'); 
        const computerScoreDisplay = document.getElementById('computer-score'); 

        // Sound Effects
        const fireSound = new Audio('sounds/fire.mp3'); 
        const waterSound = new Audio('sounds/water.mp3'); 
        const earthSound = new Audio('sounds/earth.mp3'); 
        const startSound = new Audio('sounds/start.mp3');
        const countdownSound = new Audio('sounds/countdown.mp3'); // Countdown sound
        const victorySound = new Audio('sounds/victory.mp3');
        const defeatSound = new Audio('sounds/defeat.mp3'); 

        let playerSelection = null;
        let playerScore = 0;
        let computerScore = 0;
        let roundsPlayed = 0; // Track the number of rounds played

        // Event Listeners
        startButton.addEventListener('click', startGame);

        const buttons = document.querySelectorAll('.player-choice button'); 
        buttons.forEach(button => button.addEventListener('click', (event) => {
          const playerElement = event.target.classList[0]; 
          playSound(playerElement);
          playerSelection = playerElement;

          // Visually show selection 
          buttons.forEach(button => button.classList.remove('selected')); 
          button.classList.add('selected'); 
        }));

        let currentRound = 1; // Initialize the current round
        const totalRounds = 3; // Total number of rounds

        // Game Logic
        function startGame() {
          if (!playerSelection) return;

          startSound.play();
          countdownSound.play(); // Play the countdown sound
          startButton.disabled = true;

          // Countdown logic
          let countdown = 3;
          countdownDisplay.textContent = countdown;

          // Update styles and append countdownDisplay to the DOM if needed
          countdownDisplay.style.fontSize = '2em';
          countdownDisplay.style.textAlign = 'center'; // Ensure text is centered
          countdownDisplay.style.gridRow = '1'; // Position it correctly in the grid
          countdownDisplay.style.gridColumn = '2';
          document.body.appendChild(countdownDisplay);

          const countdownInterval = setInterval(() => {
            countdown--;
            countdownDisplay.textContent = countdown;
            if (countdown === 0) {
              clearInterval(countdownInterval);
              countdownDisplay.textContent = ''; // Clear the countdown display after countdown finishes

              const computerElement = getRandomChoice();
              displayChoices(playerSelection, computerElement);
              const roundResult = determineWinner(playerSelection, computerElement);

              playerSelection = null;
              buttons.forEach(button => button.classList.remove('selected'));

              if (roundResult !== 'draw') {
                // Only increment the current round if there was a winner
                currentRound++;
              }

              document.getElementById('current-round').textContent = currentRound;

              if (currentRound <= totalRounds) {
                startButton.textContent = "Next";
                startButton.disabled = false;
              } else {
                declareOverallWinner();
              }
            }
          }, 1000);
        }

function declareOverallWinner() {
  if (playerScore > computerScore) {
    resultDisplay.textContent = 'You are the overall winner!';
  } else if (playerScore < computerScore) {
    resultDisplay.textContent = 'The computer is the overall winner!';
  } else {
    resultDisplay.textContent = 'It\'s a tie!';
  }

  // Reset the scores
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = 'Player: 0';
  computerScoreDisplay.textContent = 'Computer: 0';

  // Reset the current round
  currentRound = 1;
  document.getElementById('current-round').textContent = currentRound;

// Change the button text to "Restart"
  startButton.textContent = "Restart";

  // Add an event listener to the Restart button for refresh
  startButton.addEventListener('click', () => {
    console.log('Restart clicked!');
    location.reload(); // Refreshes the page
  });
}

function playSound(element) {
 switch(element) {
 case 'fire': fireSound.play(); break;
 case 'water': waterSound.play(); break;
 case 'earth': earthSound.play(); break;
 }
}

function playVictorySound() {
 victorySound.play();
}

function playDefeatSound() {
 defeatSound.play();
}

function displayChoices(playerElement, computerElement) {
 // Reset from previous round (if needed)
 playerChoice.classList.remove(...choices); 
 computerChoice.classList.remove(...choices); 

 // Add the selected classes to show the choices
 playerChoice.classList.add(playerElement); 
 computerChoice.classList.add(computerElement); 
}

function determineWinner(playerElement, computerElement) {
  const winner = getWinner(playerElement, computerElement);

  if (winner === 'player') {
    resultDisplay.textContent = 'You Win!';
    playVictorySound();
    playerScore++;
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
  } else if (winner === 'computer') {
    resultDisplay.textContent = 'You Lose!';
    playDefeatSound();
    computerScore++;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
  } else {
    resultDisplay.textContent = 'Draw!';
    // Don't increment the round if it's a draw
  }
}

function getWinner(playerElement, computerElement) {
 if (playerElement === computerElement) {
  return 'draw';
 }

 if (playerElement === 'fire') {
  if (computerElement === 'earth') return 'player'; 
  else return 'computer';
 } else if (playerElement === 'water') {
  if (computerElement === 'fire') return 'player'; 
  else return 'computer';
 } else if (playerElement === 'earth') {
  if (computerElement === 'water') return 'player'; 
  else return 'computer';
 }
}

function getRandomChoice() {
 const randomIndex = Math.floor(Math.random() * choices.length);
 return choices[randomIndex];
}
