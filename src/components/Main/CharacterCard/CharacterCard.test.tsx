import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { MOCK_CHARACTERS_DATA } from '@/__mocks__';

import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  it('should render relevant card data', () => {
    render(
      <CharacterCard character={MOCK_CHARACTERS_DATA[0]} onClick={vi.fn()} />
    );

    expect(screen.getByText(MOCK_CHARACTERS_DATA[0].name)).toBeInTheDocument();
    const imageElement = screen.getByRole('img', { name: /Rick Sanchez/i });
    expect(imageElement).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });

  it('should open a detailed card component when clicked', async () => {
    const onCardClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CharacterCard
        character={MOCK_CHARACTERS_DATA[0]}
        onClick={onCardClick}
      />
    );

    await user.click(screen.getByRole('button'));

    expect(onCardClick).toHaveBeenCalled();
  });
});
