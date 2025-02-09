import type { FC } from 'react';
import { type MouseEvent, useState } from 'react';
import { useSearchParams } from 'react-router';

import { ErrorDisplay } from '@/components';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';

import { CharacterCard } from '../CharacterCard';

type CharacterListProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  apiErrorMessage: string | null;
};

export const CharacterList: FC<CharacterListProps> = ({
  apiErrorMessage,
  characters,
  searchQuery,
}) => {
  const [, setSelectedCharacter] = useState<RickAndMortyCharacter | null>(null);
  const [, setSearchParams] = useSearchParams();

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
  ) : (
    !apiErrorMessage && (
      <ErrorDisplay
        errorMessage={ERROR_MESSAGES.NO_RESULTS_FOUND}
        searchQuery={searchQuery}
      />
    )
  );
};
