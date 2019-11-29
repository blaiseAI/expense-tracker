/**
 * Expense Tracker
 *
 */
window.addEventListener("load", e => {
  let transactions = [];

  // function myInformations() {
  //   // This part is not part of the assignment just playing around`
  //   const year = new Date();
  //   console.group('Expense Tracker💰');
  //   console.info(`Author📜: Blaise Sebagabo ${year.getFullYear()}`);
  //   console.groupEnd();
  //   console.group('About Me😎');
  //   console.info(
  //     '%c%s',
  //     'color:green;font-size:13px;',
  //     'Full-stack Developer, and Current Student at NAIT in Computer Sotware Development.'
  //   );
  //   console.groupEnd();
  //   console.group('Holla at me @Github & LinkedIn');
  //   console.info('GithubID:blaiseai, URL: https://github.com/blaiseAI');
  //   console.info('Personal website: https://seblaise.dev/');
  //   console.groupEnd();
  //   console.log('**************************');
  //   // end of Project Details
  // }
  // Application Scope
  // Show my information in the console
  // myInformations();
  // end of my information
  const dashboardCreditAmount = document.querySelector("#credit-amount");
  const dashboardDeditAmount = document.querySelector("#debit-amount");
  const dashboardBalanceAmount = document.querySelector("#balance-amount");

  let debitAmount = 0;
  let creditAmount = 0;
  let balance = 0;
  dashboardCreditAmount.textContent = numeral(debitAmount).format("$0,0.00");
  dashboardDeditAmount.textContent = numeral(creditAmount).format("$0,0.00");
  dashboardBalanceAmount.textContent = numeral(balance).format("$0,0.00");
  const descriptionInput = document.querySelector("#description");
  const cardTypeSelection = document.querySelector("#card-type");
  let amountInput = document.querySelector("#amount");
  const formData = document.querySelector("#transaction-form");
  formData.addEventListener("submit", e => {
    e.preventDefault();

    let description = descriptionInput.value;
    let cardtype =
      cardTypeSelection.options[cardTypeSelection.selectedIndex].value;
    let amount = financial(amountInput.value);
    // Validate your data
    if (description.trim() == "") {
      console.error("Please provide a desc");
    } else if (cardTypeSelection.selectedIndex === 0) {
      console.error("Please Select a card");
    } else if (amount <= 0) {
      console.error("Please a valid positive amount");
    } else {
      // Add a new transaction
      let newTransation = {
        desc: description,
        type: cardtype,
        amount: amount
      };
      // Add the new transaction object to the array
      transactions.push(newTransation);
      console.table(transactions);
      // copy of the array and use the spread operator to manupilate it
      const TransactionTempList = [...transactions];

      // Function to calculte the total credit amoount
      creditAmount = CalculatesumCredit(TransactionTempList);
      // Function to calculte the total debit amoount
      debitAmount = CalculatesumDebit(TransactionTempList);
      // calculate the total
      balance = debitAmount + creditAmount;
      // Set the dashboard Creditamount
      dashboardCreditAmount.textContent = numeral(creditAmount).format(
        "$0,0.00"
      );
      dashboardDeditAmount.textContent = numeral(debitAmount).format("$0,0.00");
      dashboardBalanceAmount.textContent = numeral(balance).format("$0,0.00");
    }
  });
  function CalculatesumDebit(TransactionTempList) {
    const TransactionTypeCredit = TransactionTempList.filter(
      (transaction, index) => {
        if (transaction.type === "debit") {
          return transaction;
        }
      }
    );
    let sum = 0;
    TransactionTypeCredit.forEach(element => {
      sum = sum + Number.parseFloat(element.amount);
    });
    return sum;
  } //EOCalculateSumDebit

  function CalculatesumCredit(TransactionTempList) {
    const TransactionTypeCredit = TransactionTempList.filter(
      (transaction, index) => {
        if (transaction.type === "credit") {
          return transaction;
        }
      }
    );
    let sum = 0;
    TransactionTypeCredit.forEach(element => {
      sum = sum + Number.parseFloat(element.amount);
    });
    return sum;
  }
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
});
