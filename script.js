/* Ledger Balance System */

import { User } from './user.js';

const firstName = prompt("Enter your first name:") ?? "";
const lastName = prompt("Enter your last name:") ?? "";

const person = new User(firstName.trim(), lastName.trim());

const greeting = document.getElementById("greeting");
greeting.textContent = person.fullname ? `Welcome, ${person.fullname}!` : "Welcome!";

const expenses = ["food", "rent", "shopping", "others", "saving"];

const rows = [
  { id: 'salary', item: 'Salary', type: 'Inflow' },
  { id: 'food', item: 'Food', type: 'Outflow' },
  { id: 'rent', item: 'Rent', type: 'Outflow' },
  { id: 'shopping', item: 'Shopping', type: 'Outflow' },
  { id: 'others', item: 'Others', type: 'Outflow' },
  { id: 'saving', item: 'Saving', type: 'Allocation' },
];

function getAmount(id) {
  const value = Number(document.getElementById(id).value);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function buildTable(salary, balance) {
  const tbody = document.querySelector('#ledger-table tbody');
  tbody.innerHTML = ''; // clear old rows first

  rows.forEach((row) => {
    const amount = getAmount(row.id);
    const percent = salary > 0 ? (amount / salary) * 100 : 0;

    tbody.innerHTML += `
      <tr class="${row.type.toLowerCase()}">
        <td>${row.item}</td>
        <td>RM ${amount.toFixed(2)}</td>
        <td>${row.type}</td>
        <td>${percent.toFixed(1)}%</td>
      </tr>`;
  });

  // Last row: net balance
  const balancePercent = salary > 0 ? (balance / salary) * 100 : 0;
  tbody.innerHTML += `
    <tr class="total">
      <td>Net balance</td>
      <td>RM ${balance.toFixed(2)}</td>
      <td></td>
      <td>${balancePercent.toFixed(1)}%</td>
    </tr>`;

  document.getElementById('ledger-table').hidden = false; // show the table
}

function calculate() {
  const result = document.getElementById("result");
  const table = document.getElementById("ledger-table");
  const salary = getAmount("salary");

  if (salary <= 0) {
    result.textContent = "Please enter your salary first.";
    result.style.backgroundColor = "#fff3cd";
    result.style.color = "#856404";
    result.hidden = false;
    table.hidden = true;
    return;
  }

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += getAmount(expenses[i]);
  }

  const balance = salary - total;
  const percent = salary > 0 ? (balance / salary) * 100 : 0;

  result.textContent = `Net Balance: RM ${balance.toFixed(2)} (${
    percent.toFixed(1) + '%'
  } of income)`;

  document.getElementById('result').hidden = false; // show the result

  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";

  buildTable(salary, balance);
}

document.getElementById('calculate-btn').addEventListener('click', calculate);
