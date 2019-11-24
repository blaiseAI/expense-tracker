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

  // Experimentation code to be removed
  let transactions = [];
  // Dashboard credit, debit, balance Initialization

  let debitAmount = 0;
  let creditAmount = 0;
  let balance = 0;

  /**
   * Processing Starts from here
   *
   */

  // Display Dashboard credit, debit, balance
  dashboardUpdate(debitAmount, creditAmount);

  // use an empty Template
  // const DomEmptyTemplate = EmptyTemplate();
  // ConvertingEmptyTemplateStringToNode(DomEmptyTemplate);
  // console.log(DomEmptyTemplate);
  // Process the form
  expenseForm.addEventListener("submit", e => {
    e.preventDefault();

    // validate the form data
    FormValidation(expenseForm);
    const ValidExpenseItem = FormValidation(e.target);

    // Code to be checked Tomorrow
    transactions.push(ValidExpenseItem);
    // copy of the array and use the spread operator to manupilate it
    const TransactionTempList = [...transactions];
    // end of code to be Edited

    if (ValidExpenseItem.valid) {
      // Pass the object to the htmlString and use the template literal
      const htmlString = createDOMExpenseItem(ValidExpenseItem);
      ConvertingStringToNode(htmlString);
      CalculateSumOfDebits(TransactionTempList);
    }
  });

  /**
   *  CalculateSumOfDebits
   */

  function CalculateSumOfDebits(TransactionTempList) {
    const TransactionTypeCredit = TransactionTempList.filter(
      (transaction, index) => {
        if (transaction.cardtype === "debit") {
          return transaction;
        }
      }
    );
    console.log(TransactionTypeCredit);
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
    image.addEventListener("click", removeExpenseItem);
    expenseDisplay.appendChild(row);
  }

  // convertingEmptyTemplate to node

  function ConvertingEmptyTemplateStringToNode(htmlString) {
    let makeNodeFromText = document
      .createRange()
      .createContextualFragment(htmlString);
    let row = makeNodeFromText.querySelector("tr");
    expenseDisplay.appendChild(row);
  }

  /**
   * RemoveExpense function
   */
  function removeExpenseItem(e) {
    let expenseToRemove = expenseDisplay.children[e.target.dataset.index];
    const expenseAmountToRemove = expenseToRemove.querySelector(
      ".expenseAmount"
    ).textContent;
    const expenseTypeToRemove = expenseToRemove.querySelector(".cardType")
      .textContent;
    console.log(expenseAmountToRemove, expenseTypeToRemove);
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
  }

  /**
   * Build the DOM with Expense Items
   */

  function createDOMExpenseItem(newExpense) {
    const ExpesenseElement = `
    <table>
      <tr>
          <td class="ExpenseDescription">${newExpense.description}</td>
          <td class="cardType">${newExpense.cardtype}</td>
          <td class="expenseAmount">${newExpense.amount}</td>
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
  function dashboardUpdate(debitAmount, creditAmount) {
    dashboardCreditAmount.textContent = numeral(debitAmount).format("$0,0.00");
    dashboardDeditAmount.textContent = numeral(creditAmount).format("$0,0.00");
    balance = debitAmount + creditAmount;
    dashboardBalanceAmount.textContent = numeral(balance).format("$0,0.00");
  }

  /**
   *  Form Validation
   */

  function FormValidation(expenseForm) {
    const ExpenseItem = {};
    let errorCount = 0;

    if (expenseForm.elements.description.value.trim() !== "") {
      ErrorMessageSummary.style.display = "none";
      ExpenseItem.description = expenseForm.elements.description.value;
    }

    if (expenseForm.elements.cardtype.value.trim() !== "") {
      ErrorMessageSummary.style.display = "none";
      ExpenseItem.cardtype = expenseForm.elements.cardtype.value;
    }
    if (
      expenseForm.elements.amount.value.trim() !== "0" &&
      expenseForm.elements.amount.value.trim() !== ""
    ) {
      ErrorMessageSummary.style.display = "none";
      ExpenseItem.amount = financial(expenseForm.elements.amount.value);
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
      return ExpenseItem;
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
