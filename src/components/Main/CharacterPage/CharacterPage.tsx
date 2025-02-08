import { getCharacterById } from '@/services';
import type { RickAndMortyCharacter } from '@/shared';
import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { CharacterInfoSidebar } from './CharacterInfoSidebar';
import { Spinner } from '@/components';
import { ErrorDisplay } from '@/components';
import { getCharacterImageUrl } from '@/services';

export const CharacterPage: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get('details');

  const [character, setCharacter] = useState<RickAndMortyCharacter | null>(
    null
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (characterId: number) => {
    try {
      setLoading(true);
      const characterData = await getCharacterById(characterId);
      if (!characterData.image) {
        characterData.image = getCharacterImageUrl(characterId);
      }
      setCharacter(characterData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `${error}`;
      setError(errorMessage);
      setCharacter(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (characterId) {
      loadData(Number(characterId));
    }
  }, [characterId, loadData]);

  return (
    <>
      {isLoading && (
        <div className="flex min-w-72 items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && <ErrorDisplay errorMessage={error} />}
      {!isLoading && !error && character && (
        <CharacterInfoSidebar character={character} />
      )}
    </>
  );
};
