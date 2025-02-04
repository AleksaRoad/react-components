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
    </div>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
