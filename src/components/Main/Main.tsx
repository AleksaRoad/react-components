import type { FC } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import { type RickAndMortyCharacter } from '@/shared';

import { CharacterList } from './CharacterList';

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
  return (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <CharacterList
        apiErrorMessage={apiErrorMessage}
        searchQuery={searchQuery}
        characters={characters}
      />
      {searchParams.get('details') && <Outlet />}
    </main>
  );
};
