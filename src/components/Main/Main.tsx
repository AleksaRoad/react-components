import type { FC } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import { ErrorDisplay } from '@/components';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';

import { CharacterList } from './CharacterList/CharacterList';

type MainProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  apiErrorMessage: string | null;
};

export const Main: FC<MainProps> = ({
  apiErrorMessage,
  characters,
  searchQuery,
}) => {
  const [searchParams] = useSearchParams();
  return characters.length > 0 ? (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <CharacterList characters={characters} />
      {searchParams.get('details') && <Outlet />}
    </main>
  ) : (
    !apiErrorMessage && (
      <ErrorDisplay
        errorMessage={ERROR_MESSAGES.NO_RESULTS_FOUND}
        searchQuery={searchQuery}
      />
    )
  );
};
