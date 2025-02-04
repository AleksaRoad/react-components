import { PAGE_SIZE } from '@/shared';
import type { RickAndMortyCharacter } from '@/shared';
import { getCharacters, getCharacterImageUrl } from './api';

const getCharactersWithImage = {
  async fetchCharacters(searchQuery: string, page: number) {
    const { characters, headers } = await getCharacters(searchQuery, page);
    const totalPages = headers.get('X-Total-Count')
      ? Math.ceil(Number(headers.get('X-Total-Count')) / PAGE_SIZE)
      : 1;
    const charactersWithImages = characters.map(
      rickAndMortyService.addImagesToCharacters
    );

    return { charactersWithImages, totalPages };
  },

  addImagesToCharacters(character: RickAndMortyCharacter) {
    if (character.image) return character;
    const imageUrl = getCharacterImageUrl(character.id || 0);
    return { ...character, image: imageUrl };
  },
};

export const rickAndMortyService = {
  ...getCharactersWithImage,
};
