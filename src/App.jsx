import React, { useState } from "react";
import './App.css'

export default function App() {
  const [input, setInput] = useState(" ");
  const [amount, setAmount] = useState(" ");
  const [expense, setExpense] = useState([]);

  function addexpense() {
    if (!input || !amount) return;

    const newExpense = {
      id : expense.length+1,
      title : input,
      amount : amount
    };
    setExpense([...expense,newExpense])
    setInput('');
    setAmount('');
  }

  function deleteExpense(id) {
    setExpense(expense.filter((expense)=> expense.id !== id));
  }
  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          name="expense"
          id="expenses"
          placeholder="expenses"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <button onClick={addexpense}>Add Expense</button>
      </div>
      <ul className="expense-list">
        {
        expense.map((expense) => (
          <li key={expense.id}>
            <span>{expense.title}</span>
            <span>{expense.amount}</span>
            <button onClick={()=>deleteExpense(expense.id)}>Delete</button>
          </li>
        ))
      }
      </ul>
    </div>
  );
}
