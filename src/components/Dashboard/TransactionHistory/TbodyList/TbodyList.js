/* import - node_modules */
import React from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './TbodyList.module.css';

/*
 * COMPONENT
 */
const TbodyList = ({ items }) => (
  <tbody>
    {items.map(item => (
      <tr
        key={item.id}
        className={
          item.type === 'deposit' ? styles.itemIncome : styles.itemExpenses
        }
      >
        <td>{item.type}</td>
        <td>{item.amount}$</td>
        <td>{item.date}</td>
      </tr>
    ))}
  </tbody>
);

TbodyList.propTypes = {
  items: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      type: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.string.isRequired,
    }),
  ).isRequired,
};

export default TbodyList;
