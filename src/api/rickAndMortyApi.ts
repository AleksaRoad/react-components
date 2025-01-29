import { BASE_URL } from './constants';
import type { RickAndMortyCharacter } from './types';

export class RickAndMortyApi {
  private static instance: RickAndMortyApi;

  public static getInstance(): RickAndMortyApi {
    if (!RickAndMortyApi.instance) {
      RickAndMortyApi.instance = new RickAndMortyApi();
    }
    return RickAndMortyApi.instance;
  }

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

  async getAllCharacters(): Promise<RickAndMortyCharacter[]> {
    const url = `${BASE_URL.api}/character`;
    return this.fetchData<RickAndMortyCharacter[]>(url);
  }

  async getCharacterById(id: number): Promise<string> {
    const url = `${BASE_URL.avatar}/character/avatar/${id}.jpeg`;
    return url;
  }
}
