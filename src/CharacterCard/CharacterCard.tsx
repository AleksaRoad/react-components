import { memo } from 'react';
import styles from './CharacterCard.module.css';
import type { CharacterCardProps } from './types.ts';

const CharacterCardComponent = ({ character }: CharacterCardProps) => {
  return (
    <div className={styles.item}>
      <h1 className={styles.name}>{character.name}</h1>
      <img
        className={styles.characterImage}
        src={character.image}
        alt={character.name}
      />
      <ul className={styles.description}>
        <li className={styles.info}>
          <span>Species: </span>
          <span>{character.species}</span>
        </li>
        <li className={styles.info}>
          <span>Gender: </span>
          <span>{character.gender}</span>
        </li>
        <li className={styles.info}>
          <span>Status: </span>
          <span>{character.status}</span>
        </li>
        <li className={styles.info}>
          <span>Type: </span>
          <span>{character.type || 'N/A'}</span>
        </li>
        <li className={styles.info}>
          <span>Origin: </span>
          <span>{character.origin}</span>
        </li>
        <li className={styles.info}>
          <span>Location: </span>
          <span>{character.location}</span>
        </li>
      </ul>
    </div>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
