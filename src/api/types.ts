interface RickAndMortyInfo {
  count?: number;
  pages?: number;
  next?: string | null;
  prev?: string | null;
}

interface RickAndMortyLocation {
  name?: string;
  url?: string;
}

export interface RickAndMortyCharacter {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: RickAndMortyLocation;
  location?: RickAndMortyLocation;
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}

export interface RickAndMortyCharacterResponse {
  info: RickAndMortyInfo;
  results: RickAndMortyCharacter[];
}
