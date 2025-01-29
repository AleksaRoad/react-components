import { memo } from 'react';
import styles from './CharacterItem.module.css';
import type { CharacterItemProps } from './types.ts';
import { BASE_URL } from '@/api/constants.ts';

const CharacterItemComponent = ({ character }: CharacterItemProps) => {
  console.log(`${BASE_URL}/avatar/${character.id}.jpeg`);
  return (
    <li className={styles.item}>
      <span>{character.name}</span>
      <div className={styles.description}>
        <span>
          Species: {character.species} - Gender: {character.gender}
        </span>
        <img
          className={styles.characterImage}
          src={`${BASE_URL.avatar}${character.id}.jpeg`}
          alt={character.name}
        />
      </div>
    </li>
  );
};

CharacterItemComponent.displayName = 'CharacterItem';

export const CharacterItem = memo(CharacterItemComponent);
