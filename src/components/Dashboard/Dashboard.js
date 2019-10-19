/* import - node_modules */
import React, { Component } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';
/* import - COMPONENT */
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

toast.configure();
/*
 * COMPONENT
 */
const OPTION = {
  year: 'numeric',
  day: 'numeric',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

class Dashboard extends Component {
  state = {
    transactions: [],
  };

  notifyIfZero = () => {
    toast.info('Введите сумму для проведения операции!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  notifyLimitIsExceeded = () => {
    toast.warn('На счету недостаточно средств для проведения операции!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  notifyNegativeNumbers = () => {
    toast.warn('Отрицательные числа не принимают!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  makeSetStateForTransactions = (amount, typeNeed) => {
    const date = new Date();

    const obj = {
      id: shortid.generate(),
      type: typeNeed,
      amount,
      date: date.toLocaleString('en-US', OPTION),
    };

    this.setState(prevState => ({
      transactions: [...prevState.transactions, obj],
    }));
  };

  handleDeposit = amount => {
    if (!amount) {
      this.notifyIfZero();
      return;
    }
    if (amount < 0) {
      this.notifyNegativeNumbers();
      return;
    }

    this.makeSetStateForTransactions(amount, 'deposit');
  };

  handleWithdraw = amount => {
    if (!amount) {
      this.notifyIfZero();
      return;
    }
    if (amount < 0) {
      this.notifyNegativeNumbers();
      return;
    }

    const { transactions } = this.state;

    const income = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);

    const expenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'withdraw') {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);

    if (income < expenses + amount) {
      this.notifyLimitIsExceeded();
      return;
    }

    this.makeSetStateForTransactions(amount, 'withdraw');
  };

  render() {
    const { transactions } = this.state;

    const income = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);

    const expenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'withdraw') {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);

    const balance = income - expenses;

    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
