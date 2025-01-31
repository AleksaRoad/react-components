import type { RickAndMortyCharacter } from '@/shared/types';

export interface AppState {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface CustomError extends Error {
  status?: number;
}
