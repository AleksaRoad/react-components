import { type ReactNode } from 'react';

export type ErrorBoundaryButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
