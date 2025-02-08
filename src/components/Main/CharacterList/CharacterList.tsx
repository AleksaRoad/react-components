import type { FC } from 'react';
import { type MouseEvent, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import type { RickAndMortyCharacter } from '@/shared';

import { CharacterCard } from '../CharacterCard';

type CharacterListProps = {
  characters: RickAndMortyCharacter[];
};

export const CharacterList: FC<CharacterListProps> = ({ characters }) => {
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

  return (
    <>
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
    </>
  );
};
