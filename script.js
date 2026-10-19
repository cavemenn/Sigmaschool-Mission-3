/* Ledger Balance System

const User = require('./user.js')

const person = new User("Bin Rashid", "Muhamad Abu Bakar");

const greeting = document.getElementById("greeting");
greeting.textContent = `Welcome, ${person.fullname?.lastName}!`;

const expenses = ["food", "rent", "others", "saving"];

function calculate() {
  const salary = Number(document.getElementById("salary").value) || 0;

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    const val = Number(document.getElementById(expenses[i]).value) || 0;
    total += val;
  }

  const balance = salary - total;
  const percent = (balance / salary) * 100;

  const result = document.getElementById("result");
  result.textContent = `Net Balance: $${balance} (${
    percent.toFixed(1) + '%'
  } of income)`;

  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";
}
