import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import { HouseListRow } from '../HouseListRow';
import currencyFormatter from '../../utils/currencyFormatter';
import NavigationContext from '../../contexts/NavigationContext';

describe('HouseListRow commponent', () => {
  it('should render address cell value in HouseListRow component', () => {
    const rowData = {
      id: 0, address: 'address', country: 'country', price: 1111.234,
    };
    render(<HouseListRow key={rowData.id} rowData={rowData} />);

    const row = screen.getByRole('row');
    // Use within to find all td elements within the specific row
    const cells = within(row).getAllByRole('cell');

    expect(cells[0]).toHaveTextContent(rowData.address);
    expect(cells[1]).toHaveTextContent('country');
    expect(cells[2]).toHaveTextContent(currencyFormatter.format(rowData.price));
  });

  it('should call onClick with the correct house when row is clicked', () => {
    const mockNavigate = vi.fn();
    const mockNavigationContext = {
      current: 'home',
      navigate: mockNavigate,
    };
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
    expect(mockNavigate).toHaveBeenCalledWith('House', rowData);
  });
});
