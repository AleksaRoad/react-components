import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { CACHE_KEY } from '@/shared';

import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should get local storage search query on mount', () => {
    localStorage.setItem(CACHE_KEY.searchQuery, JSON.stringify('morty smith'));

    render(<SearchForm onSearch={vi.fn()} />);

    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveValue('morty smith');
  });

  it('should save search query to local storage', async () => {
    const user = userEvent.setup();

    render(<SearchForm onSearch={vi.fn()} />);

    expect(localStorage.getItem(CACHE_KEY.searchQuery)).toBeNull();

    const searchInput = screen.getByRole('searchbox');

    await user.type(searchInput, 'rick sanchez');

    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    await user.click(searchButton);

    expect(localStorage.getItem(CACHE_KEY.searchQuery)).toBe(
      JSON.stringify('rick sanchez')
    );
  });
});
