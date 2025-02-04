import { Component } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import type { ErrorInfo } from 'react-dom/client';
import { ERROR_MESSAGES } from '@/shared';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(ERROR_MESSAGES.ERROR_BOUNDARY_CAUGHT, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-xl bg-red-xs p-5 text-center">
          <h1>{ERROR_MESSAGES.OOOPS}</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
