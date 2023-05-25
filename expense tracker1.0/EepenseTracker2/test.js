
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
        <button class="delete-btn" data-id="${user._id}">&#10006;</button>
      `;
      expenseList.appendChild(li);
    });

 
    var deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", deleteUser);
    });
  }
}

function deleteUser(e) {
  var userId = e.target.dataset.id;

  axios.delete(`https://crudcrud.com/api/98728a5fa17c4ccaa3f3a4c425efede3/endpoint/${userId}`)
    .then((response) => {
      console.log(response);
      e.target.parentElement.remove(); // Removed the user detail from the website
      displayData()
    })
    .catch((err) => {
      console.log(err);
    });
}

// ...


window.addEventListener("DOMContentLoaded", displayData);

function displayData() {
  axios.get('https://crudcrud.com/api/98728a5fa17c4ccaa3f3a4c425efede3/endpoint')
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
        populateUserList(response.data); // Update the expense list with the new expense
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  
}
