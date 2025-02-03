import { BASE_URL, ENDPOINTS } from './constants';
import type { RickAndMortyCharacter } from '@/shared';
import { ERROR_MESSAGES, PAGE_SIZE } from '@/shared';

class RickAndMortyApi {
  private async fetchData<T>(
    url: string
  ): Promise<{ characters: T; headers: Headers }> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.HTTP_ERROR}${response.status}`);
    }
    const headers = response.headers;
    const characters: T = await response.json();

    return { characters, headers };
  }

  async getCharacters(
    searchQuery: string = '',
    page: number = 1
  ): Promise<{ characters: RickAndMortyCharacter[]; headers: Headers }> {
    let url = `${BASE_URL.api}/${ENDPOINTS.character}`;
    if (searchQuery && searchQuery.trim() !== '') {
      url = `${url}?${ENDPOINTS.query}=${searchQuery}&${ENDPOINTS._page}=${page}&${ENDPOINTS._limit}=${PAGE_SIZE}`;
    }

    return this.fetchData<RickAndMortyCharacter[]>(url);
  }

  getCharacterImageUrl(id: number): string {
    return `${BASE_URL.avatar}/${ENDPOINTS.character}/${ENDPOINTS.avatar}/${id}.jpeg`;
  }
}

export const rickAndMortyApi = new RickAndMortyApi();
