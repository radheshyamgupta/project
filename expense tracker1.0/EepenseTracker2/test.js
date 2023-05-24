
var amount = document.querySelector("#amount");
var description = document.querySelector("#description");
var category = document.querySelector("#category");
var form = document.querySelector("#expense-form");
var expenseList = document.querySelector("#expense-list");

// Retrieve expenses from local storage or initialize an empty array
var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Populate expense list with saved expenses
function populateExpenseList() {
  expenseList.innerHTML = "";

  if (expenses.length > 0) {
    expenses.forEach(function (expense, index) {
      var li = document.createElement("li");
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
}

populateExpenseList();

form.addEventListener("submit", addExp);

function addExp(e) {
  e.preventDefault();

  var amountData = parseFloat(amount.value).toFixed(2);
  var descriptionData = description.value;
  var categoryData = category.value;

  if (amountData && descriptionData && categoryData) {
    var expense = {
      amount: amountData,
      description: descriptionData,
      category: categoryData,
    };

    // Add new expense to the array
    expenses.push(expense);
    axios.post('https://crudcrud.com/api/98728a5fa17c4ccaa3f3a4c425efede3/endpoint',expense)
    .then((response)=>{
      console.log(response)
    })
    .catch((err)=>{
console.log(err)
    })

    // Store the updated expenses array in local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Clear form fields
    form.reset();

    // Update the expense list on the web page
    populateExpenseList();
  }
}

expenseList.addEventListener("click", handleExpenseListClick);

function handleExpenseListClick(e) {
  if (e.target.classList.contains("delete-btn")) {
    var index = e.target.dataset.index;
    deleteExpense(index);
  } else if (e.target.classList.contains("edit-btn")) {
    var index = e.target.dataset.index;
    editExpense(index);
  }
}

function deleteExpense(index) {
  if (index >= 0 && index < expenses.length) {
    // Remove the expense at the specified index
    expenses.splice(index, 1);

    // Store the updated expenses array in local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Update the expense list on the web page
    populateExpenseList();
  }
}

function editExpense(index) {
  if (index >= 0 && index < expenses.length) {
    var expense = expenses[index];

    // Populate the form fields with the expense data
    amount.value = expense.amount;
    description.value = expense.description;
    category.value = expense.category;

    // Remove the expense from the array
    expenses.splice(index, 1);

    // Store the updated expenses array in local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Update the expense list on the web page
    populateExpenseList();
  }
}
