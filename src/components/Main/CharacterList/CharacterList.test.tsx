import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { MOCK_CHARACTERS_DATA, MOCK_EMPTY_DATA } from '@/__mocks__';

import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
  it('should render the correct number of CharacterCard components based on the characters length', () => {
    render(
      <MemoryRouter>
        <CharacterList
          characters={MOCK_CHARACTERS_DATA}
          onSelectCharacter={vi.fn()}
          onUIClick={vi.fn()}
          searchQuery={''}
        />
      </MemoryRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(MOCK_CHARACTERS_DATA.length);
  });

  it('should display a message when no cards are present', () => {
    render(
      <MemoryRouter>
        <CharacterList
          characters={MOCK_EMPTY_DATA}
          onSelectCharacter={vi.fn()}
          onUIClick={vi.fn()}
          searchQuery={'rick'}
        />
      </MemoryRouter>
    );

    const message = screen.getByText(/No results found for your search for/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("'rick'");

    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });
});
