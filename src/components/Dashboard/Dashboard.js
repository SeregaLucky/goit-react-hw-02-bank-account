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
/* import - other */
import { saveLocalStorage, getLocalStorage } from '../../servises/localStorage';

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

  componentDidMount() {
    const transactions = getLocalStorage('transactions');

    if (!transactions) return;

    this.setState({ transactions });
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;

    if (prevState.transactions === transactions) return;

    saveLocalStorage('transactions', transactions);
  }

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

  findIncomeExpenses = transactions => {
    return transactions.reduce(
      (acc, transaction) => {
        return {
          ...acc,
          [transaction.type]: acc[transaction.type] + transaction.amount,
        };
      },
      { deposit: 0, withdraw: 0 },
    );
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

    const objIncomeExpenses = this.findIncomeExpenses(transactions);

    if (objIncomeExpenses.deposit < objIncomeExpenses.withdraw + amount) {
      this.notifyLimitIsExceeded();
      return;
    }

    this.makeSetStateForTransactions(amount, 'withdraw');
  };

  render() {
    const { transactions } = this.state;

    const objIncomeExpenses = this.findIncomeExpenses(transactions);

    const { deposit, withdraw } = objIncomeExpenses;
    const balance = deposit - withdraw;

    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
        />
        <Balance balance={balance} income={deposit} expenses={withdraw} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
