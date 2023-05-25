
var amount = document.querySelector("#amount");
var description = document.querySelector("#description");
var category = document.querySelector("#category");
var form = document.querySelector("#expense-form");
var expenseList = document.querySelector("#expense-list");

function populateExpenseList(response) {
  expenseList.innerHTML = "";

  if (response.length > 0) {
    response.forEach(function (expense, index) {
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

window.addEventListener("DOMContentLoaded", displayData);

function displayData() {
  axios.get('https://crudcrud.com/api/98728a5fa17c4ccaa3f3a4c425efede3/endpoint')
    .then((response) => {
      populateExpenseList(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

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

    axios.post('https://crudcrud.com/api/98728a5fa17c4ccaa3f3a4c425efede3/endpoint', expense)
      .then((response) => {
        console.log(response);
        form.reset();
        populateExpenseList(response.data); // Update the expense list with the new expense
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  
}
