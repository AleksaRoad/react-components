import { BASE_URL } from './constants';
import type { RickAndMortyCharacter } from './types';

export class RickAndMortyApi {
  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  }

  async fetchCharacters(): Promise<RickAndMortyCharacter[]> {
    return this.fetchData<RickAndMortyCharacter[]>(BASE_URL.api);
  }
}
