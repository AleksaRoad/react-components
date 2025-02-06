import { CharacterCard, CharacterInfoSidebar } from '@/components/Main';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';
import { useState, type FC } from 'react';

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

  const handleClickCard = (character: RickAndMortyCharacter | null) => {
    setSelectedCharacter(character);
  };

  return characters.length > 0 ? (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-5 px-0 py-10">
        {characters.map((character: RickAndMortyCharacter) => (
          <li key={character.id}>
            <CharacterCard character={character} onClick={handleClickCard} />
          </li>
        ))}
      </ul>
      {selectedCharacter && (
        <CharacterInfoSidebar character={selectedCharacter} />
      )}
    </main>
  ) : (
    !apiErrorMessage && (
      <p className="py-10 text-center text-2xl">
        {ERROR_MESSAGES.NO_RESULTS_FOUND}
        <span className="text-red-md text-4xl">{`'${searchQuery}'`}</span>
      </p>
    )
  );
};
