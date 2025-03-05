import { render, screen } from '@testing-library/react';
import NavigationContext from '../../contexts/NavigationContext';
import navValues from '../../utils/navValues';

describe('Navigation Context', () => {
  it('should initialize with home page', () => {
    const mockNavigationContext = {
      current: navValues.home,
      navigate: vi.fn(),
    };
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <div data-testid="current-nav">{mockNavigationContext.current}</div>
      </NavigationContext.Provider>,
    );
    const currentNav = screen.getByTestId('current-nav');
    expect(currentNav).toHaveTextContent(navValues.home);
  });

  it('should provide navigation context with correct initial values', () => {
    const mockNavigationContext = {
      current: navValues.home,
      navigate: vi.fn(),
    };
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <div data-testid="current-nav">{mockNavigationContext.current}</div>
      </NavigationContext.Provider>,
    );
    expect(screen.getByTestId('current-nav')).toBeInTheDocument();
    expect(screen.getByText(navValues.home)).toBeInTheDocument();
  });
});
