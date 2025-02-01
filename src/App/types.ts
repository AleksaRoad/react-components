import type { RickAndMortyCharacter } from '@/shared/types';

export interface AppState {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: boolean;
}
