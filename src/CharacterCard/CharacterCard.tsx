import { memo } from 'react';
import styles from './CharacterCard.module.css';
import type { CharacterCardProps } from './types.ts';

const CharacterCardComponent = ({ character }: CharacterCardProps) => {
  return (
    <div className={styles.item}>
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
    </div>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
