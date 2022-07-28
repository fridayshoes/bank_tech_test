const TransactionDetails = require("./TransactionDetails")

class Statement {
  constructor() {
    this.balance = 0;
    this.transactionList = [];
  }  
  
  deposit(value, date) {
    this.addTransaction(new TransactionDetails(date, "deposit", value));
  }

  withdraw(value, date) {
    this.addTransaction(new TransactionDetails(`${date}`, "withdraw", value));
  }  
  
  addTransaction(transaction) {
    this.transactionList = this.transactionList.concat(transaction);
  }
  
  getBalance() {
    this.transactionList.forEach ((transaction) => {
      if(transaction.transactionType === "deposit")
        this.balance += transaction.amount; // adds to balance if transactionType is deposit
      else
        this.balance -= transaction.amount; // subtracts from balance if transactionType is withdraw
        Object.assign(transaction, { balance: this.balance }) // assigns a k/v to the object with the value of the current balance
    })
  }

  // Inserts a balance object into the transactions array
  createStatement() {
    this.getBalance();
    const HEADING = `date || credit || debit || balance`;
    console.log(HEADING);
    this.transactionList.reverse();
    this.transactionList.forEach ((transaction) => {
      if(transaction.transactionType === "deposit")
        console.log(`${transaction.getDate()} || ${transaction.getAmount()}.00 || || ${transaction.getBalance()}.00`)
      else
        console.log(`${transaction.getDate()} || || ${transaction.getAmount()}.00 || ${transaction.getBalance()}.00`)
    })
  }
}

module.exports = Statement;


// Example result
// date       || credit  || debit  || balance
// 14/01/2023 ||         || 500.00 || 2500.00
// 13/01/2023 || 2000.00 ||        || 3000.00
// 10/01/2023 || 1000.00 ||        || 1000.00
