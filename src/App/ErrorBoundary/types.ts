import { type ReactNode } from 'react';

export type ErrorBoundaryButtonProps = {
  onClick: () => void;
  children?: ReactNode;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
