import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  transactions: [],
  balance: 0,
  income: 0,
  expenses: 0,
};

// Create context
const AppContext = createContext(initialState);

// Action types
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        balance: calculateBalance(state.transactions, action.payload),
        income: calculateIncome(state.transactions, action.payload),
        expenses: calculateExpenses(state.transactions, action.payload),
      };
    case DELETE_TRANSACTION:
      const updatedTransactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );
      return {
        ...state,
        transactions: updatedTransactions,
        balance: recalculateBalance(updatedTransactions),
        income: recalculateIncome(updatedTransactions),
        expenses: recalculateExpenses(updatedTransactions),
      };
    default:
      return state;
  }
};

// Helper functions for calculations
const calculateBalance = (transactions, newTransaction) => {
  const amount = parseFloat(newTransaction.amount);
  let balance = transactions.reduce((acc, transaction) => {
    return acc + parseFloat(transaction.amount);
  }, 0);
  return balance + amount;
};

const calculateIncome = (transactions, newTransaction) => {
  const amount = parseFloat(newTransaction.amount);
  let income = transactions.reduce((acc, transaction) => {
    return transaction.amount > 0 
      ? acc + parseFloat(transaction.amount) 
      : acc;
  }, 0);
  return amount > 0 ? income + amount : income;
};

const calculateExpenses = (transactions, newTransaction) => {
  const amount = parseFloat(newTransaction.amount);
  let expenses = transactions.reduce((acc, transaction) => {
    return transaction.amount < 0 
      ? acc + Math.abs(parseFloat(transaction.amount)) 
      : acc;
  }, 0);
  return amount < 0 ? expenses + Math.abs(amount) : expenses;
};

const recalculateBalance = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    return acc + parseFloat(transaction.amount);
  }, 0);
};

const recalculateIncome = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    return transaction.amount > 0 
      ? acc + parseFloat(transaction.amount) 
      : acc;
  }, 0);
};

const recalculateExpenses = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    return transaction.amount < 0 
      ? acc + Math.abs(parseFloat(transaction.amount)) 
      : acc;
  }, 0);
};

// Provider component
export const AppProvider = ({ children }) => {
  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions);
        return {
          transactions: parsedTransactions,
          balance: recalculateBalance(parsedTransactions),
          income: recalculateIncome(parsedTransactions),
          expenses: recalculateExpenses(parsedTransactions),
        };
      }
      return initialState;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(appReducer, loadFromLocalStorage());

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Action creators
  const addTransaction = (transaction) => {
    dispatch({
      type: ADD_TRANSACTION,
      payload: transaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id,
    });
  };

  return (
    <AppContext.Provider
      value={{
        transactions: state.transactions,
        balance: state.balance,
        income: state.income,
        expenses: state.expenses,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext); 