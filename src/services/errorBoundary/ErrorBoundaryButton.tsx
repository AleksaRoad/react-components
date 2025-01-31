import type { FC } from 'react';
import styles from './ErrorBoundaryButton.module.css';
import type { ErrorBoundaryButtonProps } from './types';

export const ErrorBoundaryButton: FC<ErrorBoundaryButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
