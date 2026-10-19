/* Ledger Balance System */

import { User } from './user.js';

const person = new User("Muhamad Abu Bakar", "Bin Rashid");

const greeting = document.getElementById("greeting");
greeting.textContent = `Welcome, ${person.fullname}!`;

const expenses = ["food", "rent", "others", "saving"];

const rows = [
  { id: 'salary', item: 'Salary', type: 'Inflow' },
  { id: 'food', item: 'Food', type: 'Outflow' },
  { id: 'rent', item: 'Rent', type: 'Outflow' },
  { id: 'others', item: 'Others', type: 'Outflow' },
  { id: 'saving', item: 'Saving', type: 'Allocation' },
];

function buildTable(salary, balance) {
  const tbody = document.querySelector('#ledger-table tbody');
  tbody.innerHTML = ''; // clear old rows first

  rows.forEach((row) => {
    const amount = Number(document.getElementById(row.id).value) || 0;
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
  const salary = Number(document.getElementById("salary").value) || 0;

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    const val = Number(document.getElementById(expenses[i]).value) || 0;
    total += val;
  }

  const balance = salary - total;
  const percent = salary > 0 ? (balance / salary) * 100 : 0;

  const result = document.getElementById("result");
  result.textContent = `Net Balance: RM ${balance.toFixed(2)} (${
    percent.toFixed(1) + '%'
  } of income)`;

  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";

  buildTable(salary, balance);
}

document.getElementById('calculate-btn').addEventListener('click', calculate);
