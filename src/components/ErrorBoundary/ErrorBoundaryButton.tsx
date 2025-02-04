import { Component } from 'react';
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
      <button
        className="bg-blue-md cursor-pointer rounded-xl border-none px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
        onClick={this.handleClick}
      >
        Trigger Error
      </button>
    );
  }
}
