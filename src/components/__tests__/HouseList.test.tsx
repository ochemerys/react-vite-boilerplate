import { render, screen, within } from '@testing-library/react';
import HouseList from '../HouseList';

describe('HouseLst component', () => {
  it('renders HouseLIst title', () => {
    render(<HouseList />);
    expect(screen.getByText('Houses currently on the market')).toBeInTheDocument();
  });

  test('renders House List table', () => {
    render(<HouseList />);
    // Check if the table is rendered
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('renders House List table with correct column names', () => {
    render(<HouseList />);
    // Check if the table is rendered
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    // Check for specific column names within the table header
    const columnNames = ['Address', 'Country', 'Asking Price'];
    const headers = within(tableElement).getAllByRole('columnheader');
    const headerTexts = headers.map((header) => header.textContent);
    columnNames.forEach((name) => {
      expect(headerTexts).toContain(name);
    });
  });

  test('renders House List table with values', () => {
    const data = [
      {
        id: 1,
        address: '12 Valley of Kings, Geneva',
        country: 'Switzerland',
        price: 900000,
      },
      {
        id: 2,
        address: '89 Road of Forks, Bern',
        country: 'Switzerland',
        price: 500000,
      },
    ];
    render(<HouseList />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1); // Including header row

    data.forEach((item, index) => {
      const cells = within(rows[index + 1]).getAllByRole('cell');
      expect(cells[0]).toHaveTextContent(item.address);
      expect(cells[1]).toHaveTextContent(item.country);
      expect(cells[2]).toHaveTextContent(item.price.toString());
    });
  });
});
