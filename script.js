const choices = ['fire', 'water', 'earth'];
const playerChoice = document.querySelector('.player-choice');
const computerChoice = document.querySelector('.computer-choice');
const resultDisplay = document.querySelector('.result');
const startButton = document.getElementById('start-button');
const countdownDisplay = document.createElement('div');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const currentRoundDisplay = document.getElementById('current-round');

// Sound Effects (You can add your own audio files)
const sounds = {
  fire: new Audio('sounds/fire.mp3'),
  water: new Audio('sounds/water.mp3'),
  earth: new Audio('sounds/earth.mp3'),
  start: new Audio('sounds/start.mp3'),
  countdown: new Audio('sounds/countdown.mp3'),
  victory: new Audio('sounds/victory.mp3'),
  defeat: new Audio('sounds/defeat.mp3')
};

let playerSelection = null;
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;

// Event Listeners
startButton.addEventListener('click', startGame);

const buttons = document.querySelectorAll('.player-choice button');
buttons.forEach(button => button.addEventListener('click', (event) => {
  playerSelection = event.target.classList[0];
  playSound(playerSelection);
  buttons.forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
}));

function startGame() {
  if (!playerSelection) return;

  sounds.start.play();
  startButton.disabled = true;
  let countdown = 3;
  countdownDisplay.textContent = countdown;
  countdownDisplay.className = 'countdown';
  document.body.appendChild(countdownDisplay);

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownDisplay.textContent = countdown;
    sounds.countdown.play();
    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownDisplay.remove();

      const computerElement = getRandomChoice();
      displayChoices(playerSelection, computerElement);
      const winner = determineWinner(playerSelection, computerElement);

      if (winner !== 'draw') {
        currentRound++;
      }

      updateRoundDisplay();
      playerSelection = null;
      buttons.forEach(button => button.classList.remove('selected'));

      if (currentRound >= 3) {
        declareOverallWinner();
      } else {
        startButton.textContent = 'Next Round';
        startButton.disabled = false;
      }
    }
  }, 1000);
}

function updateRoundDisplay() {
  currentRoundDisplay.textContent = 'Round ' + currentRound;
}

function declareOverallWinner() {
  let resultMessage = 'It\'s a tie!';
  if (playerScore > computerScore) {
    resultMessage = 'You are the overall winner!';
    sounds.victory.play();
  } else if (playerScore < computerScore) {
    resultMessage = 'Computer is the overall winner!';
    sounds.defeat.play();
  }
  resultDisplay.textContent = resultMessage;
  resetGame();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 0;
  playerScoreDisplay.textContent = '0';
  computerScoreDisplay.textContent = '0';
  startButton.textContent = 'Restart';
  startButton.onclick = () => location.reload();
}

function playSound(element) {
  sounds[element].play();
}

function displayChoices(playerElement, computerElement) {
  playerChoice.className = 'player-choice ' + playerElement;
  computerChoice.className = 'computer-choice ' + computerElement;
}

function determineWinner(playerElement, computerElement) {
  if (playerElement === computerElement) {
      resultDisplay.textContent = "DRAW!";
      return 'draw';
  }

  const winningCombinations = {
      fire: 'earth',
      water: 'fire',
      earth: 'water'
  };

  if (winningCombinations[playerElement] === computerElement) {
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
      resultDisplay.textContent = "YOU WIN!";
      sounds.victory.play();
      return 'player';
  } else {
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
      resultDisplay.textContent = "YOU LOSE!";
      sounds.defeat.play();
      return 'computer';
  }
}

function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}
