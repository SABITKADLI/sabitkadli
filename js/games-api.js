// API Integration Game Logic

let apiScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  const draggables = document.querySelectorAll('.draggable');
  const dropzones = document.querySelectorAll('.dropzone');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
  });

  dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', handleDragOver);
    dropzone.addEventListener('dragleave', handleDragLeave);
    dropzone.addEventListener('drop', handleDrop);
  });
});

function handleDragStart(e) {
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.getAttribute('data-api'));
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  this.classList.add('drag-over');
  return false;
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  this.classList.remove('drag-over');

  const apiName = e.dataTransfer.getData('text/html');
  const matchValue = this.getAttribute('data-match');

  if (apiName === matchValue && !this.classList.contains('filled')) {
    this.classList.add('correct', 'filled');
    this.style.borderColor = 'var(--accent-green)';

    // Remove the draggable element
    const draggable = document.querySelector(`[data-api="${apiName}"]`);
    if (draggable) {
      draggable.style.display = 'none';
    }

    apiScore++;
    document.getElementById('api-score').textContent = apiScore;

    if (apiScore === 5) {
      setTimeout(() => {
        alert('Great work! You matched all APIs correctly.');
      }, 300);
    }
  }

  return false;
}

function resetAPIGame() {
  apiScore = 0;
  document.getElementById('api-score').textContent = apiScore;

  document.querySelectorAll('.dropzone').forEach(zone => {
    zone.classList.remove('correct', 'filled');
    zone.style.borderColor = '';
  });

  document.querySelectorAll('.draggable').forEach(item => {
    item.style.display = 'block';
  });
}