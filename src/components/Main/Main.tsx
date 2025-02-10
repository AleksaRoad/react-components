import { type FC, type MouseEvent, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import { type RickAndMortyCharacter } from '@/shared';

import { CharacterList } from './CharacterList';

type MainProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
};

export const Main: FC<MainProps> = ({ characters, searchQuery }) => {
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
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <CharacterList
        characters={characters}
        onSelectCharacter={handleSelectCharacter}
        onUIClick={handleUlClick}
        searchQuery={searchQuery}
      />
      {searchParams.get('details') && <Outlet />}
    </main>
  );
};
