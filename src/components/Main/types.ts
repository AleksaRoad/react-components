import type { RickAndMortyCharacter } from '@/shared';

export interface MainProps {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  apiErrorMessage: string;
}
