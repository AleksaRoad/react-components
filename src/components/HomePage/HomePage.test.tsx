import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';

import { MOCK_CHARACTERS_DATA } from '@/__mocks__';
import { CharacterInfoSidebar, CharacterPage } from '@/components';

import { HomePage } from './HomePage';

describe('HomePage', () => {
  describe('CharacterCard', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should trigger additional API call to fetch detailed information when user clicks on the Card', async () => {
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

    describe('CharacterInfoSidebar', () => {
      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should display a loading indicator while fetching data', async () => {
        render(
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
            </Routes>
          </MemoryRouter>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });

    it('should correctly display the detailed card data', async () => {
      render(
        <MemoryRouter>
          <CharacterInfoSidebar character={MOCK_CHARACTERS_DATA[3]} />
        </MemoryRouter>
      );

      const expectedTexts = [/Beth Smith/i, /female/i, /alive/i];

      for (const text of expectedTexts) {
        const element = await screen.findByText(text);
        expect(element).toBeInTheDocument();
      }
    });

    it('should hide the component when clicking the close button', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');

      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <CharacterInfoSidebar character={MOCK_CHARACTERS_DATA[3]} />
        </MemoryRouter>
      );

      const closeButton = await screen.findByRole('button', {
        name: /close/i,
      });

      expect(closeButton).toBeInTheDocument();

      await user.click(closeButton);

      await waitFor(() => {
        expect(fetchSpy).not.toHaveBeenCalled();
      });
    });
  });
});
