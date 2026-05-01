// Telephony Routing Game Logic

const callScenarios = [
  { text: 'Customer wants to purchase new service', dept: 'sales' },
  { text: 'Technical issue with internet connection', dept: 'tech' },
  { text: 'Question about recent invoice charges', dept: 'billing' },
  { text: 'Need help setting up email account', dept: 'support' },
  { text: 'Interested in upgrading current plan', dept: 'sales' },
  { text: 'System not responding to commands', dept: 'tech' },
  { text: 'Disputed charges on account', dept: 'billing' },
  { text: 'Password reset assistance needed', dept: 'support' },
  { text: 'Wants quote for enterprise solution', dept: 'sales' },
  { text: 'Network connectivity problems', dept: 'tech' }
];

let telCorrect = 0;
let telMissed = 0;
let telTimer = 0;
let currentCall = null;
let gameInterval = null;
let timerInterval = null;
let isGameActive = false;

document.addEventListener('DOMContentLoaded', () => {
  const routeButtons = document.querySelectorAll('.route-btn');

  routeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isGameActive && currentCall) {
        handleRoute(btn.dataset.dept);
      }
    });
  });
});

function startTelephonyGame() {
  telCorrect = 0;
  telMissed = 0;
  telTimer = 0;
  isGameActive = true;

  document.getElementById('tel-correct').textContent = telCorrect;
  document.getElementById('tel-missed').textContent = telMissed;
  document.getElementById('tel-timer').textContent = telTimer;

  const routeButtons = document.querySelectorAll('.route-btn');
  routeButtons.forEach(btn => btn.disabled = false);

  nextCall();

  timerInterval = setInterval(() => {
    telTimer++;
    document.getElementById('tel-timer').textContent = telTimer;
  }, 1000);

  document.querySelector('.start-btn').disabled = true;
}

function nextCall() {
  if (!isGameActive) return;

  currentCall = callScenarios[Math.floor(Math.random() * callScenarios.length)];
  document.getElementById('caller-info').textContent = currentCall.text;

  gameInterval = setTimeout(() => {
    if (isGameActive && currentCall) {
      telMissed++;
      document.getElementById('tel-missed').textContent = telMissed;
      nextCall();
    }
  }, 5000);
}

function handleRoute(selectedDept) {
  if (currentCall.dept === selectedDept) {
    telCorrect++;
    document.getElementById('tel-correct').textContent = telCorrect;
  } else {
    telMissed++;
    document.getElementById('tel-missed').textContent = telMissed;
  }

  clearTimeout(gameInterval);

  if (telCorrect + telMissed >= 10) {
    endGame();
  } else {
    nextCall();
  }
}

function endGame() {
  isGameActive = false;
  clearInterval(timerInterval);
  clearTimeout(gameInterval);

  const accuracy = Math.round((telCorrect / (telCorrect + telMissed)) * 100);
  alert(`Game Over!\nCorrect: ${telCorrect}\nMissed: ${telMissed}\nAccuracy: ${accuracy}%\nTime: ${telTimer}s`);

  document.querySelector('.start-btn').disabled = false;
  const routeButtons = document.querySelectorAll('.route-btn');
  routeButtons.forEach(btn => btn.disabled = true);
  document.getElementById('caller-info').textContent = 'Click Start to play again';
}

function resetTelephonyGame() {
  isGameActive = false;
  clearInterval(timerInterval);
  clearTimeout(gameInterval);

  telCorrect = 0;
  telMissed = 0;
  telTimer = 0;
  currentCall = null;

  document.getElementById('tel-correct').textContent = telCorrect;
  document.getElementById('tel-missed').textContent = telMissed;
  document.getElementById('tel-timer').textContent = telTimer;
  document.getElementById('caller-info').textContent = 'Click Start to begin';

  document.querySelector('.start-btn').disabled = false;
  const routeButtons = document.querySelectorAll('.route-btn');
  routeButtons.forEach(btn => btn.disabled = true);
}