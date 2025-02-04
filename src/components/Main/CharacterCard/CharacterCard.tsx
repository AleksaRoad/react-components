import { memo } from 'react';
import type { RickAndMortyCharacter } from '@/shared/types.ts';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
  onClick: (character: RickAndMortyCharacter | null) => void;
};

const CharacterCardComponent = ({ character, onClick }: CharacterCardProps) => {
  return (
    <div
      className="bg-blue-xs flex w-64 cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl p-5 text-black transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 md:hover:scale-105 md:active:scale-100"
      onClick={() => onClick(character)}
    >
      <h1 className="m-0 max-w-full overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
        {character.name}
      </h1>
      <img
        className="size-30 rounded-full border-4 border-gray-200/70"
        src={character.image}
        alt={character.name}
      />
    </div>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
