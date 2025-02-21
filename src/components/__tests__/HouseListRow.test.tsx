import { render, screen, within } from '@testing-library/react';
import HouseListRow from '../HouseListRow';

describe('HouseListRow commponent', () => {
  it('renders address cell value in HouseListRow component', () => {
    const rowData = {
      id: 0, address: 'address', country: 'country', price: 1111,
    };
    render(<HouseListRow key={rowData.id} rowData={rowData} />);

    const row = screen.getByRole('row');
    // Use within to find all td elements within the specific row
    const cells = within(row).getAllByRole('cell');

    expect(cells[0]).toHaveTextContent(rowData.address);
    expect(cells[1]).toHaveTextContent('country');
    expect(cells[2]).toHaveTextContent(rowData.price.toString());
  });
});
