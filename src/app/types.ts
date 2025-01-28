import { RickAndMortyCharacter } from '@/api/types';

export interface AppProps {
  characters: RickAndMortyCharacter[];
}

export interface AppState {
  characters: RickAndMortyCharacter[];
}
