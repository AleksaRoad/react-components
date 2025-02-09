import { fireEvent, render, screen } from '@testing-library/react';

import { MOCK_CHARACTERS_DATA } from '@/__mocks__';

import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  it('should render relevant card data', () => {
    render(
      <CharacterCard character={MOCK_CHARACTERS_DATA[0]} onClick={vi.fn()} />
    );

    expect(screen.getByText(MOCK_CHARACTERS_DATA[0].name)).toBeInTheDocument();
  });

  it('should open a detailed card component when clicked', () => {
    const onCardClick = vi.fn();
    render(
      <CharacterCard
        character={MOCK_CHARACTERS_DATA[0]}
        onClick={onCardClick}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onCardClick).toHaveBeenCalled();
  });
});
