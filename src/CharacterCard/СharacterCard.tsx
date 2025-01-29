import { memo } from 'react';
import styles from './CharacterCard.module.css';
import type { CharacterCardProps } from './types.ts';

const CharacterCard = ({ character, image }: CharacterCardProps) => {
  return (
    <div className={styles.item}>
      <span>{character.name}</span>
      <div className={styles.description}>
        <span>
          Species: {character.species} - Gender: {character.gender}
        </span>
        <img
          className={styles.characterImage}
          src={image}
          alt={character.name}
        />
      </div>
    </div>
  );
};

CharacterCard.displayName = 'CharacterCard';

export const CharacterCardComponent = memo(CharacterCard);
