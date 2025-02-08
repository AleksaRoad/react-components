import { CharacterCard } from '@/components/Main';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';
import type { MouseEvent, FC } from 'react';
import { useState } from 'react';
import { ErrorDisplay } from '@/components';
import { Outlet, useSearchParams } from 'react-router';

type MainProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  apiErrorMessage: string | null;
};

export const Main: FC<MainProps> = ({
  characters,
  searchQuery,
  apiErrorMessage,
}) => {
  const [, setSelectedCharacter] = useState<RickAndMortyCharacter | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectCharacter = (character: RickAndMortyCharacter) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('details', character.id.toString());
      return newParams;
    });
    setSelectedCharacter(character);
  };

  const handleUlClick = (event: MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('details');
        return newParams;
      });
    }
  };

  return characters.length > 0 ? (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <ul
        className="m-0 flex list-none flex-wrap items-center justify-center gap-5 px-0 py-10"
        onClick={handleUlClick}
      >
        {characters.map((character) => (
          <li key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => handleSelectCharacter(character)}
            />
          </li>
        ))}
      </ul>
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
