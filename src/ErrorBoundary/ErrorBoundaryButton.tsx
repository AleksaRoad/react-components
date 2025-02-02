import { Component } from 'react';
import styles from './ErrorBoundary.module.css';
import type { ButtonState } from './types';

export class ErrorBoundaryButton extends Component<unknown, ButtonState> {
  state = {
    isError: false,
  };

  handleClick = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error();
    }
    return (
      <button className={styles.button} onClick={this.handleClick}>
        Trigger Error
      </button>
    );
  }
}
