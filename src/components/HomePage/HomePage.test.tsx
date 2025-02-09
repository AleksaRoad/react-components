import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';

import { CharacterPage } from '@/components';

import { HomePage } from './HomePage';

describe('HomePage', () => {
  describe('CharacterCard', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it.only('should trigger additional API call to fetch detailed information when user clicks on the Card', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');

      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<CharacterPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      );

      const firstCard = await screen.findByRole('button', {
        name: /Morty Smith/i,
      });

      expect(firstCard).toBeInTheDocument();

      expect(fetchSpy).toHaveBeenCalledOnce();

      await user.click(firstCard);

      await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalledWith(
          'https://rickandmortyapi-sigma.vercel.app/api/character/2'
        );
      });
    });
  });
});
