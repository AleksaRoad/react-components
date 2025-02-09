import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { NotFound } from '@/components';

describe('Routing Tests', () => {
  it('should renders NotFound at "/404"', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
