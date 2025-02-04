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
    <ul className="max-xs:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] m-0 grid list-none grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] justify-items-center gap-5 px-0 py-10">
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
