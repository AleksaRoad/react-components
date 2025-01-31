import { PAGE_SIZE, ERROR_MESSAGES } from '@/shared/constants';
import type { RickAndMortyCharacter } from '@/shared/types';
import { rickAndMortyApi } from './api/rickAndMortyApi';

const getCharacters = {
  async fetchCharacters(searchQuery: string, page: number) {
    try {
      const { characters, headers } = await rickAndMortyApi.getCharacters(
        searchQuery,
        page
      );
      const totalPages = headers.get('X-Total-Count')
        ? Math.ceil(Number(headers.get('X-Total-Count')) / PAGE_SIZE)
        : 1;

      const charactersWithImages = characters.map(
        rickAndMortyService.addImagesToCharacters
      );

      return { charactersWithImages, totalPages };
    } catch (error) {
      console.error(ERROR_MESSAGES.FAILED_TO_FETCH_DATA, error);
      throw error;
    }
  },

  addImagesToCharacters(character: RickAndMortyCharacter) {
    if (character.image) return character;
    const imageUrl = rickAndMortyApi.getCharacterImageUrl(character.id || 0);
    return { ...character, image: imageUrl };
  },
};

export const rickAndMortyService = {
  ...getCharacters,
};
