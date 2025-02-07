import { BASE_URL, ENDPOINTS } from './constants';
import type { RickAndMortyCharacter } from '@/shared';
import { ERROR_MESSAGES, PAGE_SIZE } from '@/shared';

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${ERROR_MESSAGES.HTTP_ERROR}${response.status}`);
  }

  return response.json();
};

export const getCharacters = async (
  searchQuery = '',
  page = 1
): Promise<{ characters: RickAndMortyCharacter[]; count: number }> => {
  const searchParams = new URLSearchParams([
    ['q', searchQuery],
    ['_page', page.toString()],
    ['_limit', PAGE_SIZE.toString()],
  ]);

  const url = `${BASE_URL.api}${ENDPOINTS.character}?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${ERROR_MESSAGES.HTTP_ERROR}${response.status}`);
  }

  const count = Number(response.headers.get('X-Total-Count')) || 0;
  const characters: RickAndMortyCharacter[] = await response.json();

  return { characters, count };
};

export const getCharacterById = async (
  id: number
): Promise<RickAndMortyCharacter> => {
  const url = `${BASE_URL.api}${ENDPOINTS.character}/${id}`;
  return fetchData<RickAndMortyCharacter>(url);
};

export const getCharacterImageUrl = (id: number): string => {
  return `${BASE_URL.avatar}${ENDPOINTS.avatar}${id}.jpeg`;
};

export const fetchCharacters = async (
  searchQuery: string,
  page: number
): Promise<{
  charactersWithImages: RickAndMortyCharacter[];
  totalPages: number;
}> => {
  const { characters, count } = await getCharacters(searchQuery, page);
  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;
  const charactersWithImages = characters.map(addImagesToCharacters);

  return { charactersWithImages, totalPages };
};

const addImagesToCharacters = (character: RickAndMortyCharacter) => {
  if (character.image) return character;
  const imageUrl = getCharacterImageUrl(character.id);
  return { ...character, image: imageUrl };
};
