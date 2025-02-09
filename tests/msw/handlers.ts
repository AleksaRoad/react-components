import { http, HttpResponse } from 'msw';

import { MOCK_CHARACTERS_DATA } from '../../src/__mocks__/mockCharacterData';

export const handlers = [
  http.get('https://rickandmortyapi-sigma.vercel.app/api/character', () => {
    return HttpResponse.json(MOCK_CHARACTERS_DATA);
  }),

  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    let id = 1;

    if (Array.isArray(params.id)) {
      id = +params.id[0];
    } else if (params.id) {
      id = +params.id;
    }

    return HttpResponse.json(MOCK_CHARACTERS_DATA[id - 1]);
  }),

  http.get('https://rickandmortyapi.com/api/*', () => {
    return new HttpResponse('');
  }),
];
