import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import type { RickAndMortyCharacter } from '@/shared';
import { CACHE_KEY } from '@/shared';
import { useStorage } from '@/services';
import { fetchCharacters } from '@/services/';
import { Header } from '@/components';
import { Footer } from '@/components';
import { Main } from '@/components';
import { Spinner } from '@/components';
import { useMainPageParams } from './useMainPageParams';
import { useSearchParams } from 'react-router';

export const App: FC = () => {
  const [characters, setCharacters] = useState<RickAndMortyCharacter[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [, setSearchParams] = useSearchParams();
  const { currentPage } = useMainPageParams();

  const { load: loadSearchQuery, save: saveSearchQuery } = useStorage(
    CACHE_KEY.searchQuery
  );

  const loadData = useCallback(async (query: string, page = 1) => {
    setLoading(true);
    try {
      const { charactersWithImages, totalPages } = await fetchCharacters(
        query,
        page
      );
      setCharacters(charactersWithImages);
      setTotalPages(totalPages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `${error}`;
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialSearchQuery = loadSearchQuery() || '';
    loadData(initialSearchQuery, currentPage);
  }, [loadSearchQuery, loadData, currentPage]);

  const handleSearch = (newSearchQuery: string) => {
    saveSearchQuery(newSearchQuery);
    setSearchParams({ page: '1' });
    setLoading(true);
    loadData(newSearchQuery);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    setLoading(true);
    loadData(loadSearchQuery() ?? '', page);
  };

  const isPaginationVisible = characters.length > 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center p-5">
      <h1 className="font-ramFont p-6 text-center text-5xl text-white">
        Rick and Morty Characters
      </h1>
      <Header onSearch={handleSearch} apiErrorMessage={apiErrorMessage} />
      {loading ? (
        <div className="flex flex-grow items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Main
          characters={characters}
          searchQuery={loadSearchQuery() ?? ''}
          apiErrorMessage={apiErrorMessage}
        />
      )}
      <Footer
        showPagination={isPaginationVisible}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
      />
    </div>
  );
};
