import { CountUp } from '/js/CountUp.min.js';
const debitAmount = document.querySelector("#debit-amount")
let debit = debitAmount.textContent;

window.onload = function() {
console.log(debit)
  var countUp = new CountUp('debit', 2000);
  countUp.start();
}