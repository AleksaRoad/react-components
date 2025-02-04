import { SearchForm } from '@/components/Header/SearchForm';
import type { FC } from 'react';
import { ERROR_MESSAGES } from '@/shared';

export type HeaderProps = {
  apiErrorMessage: string;
  onSearch: (searchQuery: string) => void;
};

export const Header: FC<HeaderProps> = ({ onSearch, apiErrorMessage }) => {
  return (
    <header className="my-8 flex flex-col content-center items-center gap-8 md:flex-col">
      <SearchForm onSearch={onSearch} />
      {apiErrorMessage && (
        <div className="text-red-xl bg-blue-xs flex w-80 flex-col items-center gap-5 rounded-3xl p-5 text-2xl md:w-72">
          <p>{ERROR_MESSAGES.OOOPS}</p>
          <p>{apiErrorMessage}</p>
        </div>
      )}
    </header>
  );
};
