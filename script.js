let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const netBalance = document.getElementById("net-balance");

function updateTotals() {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  totalIncome.textContent = `₹${income}`;
  totalExpenses.textContent = `₹${expense}`;
  netBalance.textContent = `₹${income - expense}`;
}

function renderTransactions() {
  list.innerHTML = '';
  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      <div> Date - <span> ${t.date} </span> </div>
      <div> Name - <span> ${t.description} </span> </div>
      <div> Type - <span> ${t.category} </span> </div> 
      <div> Amount - <span> ₹${t.amount} </span> </div> 
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateTotals();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const type = document.getElementById("type").value;

  if (!date || !description || !amount || !category || !type || isNaN(amount) || amount <= 0) {
    alert("Please fill all fields with valid data.");
    return;
  }

  transactions.push({ date, description, amount, category, type });
  form.reset();
  saveAndRender();
});

// Initial render
saveAndRender();
