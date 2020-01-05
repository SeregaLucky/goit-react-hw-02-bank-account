/* import - node_modules */
import React from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './TransactionHistory.module.css';
/* import - COMPONENT */
import TbodyList from './TbodyList/TbodyList';

/*
 * COMPONENT
 */
const TransactionHistory = ({ items }) => (
  <table className={styles.historyTable}>
    <thead className={styles.theadHeader}>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>

    <TbodyList items={items} />
  </table>
);

TransactionHistory.propTypes = {
  items: T.arrayOf(T.shape).isRequired,
};

export default TransactionHistory;
