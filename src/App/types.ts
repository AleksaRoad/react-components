import type { RickAndMortyCharacter } from '@/services/api/types';

export interface AppState {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
}
