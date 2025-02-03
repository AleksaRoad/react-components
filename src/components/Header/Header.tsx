import styles from './Header.module.css';
import { SearchForm } from '@/components/Header/SearchForm';
import type { FC } from 'react';
import type { HeaderProps } from './types';
import { ERROR_MESSAGES } from '@/shared';

export const Header: FC<HeaderProps> = ({ onSearch, apiErrorMessage }) => {
  return (
    <div className={styles.header}>
      <SearchForm onSearch={onSearch} />
      {apiErrorMessage && (
        <div className={styles.apiErrorMessage}>
          {`${ERROR_MESSAGES.OOOPS} ${apiErrorMessage}`}
        </div>
      )}
    </div>
  );
};
