/* import - node_modules */
import React, { Component } from 'react';
import T from 'prop-types';
/* import - CSS */
import styles from './Controls.module.css';

/*
 * COMPONENT
 */
class Controls extends Component {
  static propTypes = {
    onDeposit: T.func.isRequired,
    onWithdraw: T.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleChangeValue = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { onDeposit, onWithdraw } = this.props;
    const { inputValue } = this.state;

    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          name="amount"
          placeholder="Amount..."
          value={inputValue}
          onChange={this.handleChangeValue}
          min="0"
        />

        <button
          className={styles.button}
          type="button"
          onClick={() => {
            onDeposit(Number(inputValue));
            this.setState({ inputValue: '' });
          }}
        >
          Deposit
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            onWithdraw(Number(inputValue));
            this.setState({ inputValue: '' });
          }}
        >
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
