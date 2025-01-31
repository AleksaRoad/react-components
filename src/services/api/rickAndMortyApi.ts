import { BASE_URL, PAGE_SIZE } from './constants';
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

  async getCharacters(
    searchQuery: string = '',
    page: number = 1
  ): Promise<RickAndMortyCharacter[]> {
    let url = `${BASE_URL.api}/character`;
    if (searchQuery && searchQuery.trim() !== '') {
      url = `${url}?q=${searchQuery}&_page=${page}`;
    }
    return this.fetchData<RickAndMortyCharacter[]>(url);
  }

  async getTotalPages(): Promise<number> {
    const characters = await this.getCharacters();
    const totalCount = characters.length;
    return Math.ceil(totalCount / PAGE_SIZE);
  }

  async getCharacterById(id: number): Promise<string> {
    return `${BASE_URL.avatar}/character/avatar/${id}.jpeg`;
  }
}

export const rickAndMortyApi = new RickAndMortyApi();
