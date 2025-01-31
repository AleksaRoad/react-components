import type { RickAndMortyCharacter } from '@/api/types';

export interface AppState {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
}
