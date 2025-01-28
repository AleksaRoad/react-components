import { memo } from 'react';
import styles from './CharacterItem.module.css';
import type { CharacterItemProps } from './types.ts';

const CharacterItemComponent = ({ character }: CharacterItemProps) => {
  return (
    <li className={styles.item}>
      <span>{character.name}</span>
      <div className={styles.description}>
        <span>
          Species: {character.species} - Gender: {character.gender}
        </span>
        <img
          className={styles.characterImage}
          src={character.image}
          alt={character.name}
        />
      </div>
    </li>
  );
};

CharacterItemComponent.displayName = 'CharacterItem';

export const CharacterItem = memo(CharacterItemComponent);
