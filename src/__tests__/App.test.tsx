import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renders App with Banner component', () => {
    render(<App />);
    expect(screen.getByText('Providing houses all over the world')).toBeInTheDocument();
  });
});
