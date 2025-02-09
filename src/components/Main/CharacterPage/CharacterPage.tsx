import type { FC } from 'react';
import { useLocation } from 'react-router';

import { ErrorDisplay, Spinner } from '@/components';
import { getCharacterById } from '@/services';
import { useLoadData } from '@/shared';

import { CharacterInfoSidebar } from './CharacterInfoSidebar';

export const CharacterPage: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get('details');

  const {
    data: character,
    error,
    isLoading,
  } = useLoadData(getCharacterById, Number(characterId));

  return (
    <>
      {isLoading && (
        <div className="flex min-w-72 items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && <ErrorDisplay errorMessage={error} />}
      {!isLoading && !error && character && (
        <CharacterInfoSidebar character={character} />
      )}
    </>
  );
};
