import styles from './Main.module.css';
import { CharacterCard } from '@/components/Main/CharacterCard';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';
import clsx from 'clsx';
import type { FC } from 'react';
import type { MainProps } from './types';

export const Main: FC<MainProps> = ({
  characters,
  searchQuery,
  apiErrorMessage,
}) => {
  const isResultsFound = characters.length > 0;
  return isResultsFound ? (
    <ul className={styles.list}>
      {characters.map((character: RickAndMortyCharacter) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  ) : (
    !apiErrorMessage && (
      <p className={clsx(styles.noResults)}>
        {ERROR_MESSAGES.NO_RESULTS_FOUND}
        <span className={styles.searchQuery}>{`'${searchQuery}'`}</span>
      </p>
    )
  );
};
