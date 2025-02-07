import { CharacterCard, CharacterInfoSidebar } from '@/components/Main';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';
import { useState, type FC } from 'react';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';

type MainProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  apiErrorMessage: string;
};

export const Main: FC<MainProps> = ({
  characters,
  searchQuery,
  apiErrorMessage,
}) => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<RickAndMortyCharacter | null>(null);

  const handleSelectCharacter = (character: RickAndMortyCharacter | null) => {
    setSelectedCharacter(character);
  };

  return characters.length > 0 ? (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-5 px-0 py-10">
        {characters.map((character: RickAndMortyCharacter) => (
          <li key={character.id}>
            <CharacterCard
              character={character}
              onClick={handleSelectCharacter}
            />
          </li>
        ))}
      </ul>
      {selectedCharacter && (
        <CharacterInfoSidebar character={selectedCharacter} />
      )}
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
