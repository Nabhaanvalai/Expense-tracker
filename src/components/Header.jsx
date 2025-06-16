import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { balance, income, expenses } = useAppContext();

  return (
    <div className="header">
      <h1>Expense Tracker</h1>
      
      <div className="balance-container">
        <h2>Your Balance</h2>
        <h3 className={balance >= 0 ? 'money-plus' : 'money-minus'}>
          ${balance.toFixed(2)}
        </h3>
      </div>
      
      <div className="income-expense-container">
        <div>
          <h4>Income</h4>
          <p className="money-plus">${income.toFixed(2)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money-minus">${expenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Header; 