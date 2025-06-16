import React from 'react';
import { useAppContext } from '../context/AppContext';

const TransactionItem = ({ transaction }) => {
  const { deleteTransaction } = useAppContext();
  const sign = transaction.amount < 0 ? '-' : '+';
  const amountClass = transaction.amount < 0 ? 'money-minus' : 'money-plus';

  return (
    <li className={`transaction-item ${amountClass}`}>
      <div className="transaction-details">
        <span className="transaction-title">{transaction.title}</span>
        <span className="transaction-category">{transaction.category}</span>
      </div>
      <div className="transaction-amount">
        <span>{sign}${Math.abs(transaction.amount).toFixed(2)}</span>
        <button 
          onClick={() => deleteTransaction(transaction.id)} 
          className="delete-btn"
        >
          ×
        </button>
      </div>
    </li>
  );
};

export default TransactionItem; 