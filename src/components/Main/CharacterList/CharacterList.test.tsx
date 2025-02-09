import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { MOCK_CHARACTERS_DATA, MOCK_EMPTY_DATA } from '@/__mocks__';

import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
  it('should render the correct number of CharacterCard components based on the characters length', () => {
    render(
      <BrowserRouter>
        <CharacterList
          characters={MOCK_CHARACTERS_DATA}
          apiErrorMessage={null}
          searchQuery={''}
        />
      </BrowserRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(MOCK_CHARACTERS_DATA.length);
  });

  it('should display a message when no cards are present', () => {
    render(
      <BrowserRouter>
        <CharacterList
          characters={MOCK_EMPTY_DATA}
          apiErrorMessage={null}
          searchQuery={'rick'}
        />
      </BrowserRouter>
    );

    const message = screen.getByText(/No results found for your search for/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("'rick'");

    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });
});
