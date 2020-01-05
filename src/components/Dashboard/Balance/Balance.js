/* import - node_modules */
import React from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './Balance.module.css';

/*
 * COMPONENT
 */
const Balance = ({ balance, income, expenses }) => (
  <section className={styles.balance}>
    <span className={styles.textIncome}>{income}$</span>
    <span className={styles.textExpenses}>{expenses}$</span>

    <span className={styles.text}>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: T.number.isRequired,
  income: T.number.isRequired,
  expenses: T.number.isRequired,
};

export default Balance;
