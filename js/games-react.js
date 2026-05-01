// React Memory Game Logic

const reactConcepts = [
  'useState', 'useState',
  'useEffect', 'useEffect',
  'Props', 'Props',
  'JSX', 'JSX',
  'Components', 'Components',
  'Hooks', 'Hooks',
  'Virtual DOM', 'Virtual DOM',
  'State', 'State'
];

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

document.addEventListener('DOMContentLoaded', () => {
  initReactGame();
});

function initReactGame() {
  const grid = document.getElementById('react-memory-grid');
  if (!grid) return;

  const shuffled = shuffleArray([...reactConcepts]);
  grid.innerHTML = '';

  shuffled.forEach((concept, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.concept = concept;
    card.dataset.index = index;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  this.textContent = this.dataset.concept;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('react-moves').textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.concept === card2.dataset.concept) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    document.getElementById('react-matches').textContent = matchedPairs;
    flippedCards = [];

    if (matchedPairs === 8) {
      setTimeout(() => {
        alert(`Congratulations! You matched all pairs in ${moves} moves!`);
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '?';
      card2.textContent = '?';
      flippedCards = [];
    }, 1000);
  }
}

function resetReactGame() {
  matchedPairs = 0;
  moves = 0;
  flippedCards = [];
  document.getElementById('react-moves').textContent = moves;
  document.getElementById('react-matches').textContent = matchedPairs;
  initReactGame();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}