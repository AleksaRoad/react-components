import { CharacterCard } from '@/components/Main';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';
import type { FC } from 'react';

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
  const isResultsFound = characters.length > 0;
  return isResultsFound ? (
    <ul className="m-0 flex w-full flex-grow list-none flex-wrap items-center justify-center gap-5 px-0 py-10">
      {characters.map((character: RickAndMortyCharacter) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  ) : (
    !apiErrorMessage && (
      <p className="py-10 text-center text-2xl">
        {ERROR_MESSAGES.NO_RESULTS_FOUND}
        <span className="text-red-md text-4xl">{`'${searchQuery}'`}</span>
      </p>
    )
  );
};
