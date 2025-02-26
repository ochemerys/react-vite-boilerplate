import { render, screen } from '@testing-library/react';
import House from '../House';

describe('House component', () => {
  it('renders application name as attribute', () => {
    render(<House />);
    expect(screen.getByText('House')).toBeInTheDocument();
  });
});
