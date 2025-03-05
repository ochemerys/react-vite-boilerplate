import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import { HouseListRow } from '../HouseListRow';
import currencyFormatter from '../../utils/currencyFormatter';
import NavigationContext from '../../contexts/NavigationContext';
import navValues from '../../utils/navValues';
import House from '../House';

describe('HouseListRow component', () => {
  const mockNavigate = vi.fn();
  const mockNavigationContext = {
    current: 'home',
    navigate: mockNavigate,
  };
  it('should render address cell value in HouseListRow component', () => {
    const rowData = {
      id: 0, address: 'address', country: 'country', price: 1111.234,
    };
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <HouseListRow key={rowData.id} rowData={rowData} />
      </NavigationContext.Provider>,
    );
    const row = screen.getByRole('row');
    const cells = within(row).getAllByRole('cell');
    expect(cells[0]).toHaveTextContent(rowData.address);
    expect(cells[1]).toHaveTextContent('country');
    expect(cells[2]).toHaveTextContent(currencyFormatter.format(rowData.price));
  });

  it('should call navigate with correct parameters when row is clicked', () => {
    const rowData = {
      id: 1, address: 'address', country: 'country', price: 1111.234,
    };
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <HouseListRow key={rowData.id} rowData={rowData} />
      </NavigationContext.Provider>,
    );
    const row = screen.getByRole('row');
    fireEvent.click(row);
    expect(mockNavigate).toHaveBeenCalledWith(navValues.house, rowData);
  });

  it('should render no house selected message when context has no selected house', () => {
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <House />
      </NavigationContext.Provider>,
    );
    expect(screen.getByText('No house selected')).toBeInTheDocument();
  });
});
