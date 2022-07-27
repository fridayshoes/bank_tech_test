const Statement  = require("./Statement");

describe(Statement, () => {
  it("initialises a new statement that has a balance of 0", () => {
    account = new Statement();
    
    expect(account.balance).toBe(0);
  })

  it("returns an empty array when no transactions have been made", () => {
    account = new Statement();

    expect(account.transactionList).toEqual([]);
  })

  it("allows users to deposit on a date", () => {
    account = new Statement();

    account.deposit(500, '27-03-2023');
    account.getBalance();

    expect(account.transactionList).toEqual([{
      date: "27/03/2023",
      transactionType: "deposit",
      amount: 500,
      balance: 500,
    }])
    expect(account.balance).toBe(500);
  })

  it("allows users to withdraw on a date", () => {
    account = new Statement();

    account.withdraw(1000, '30-04-2023');
    account.getBalance();

    expect(account.transactionList).toEqual([{
      date: "30/04/2023",
      transactionType: "withdraw",
      amount: 1000,
      balance: -1000,
    }])
    expect(account.balance).toBe(-1000);
  })

  it("updates the balance when multiple transactions are made", () => {
    account = new Statement();

    account.deposit(2500, '23-02-2023');
    account.deposit(500, '27-03-2023');
    account.withdraw(1000, '30-04-2023');
    account.getBalance();

    expect(account.balance).toBe(2000);
  })

  it("creates a statement with newest transaction at the top", () => {
    console.log = jest.fn();
    account = new Statement();

    account.deposit(2500, '23-02-2023');
    account.deposit(500, '27-03-2023');
    account.withdraw(1000, '30-04-2023');
    account.createStatement()
    
    expect(console.log).toHaveBeenCalledWith(
      "date || credit || debit || balance\n" + 
      "30/04/2023 || ||1000.00 || 2000.00\n" +
      "27/03/2023 ||500.00 || || 3000.00\n" + 
      "23/03/2023 || 2500.00 || || 2500.00"
      // Received output matches appart from speech marks
    );
  })

});