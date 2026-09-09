const display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.value = expression;
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === 'clear') {
      expression = '';
    } else if (action === 'backspace') {
      expression = expression.slice(0, -1);
    } else if (action === 'equal') {
      try {
        const result = evaluateExpression(expression);
        expression = String(result);
      } catch (e) {
        expression = 'Error';
      }
    } else if (value !== undefined) {
      expression += value;
    }

    updateDisplay();
  });
});

function evaluateExpression(expr) {
  if (!/^[0-9+\-*/%.\s]+$/.test(expr)) {
    throw new Error('Invalid characters');
  }
  // eslint-disable-next-line no-new-func
  return Function('"use strict"; return (' + expr + ')')();
}

updateDisplay();
