class TransactionDetails {

  constructor(date, transactionType, amount, balance) {
    this.date = date.replaceAll('-', '/'); // replace method to change hyphens to forward slashes
    this.transactionType = transactionType;
    this.amount = amount;
    this.balance = balance;
  }  
  
  getDate() {
    return this.date;
  }
  
  getTransactionType() {
    return this.transactionType;
  }

  getAmount() {
    return this.amount;
  }

  getBalance() {
    return this.balance;
  }
}

module.exports = TransactionDetails;