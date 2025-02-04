import { memo } from 'react';
import type { RickAndMortyCharacter } from '@/shared/types.ts';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
};

const CharacterCardComponent = ({ character }: CharacterCardProps) => {
  return (
    <div className="bg-blue-xs flex w-64 flex-col items-center justify-center gap-5 rounded-3xl p-5 text-black">
      <h1 className="m-0 max-w-full overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
        {character.name}
      </h1>
      <img
        className="size-30 rounded-full border-4 border-gray-200/70"
        src={character.image}
        alt={character.name}
      />
      {/*<ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
        <li className="flex w-full justify-between [&>*:first-child]:text-left [&>*:last-child]:text-right">
           <span>Species: </span>
          <span>{character.species}</span>
        </li>
        <li className="flex w-full justify-between [&>*:first-child]:text-left [&>*:last-child]:text-right">
          <span>Gender: </span>
          <span>{character.gender}</span>
        </li>
        <li className="flex w-full justify-between [&>*:first-child]:text-left [&>*:last-child]:text-right">
          <span>Status: </span>
          <span>{character.status}</span>
        </li>
        <li className="flex w-full justify-between [&>*:first-child]:text-left [&>*:last-child]:text-right">
          <span>Type: </span>
          <span>{character.type || 'N/A'}</span>
        </li>
        <li className="flex w-full justify-between [&>*:first-child]:text-left [&>*:last-child]:text-right">
          <span>Origin: </span>
          <span>{character.origin}</span>
        </li>
        <li className="flex w-full justify-between [&>*:first-child]:text-left [&>*:last-child]:text-right">
          <span>Location: </span>
          <span>{character.location}</span> 
        </li>
      </ul>
      */}
    </div>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
