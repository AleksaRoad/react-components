import { RickAndMortyCharacter } from "../api/rickAndMortyApi.types";

export interface AppProps {
  characters: RickAndMortyCharacter[];
}

export interface AppState {
  characters: RickAndMortyCharacter[];
}
