import { SearchForm } from '@/components';
import type { FC } from 'react';
import { ERROR_MESSAGES } from '@/shared';
import { ErrorDisplay } from '@/components';

type HeaderProps = {
  apiErrorMessage: string | null;
  onSearch: (searchQuery: string) => void;
};

export const Header: FC<HeaderProps> = ({ apiErrorMessage, onSearch }) => {
  return (
    <header className="my-8 flex flex-col content-center items-center gap-8 md:flex-col">
      <SearchForm onSearch={onSearch} />
      {apiErrorMessage && (
        <ErrorDisplay
          errorMessage={ERROR_MESSAGES.OOOPS}
          apiErrorMessage={apiErrorMessage}
        />
      )}
    </header>
  );
};
