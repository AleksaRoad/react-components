import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { MOCK_CHARACTERS_DATA } from '@/__mocks__/';

import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
  it('should render the correct number of CharacterCard components based on the characters length', () => {
    render(
      <BrowserRouter>
        <CharacterList characters={MOCK_CHARACTERS_DATA} />
      </BrowserRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(MOCK_CHARACTERS_DATA.length);
  });
});
