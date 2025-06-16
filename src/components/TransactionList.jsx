import React from 'react';
import { useAppContext } from '../context/AppContext';
import TransactionItem from './TransactionItem';

const TransactionList = () => {
  const { transactions } = useAppContext();

  return (
    <div className="transaction-list-container">
      <h3>History</h3>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions yet</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList; 