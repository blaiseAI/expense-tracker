/**
 * Expense Tracker
 *
 */
window.addEventListener('load', e => {
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

  // Grabbing the DOM

  const dashboardCreditAmount = document.querySelector('#credit-amount');
  const dashboardDeditAmount = document.querySelector('#debit-amount');
  const dashboardBalanceAmount = document.querySelector('#balance-amount');

  const debitAmount = 0;
  const creditAmount = 0;
  const balance = debitAmount + creditAmount;
  dashboardCreditAmount.textContent = numeral(debitAmount).format('$0,0.00');
  dashboardDeditAmount.textContent = numeral(creditAmount).format('$0,0.00');
  dashboardBalanceAmount.textContent = numeral(balance).format('$0,0.00');

  const descriptionInput = document.querySelector('#description');
  const cardTypeSelection = document.querySelector('#card-type');
  const amountInput = document.querySelector('#amount');
  const formData = document.querySelector('#transaction-form');
  let sumCredit = 0;
  formData.addEventListener('submit', e => {
    e.preventDefault();

    let description = descriptionInput.value;
    let cardtype =
      cardTypeSelection.options[cardTypeSelection.selectedIndex].value;
    let amount = financial(amountInput.value);
    dashboardCreditAmount.textContent = numeral(amount).format('$0,0.00');
    // Validate your data
    if (description.trim() == '') {
      console.error('Please provide a desc');
    } else if (cardTypeSelection.selectedIndex === 0) {
      console.error('Please Select a card');
    } else if (amount <= 0) {
      console.error('Please a valid positive amount');
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
      const TransactionType = TransactionTempList.filter(
        (transaction, index) => {
          if (transaction.type === 'credit') {
            return transaction;
          }
        }
      );
      TransactionType.forEach(element => {
        let credit = element.amount;
        let x = [10, 20, 1, 3, 5];
        // console.log(Math.min(...x));
        const arrMax = x => Math.max(...x);
        console.log(arrMax);
        //const arrSum = credit => credit.reduce((a, b) => a + b, 0);
        //console.log(arrSum);
        //console.log(Math.min(credit));
      });
    }
  });

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  // Form Validation Function
  // function formValidator(e) {
  //   // validation used to check if a card type is selected
  //   let validated = 0;
  //   let transactionObject = {};
  //   let transactionErrorObject = {};

  //   if (cardTypeSelection.selectedIndex == 0) {
  //     transactionErrorObject.item =
  //       cardTypeSelection.options[cardTypeSelection.selectedIndex].value;
  //     transactionErrorObject.message = 'Please select a card type';
  //     console.log(transactionErrorObject.message);
  //     validated++;
  //   }
  //   else if (e.target.description.value.trim() === '') {
  //     transactionErrorObject.message = 'Please provide a description';
  //   }
  //   else if (e.target.amount.value.trim() < 0) {
  //     transactionErrorObject.message = 'Please provide a description';
  //   } else {
  //     transactionObject.cardType =
  //       cardTypeSelection.options[cardTypeSelection.selectedIndex].value;
  //   }

  //   if (validated === 0) {
  //     transactionObject.valid = true;
  //     return transactionObject;
  //   }
  // }
});
