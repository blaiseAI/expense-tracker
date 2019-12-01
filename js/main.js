// APPLICATION SCOPE
window.addEventListener("load", e => {
  // DOM Declaration for Form, Display, RemoveIcon
  const expenseForm = document.querySelector("form");
  const expenseDisplay = document.querySelector(".expenses-display");
  const removeIcon = `<img src="images/icons/recycle-bin.svg">`;
  const ErrorMessageSummary = document.querySelector(".error-message-summary");
  const ErrorMessageParagraph = document.querySelector(".error-message p");
  const emptyTemplate = document.querySelector(".empty-Template");
  ErrorMessageSummary.style.display = "none";
  // DOM Declaration for Dashboard credit,debit,balance
  const dashboardCreditAmount = document.querySelector("#credit-amount");
  const dashboardDeditAmount = document.querySelector("#debit-amount");
  const dashboardBalanceAmount = document.querySelector("#balance-amount");
  // Dataset for all the transactions
  let transactions = [];
  // Dashboard credit, debit, balance Initialization

  let debitAmount = 0;
  let creditAmount = 0;
  let removedDebitTransaction = 0;
  let removedCreditTransaction = 0;
  let balance = 0;

  /**
   * Processing Starts from here
   *
   */

  // Display Dashboard credit, debit, balance
  dashboardUpdate(debitAmount, creditAmount);

  let SumOfDebits = 0;
  let SumOfCredits = 0;
  expenseForm.addEventListener("submit", e => {
    e.preventDefault();
    // validate the form data
    FormValidation(expenseForm);
    const ValidExpenseItem = FormValidation(e.target);
    console.log(ValidExpenseItem);
    if (ValidExpenseItem.valid) {
      transactions.push(ValidExpenseItem);
      // end of code to be Edited
      console.table(transactions);
      // Pass the object to the htmlString and use the template literal
      const htmlString = createDOMExpenseItem(ValidExpenseItem);
      ConvertingStringToNode(htmlString);
      // clear the form
      e.target.reset();
      expenseForm.elements.description.focus();
      SumOfDebits = CalculateSumOfDebits(transactions);
      SumOfCredits = CalculateSumOfCredits(transactions);
      dashboardUpdate(SumOfCredits, SumOfDebits);

      console.log(`Sum of Debits ${SumOfDebits}`);
      console.log(`Sum of Credits ${SumOfCredits}`);
    } else {
      const htmlString = createDOMExpenseItem(ValidExpenseItem);
      ConvertingStringToNode(htmlString);
    }
  });

  /**
   *  CalculateSumOfDebits
   */

  function CalculateSumOfDebits(transactions) {
    const TransactionTypeDebit = transactions.filter(transaction => {
      if (transaction.cardtype === "debit") {
        return transaction;
      }
    });
    let sumDebit = 0;
    TransactionTypeDebit.forEach(element => {
      sumDebit = sumDebit + Number.parseFloat(element.amount);
    });
    //console.log(`Debit ${sumDebit}`);
    return sumDebit;
  }

  /**
   *  CalculateSumOfDebits
   */

  function CalculateSumOfCredits(transactions) {
    const TransactionTypeCredit = transactions.filter((transaction, index) => {
      if (transaction.cardtype === "credit") {
        return transaction;
      }
    });
    let sumCredit = 0;
    TransactionTypeCredit.forEach(element => {
      sumCredit = sumCredit + Number.parseFloat(element.amount);
    });
    //console.log(`Credit ${sumCredit}`);
    return sumCredit;
  }

  /**
   * addToExpenses function
   */

  function ConvertingStringToNode(htmlString) {
    const makeIndex = expenseDisplay.children.length;
    let makeNodeFromText = document
      .createRange()
      .createContextualFragment(htmlString);

    let row = makeNodeFromText.querySelector("tr");
    let image = row.querySelector("img");
    image.dataset.index = makeIndex;
    let removedTransaction = image.addEventListener("click", removeExpenseItem);
    expenseDisplay.appendChild(row);
    return removedTransaction;
  }
  /**
   * RemoveExpense function
   */
  function removeExpenseItem(e) {
    let expenseToRemove = expenseDisplay.children[e.target.dataset.index];
    let indexRemoveItem = e.target.dataset.index;
    const expenseTypeToRemove = expenseToRemove.querySelector(".cardType")
      .textContent;

    let confirmation = confirm("Are you sure delete ");
    if (confirmation) {
      transactions.splice(indexRemoveItem, 1);
      let RemovedCalculatedDebits = CalculateSumOfDebits(transactions);
      let RemovedCalculatedCredits = CalculateSumOfCredits(transactions);
      dashboardUpdate(RemovedCalculatedCredits, RemovedCalculatedDebits);
      // problem is everytime you remove  you will have to reset dataindex
      expenseDisplay.removeChild(expenseToRemove);
      // solution dataindex
      // get a node list from itemDisplay querySelectAll() -> Nodelist
      // reset all the dataindex
      let resetElements = expenseDisplay.querySelectorAll("tr");
      resetElements.forEach((element, index) => {
        const image = element.querySelector("img");
        // resets and assigns the indexes again
        image.dataset.index = index;
      });
      return removedItem;
    }
  }

  /**
   * Build the DOM with Expense Items
   */

  function createDOMExpenseItem(newExpense) {
    const ExpesenseElement = `
    <table>
      <tr class="${newExpense.cardtype}">
          <td class="ExpenseDescription">${newExpense.description}</td>
          <td class="cardType">${newExpense.cardtype}</td>
          <td class="expenseAmount">${numeral(newExpense.amount).format(
            "$0,0.00"
          )} </td>
          <td class="date-time-stamp">${newExpense.date}</td>
          <td class="remove">${removeIcon}</td>
      </tr>
    <table>
    `;
    return ExpesenseElement;
  }

  // Empty Template function

  function EmptyTemplate() {
    const noData = `
    <table>
      <tr>
          <td class="ExpenseDescription" colspan="4">There is no expenses to display</td>
      </tr>
    <table>
    `;
    return noData;
  }

  /**
   * Function to update the dashboard values
   */
  function dashboardUpdate(creditAmount, debitAmount) {
    let dashboardArray = [];
    dashboardCreditAmount.textContent = numeral(creditAmount).format("$0,0.00");
    dashboardDeditAmount.textContent = numeral(debitAmount).format("$0,0.00");
    dashboardArray.push(creditAmount, debitAmount);
    balance = debitAmount + creditAmount;
    dashboardBalanceAmount.textContent = numeral(balance).format("$0,0.00");
    return dashboardArray;
  }

  /**
   *  Form Validation
   */

  function FormValidation(expenseForm) {
    const ExpenseItem = {};
    let errorCount = 0;
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (expenseForm.elements.description.value.trim() !== "") {
      ExpenseItem.description = expenseForm.elements.description.value;
      ErrorMessageSummary.style.display = "none";
    }

    if (expenseForm.elements.cardtype.value.trim() !== "") {
      ExpenseItem.cardtype = expenseForm.elements.cardtype.value;
      ErrorMessageSummary.style.display = "none";
    }
    if (
      expenseForm.elements.amount.value.trim() !== "0" &&
      expenseForm.elements.amount.value.trim() !== ""
    ) {
      ExpenseItem.amount = financial(expenseForm.elements.amount.value);
      ErrorMessageSummary.style.display = "none";
    }

    // Required field form validation
    if (
      expenseForm.elements.amount.value.trim() == "" ||
      expenseForm.elements.amount.value.trim() == 0
    ) {
      InvalidMessages("💸Amount");
      errorCount++;
    }
    if (expenseForm.elements.cardtype.value.trim() == "") {
      InvalidMessages("💳Card Type");
      errorCount++;
    }
    if (expenseForm.elements.description.value.trim() == "") {
      InvalidMessages("📑Description");
      errorCount++;
    }

    if (errorCount === 0) {
      ExpenseItem.valid = true;
      ExpenseItem.date = date;
      return ExpenseItem;
    }
    if (errorCount != 0) {
      ExpenseItem.valid = false;
    }
  }

  function InvalidMessages(invalidValue) {
    ErrorMessageSummary.style.display = null;
    ErrorMessageParagraph.textContent = ` Please provide a valid expense ${invalidValue}`;
  }
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
}); // END OF APP
