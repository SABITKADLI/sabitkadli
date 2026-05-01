// SQL Query Builder Game Logic

let sqlQuery = [];

document.addEventListener('DOMContentLoaded', () => {
  const sqlBlocks = document.querySelectorAll('.sql-block');

  sqlBlocks.forEach(block => {
    block.addEventListener('click', () => {
      if (!block.disabled) {
        const value = block.getAttribute('data-value');
        sqlQuery.push(value);
        updateSQLDisplay();
        block.disabled = true;
        block.style.opacity = '0.5';
      }
    });
  });
});

function updateSQLDisplay() {
  const output = document.getElementById('sql-query-output');
  output.textContent = sqlQuery.join(' ');
}

function checkSQLQuery() {
  const correctQuery = 'SELECT name, total FROM purchases WHERE total > 1000 AND year = 2024';
  const userQuery = sqlQuery.join(' ');
  const feedback = document.getElementById('sql-feedback');

  if (userQuery === correctQuery) {
    feedback.textContent = 'Correct! Your query will retrieve the right data.';
    feedback.className = 'correct';
  } else {
    feedback.textContent = 'Not quite right. Try again!';
    feedback.className = 'incorrect';
  }
}

function resetSQLGame() {
  sqlQuery = [];
  document.getElementById('sql-query-output').textContent = '';
  document.getElementById('sql-feedback').textContent = '';
  document.getElementById('sql-feedback').className = '';

  document.querySelectorAll('.sql-block').forEach(block => {
    block.disabled = false;
    block.style.opacity = '1';
  });
}