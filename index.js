const form = document.getElementById('transaction-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const list = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function renderTransactions() {
  list.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add('transaction', transaction.type);
    li.innerHTML = `
      ${transaction.description} 
      <span>${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})">×</button>
    `;
    list.appendChild(li);
  });
  updateBalance();
}

function updateBalance() {
  const total = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' 
      ? acc + transaction.amount 
      : acc - transaction.amount;
  }, 0);
  balanceDisplay.textContent = `$${total.toFixed(2)}`;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateLocalStorage();
  renderTransactions();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description && !isNaN(amount)) {
    transactions.push({ description, amount, type });
    updateLocalStorage();
    renderTransactions();
    form.reset();
  }
});

renderTransactions();