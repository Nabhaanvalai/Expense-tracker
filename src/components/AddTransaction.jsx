import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const categories = [
  'Food', 'Transportation', 'Entertainment', 'Shopping', 
  'Utilities', 'Housing', 'Healthcare', 'Education', 'Salary', 'Gift', 'Other'
];

const AddTransaction = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [transactionType, setTransactionType] = useState('expense');
  
  const { addTransaction } = useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !amount) {
      alert('Please fill in all fields');
      return;
    }
    
    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount: transactionType === 'income' ? +amount : -amount,
      category,
      date: new Date().toISOString(),
    };
    
    addTransaction(newTransaction);
    
    // Reset form
    setTitle('');
    setAmount('');
    setCategory('Other');
    setTransactionType('expense');
  };

  return (
    <div className="add-transaction-container">
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            min="0.01"
            step="0.01"
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-control transaction-type">
          <label>Transaction Type</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === 'expense'}
                onChange={() => setTransactionType('expense')}
              />
              <label htmlFor="expense">Expense</label>
            </div>
            
            <div className="radio-option">
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === 'income'}
                onChange={() => setTransactionType('income')}
              />
              <label htmlFor="income">Income</label>
            </div>
          </div>
        </div>
        
        <button className="btn" type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction; 