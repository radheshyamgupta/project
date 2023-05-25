
var amount = document.querySelector("#amount");
var description = document.querySelector("#description");
var category = document.querySelector("#category");
var form = document.querySelector("#expense-form");
var expenseList = document.querySelector("#expense-list");

function populateUserList(response) {
  expenseList.innerHTML = "";

  if (response.length > 0) {
    response.forEach(function (user, index) {
      var li = document.createElement("li");
      li.innerHTML = `
        <span>${user.amount}</span>
        <span>${user.description}</span>
        <span>${user.category}</span>
        <div>
          <button class="delete-btn" data-id="${user._id}">&#10006;</button>
          <i class="edit-icon" data-id="${user._id}">&#9998;</i>
        </div>
      `;
      expenseList.appendChild(li);
    });

    var deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", deleteExpense);
    });

    var editIcons = document.querySelectorAll(".edit-icon");
    editIcons.forEach(function (editIcon) {
      editIcon.addEventListener("click", editExpense);
    });
  }
}

function deleteExpense(e) {
  var userId = e.target.dataset.id;

  axios
    .delete(`https://crudcrud.com/api/f695b7eb9a844a62895167846f6975a8/endpoint/${userId}`)
    .then((response) => {
      console.log(response);
      e.target.parentElement.parentElement.remove(); // Remove the expense detail from the website
      deleteFromBackend(userId); // Delete the expense from the backend as well
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteFromBackend(userId) {
  axios
    .delete(`https://crudcrud.com/api/f695b7eb9a844a62895167846f6975a8/endpoint/${userId}`)
    .then((response) => {
      console.log(response);
      displayData();
    })
    .catch((err) => {
      console.log(err);
    });
}

function editExpense(e) {
  var userId = e.target.dataset.id;

  axios
    .get(`https://crudcrud.com/api/f695b7eb9a844a62895167846f6975a8/endpoint/${userId}`)
    .then((response) => {
      var expense = response.data;

      // Populate the form with the expense details
      amount.value = expense.amount;
      description.value = expense.description;
      category.value = expense.category;

      // Set the user ID as an attribute of the form
      form.setAttribute("data-id", userId);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", displayData);

function displayData() {
  axios
    .get("https://crudcrud.com/api/f695b7eb9a844a62895167846f6975a8/endpoint")
    .then((response) => {
      populateUserList(response.data);
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
  var userId = form.getAttribute("data-id"); // Get the user ID from the form

  if (amountData && descriptionData && categoryData) {
    var expense = {
      amount: amountData,
      description: descriptionData,
      category: categoryData,
    };

    // Check if a user ID is present in the form
    if (userId) {
      // User is editing an expense
      axios
        .put(`https://crudcrud.com/api/f695b7eb9a844a62895167846f6975a8/endpoint/${userId}`, expense)
        .then((response) => {
          console.log(response);
          form.reset();
          populateUserList(response.data); // Update the expense list with the edited expense
          form.removeAttribute("data-id"); // Remove the user ID from the form
          displayData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // User is adding a new expense
      axios
        .post("https://crudcrud.com/api/f695b7eb9a844a62895167846f6975a8/endpoint", expense)
        .then((response) => {
          console.log(response);
          form.reset();
          populateUserList(response.data); // Update the expense list with the new expense
          displayData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
