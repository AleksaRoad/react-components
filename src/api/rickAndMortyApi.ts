import { BASE_URL } from './constants';
import type { RickAndMortyCharacter } from './types';

class RickAndMortyApi {
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
  public getFromLocalStorage(key: string): string | null {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue === null || cachedValue.trim() === '') {
      return null;
    }
    return JSON.parse(cachedValue);
  }

  public saveToLocalStorage(key: string, cachedValue: string): void {
    localStorage.setItem(key, JSON.stringify(cachedValue));
  }

  async getCharacters(
    searchQuery: string = ''
  ): Promise<RickAndMortyCharacter[]> {
    let url = `${BASE_URL.api}/character`;
    if (searchQuery && searchQuery.trim() !== '') {
      url = `${url}?q=${searchQuery}`;
    }
    return this.fetchData<RickAndMortyCharacter[]>(url);
  }

  async getCharacterById(id: number): Promise<string> {
    return `${BASE_URL.avatar}/character/avatar/${id}.jpeg`;
  }
}

export const rickAndMortyApi = new RickAndMortyApi();
