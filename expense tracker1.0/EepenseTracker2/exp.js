
const expenseForm = document.querySelector('#expense-form');
const amountInput = document.querySelector('#amount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const expenseList = document.querySelector('#expense-list');

// Initialize expenses array from local storage or create a new one
let expenses = JSON.parse(localStorage.getItem('expensesData')) || [];

// Populate expense list with saved expenses
function populateExpenseList() {
  expenseList.innerHTML = '';
  expenses.forEach(function(expense, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>₹${expense.amount}</span>
      <span>${expense.description}</span>
      <span>${expense.category}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="edit-btn" data-index="${index}">Edit</button>
    `;
    expenseList.appendChild(li);
  });
}

populateExpenseList();

// Save expenses to local storage
function saveExpenses() {
  localStorage.setItem('expensesData', JSON.stringify(expenses));
}

// Add expense to list and local storage
function addExpense(amount, description, category) {
  const newExpense = {
    amount: amount,
    description: description,
    category: category
  };
  expenses.push(newExpense);
  populateExpenseList();
  saveExpenses();
}

// Delete expense from list and local storage
function deleteExpense(index) {
  expenses.splice(index, 1);
  populateExpenseList();
  saveExpenses();
}

// Edit expense in list and local storage
function editExpense(index, amount, description, category) {
  expenses[index].amount = amount;
  expenses[index].description = description;
  expenses[index].category = category;
  populateExpenseList();
  saveExpenses();
}

// Handle form submit to add expense
expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = parseFloat(amountInput.value).toFixed(2);
  const description = descriptionInput.value;
  const category = categoryInput.value;
  if (amount && description && category) {
    addExpense(amount, description, category);
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = 'food';
  }
});

// Handle delete and edit buttons
expenseList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    deleteExpense(index);
  } else if (e.target.classList.contains('edit-btn')) {
    const index = e.target.dataset.index;
    const expense = expenses[index];
    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;
    deleteExpense(index);
  }
});
