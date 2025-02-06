import { BASE_URL, ENDPOINTS } from './constants';
import type { RickAndMortyCharacter } from '@/shared';
import { ERROR_MESSAGES, PAGE_SIZE } from '@/shared';

const fetchData = async <T>(
  url: string
): Promise<{ characters: T; headers: Headers }> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${ERROR_MESSAGES.HTTP_ERROR}${response.status}`);
  }
  const headers = response.headers;
  const characters: T = await response.json();
  return { characters, headers };
};

export const getCharacters = async (
  searchQuery: '',
  page: 1
): Promise<{ characters: RickAndMortyCharacter[]; headers: Headers }> => {
  const searchParams = new URLSearchParams([
    ['q', searchQuery],
    ['_page', page.toString()],
    ['_limit', PAGE_SIZE.toString()],
  ]);

  const url = `${BASE_URL.api}${ENDPOINTS.character}?${searchParams.toString()}`;

  return fetchData<RickAndMortyCharacter[]>(url);
};

export const getCharacterImageUrl = (id: number): string => {
  return `${BASE_URL.avatar}${ENDPOINTS.avatar}${id}.jpeg`;
};
