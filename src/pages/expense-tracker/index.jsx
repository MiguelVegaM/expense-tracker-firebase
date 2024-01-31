import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { deleteDoc } from "firebase/firestore";

import "./styles.css";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDoc = async () => {
    await deleteDoc.deleteDoc(doc(db, "transactions", "17TAbvXh18zmuCOtf8UM"));
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div>
            {transactionTotals.balance > 0 ? (
              <h3>Your Balance is ${transactionTotals.balance}</h3>
            ) : (
              <h3>Your Balance is -${transactionTotals.balance * -1}</h3>
            )}

            <div className="summary">
              <div className="incomes">
                <h4>Incomes</h4>
                <p>${transactionTotals.income}</p>
              </div>
              <div className="expenses">
                <h4>Expenses</h4>
                <p>${transactionTotals.expenses}</p>
              </div>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <div className="typing-inputs">
              <input
                type="text"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>
            <div className="radio-inputs">
              <div>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="expense">Expense</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="income">Income</label>
              </div>
            </div>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            return (
              <li key={Math.random()}>
                <h4>{transaction.description}</h4>
                <p>
                  ${transaction.transactionAmount} ·
                  <label
                    style={{
                      color:
                        transaction.transactionType === "expense"
                          ? "red"
                          : "green",
                    }}
                  >
                    {transaction.transactionType}
                  </label>
                  <button onClick={handleDeleteDoc}>Delete</button>
                </p>
              </li>
            );
          })}
        </ul>
        <button onClick={userSignOut}>Sign Out</button>
      </div>
    </>
  );
};
