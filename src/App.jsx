import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';

const App = () => {
  return (
    <AppProvider>
      <div className="container">
        <Header />
        <div className="main-content">
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
























