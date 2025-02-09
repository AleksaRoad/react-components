import type { FC, MouseEvent } from 'react';

import { ErrorDisplay } from '@/components';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';

import { CharacterCard } from '../CharacterCard';

type CharacterListProps = {
  characters: RickAndMortyCharacter[];
  onSelectCharacter: (character: RickAndMortyCharacter) => void;
  onUIClick: (event: MouseEvent<HTMLUListElement>) => void;
  searchQuery: string;
};

export const CharacterList: FC<CharacterListProps> = ({
  characters,
  onSelectCharacter,
  onUIClick,
  searchQuery,
}) => {
  const handleSelectCharacter = (character: RickAndMortyCharacter) => {
    onSelectCharacter(character);
  };

  const handleUlClick = (event: MouseEvent<HTMLUListElement>) => {
    onUIClick(event);
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
    <ErrorDisplay
      errorMessage={ERROR_MESSAGES.NO_RESULTS_FOUND}
      searchQuery={searchQuery}
    />
  );
};
