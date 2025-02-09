import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router';

import { MOCK_CHARACTERS_DATA } from '@/__mocks__';
import {
  CharacterInfoSidebar,
  CharacterPage,
  PaginationControl,
} from '@/components';

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

    describe('PaginationControl', () => {
      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should display the correct number of pages', async () => {
        render(
          <PaginationControl
            currentPage={1}
            onNextPage={vi.fn()}
            onPreviousPage={vi.fn()}
            totalPages={5}
          />
        );
        const pagination = screen.getByText(/Page 1 of 5/i);

        expect(pagination).toBeInTheDocument();
      });

      it('should update the URL query parameter when the page changes', async () => {
        const user = userEvent.setup();

        const router = createMemoryRouter(
          [
            {
              element: <HomePage />,
              path: '/',
            },
          ],
          { initialEntries: ['/?page=2'] }
        );

        render(<RouterProvider router={router} />);

        const nextButton = await screen.findByRole('button', { name: /next/i });

        await user.click(nextButton);

        await waitFor(() => {
          expect(router.state.location.search).toBe('?page=3');
        });
      });
    });
  });
});
