import {
  render, screen, within, fireEvent,
} from '@testing-library/react';
import HouseList from '../HouseList';
import currencyFormatter from '../../utils/currencyFormatter';

describe('HouseLst component', () => {
  beforeEach(() => {
    render(<HouseList />);
  });

  it('renders HouseLIst title', () => {
    expect(screen.getByText('Houses currently on the market')).toBeInTheDocument();
  });

  it('renders House List table', () => {
    // Check if the table is rendered
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('renders House List table with correct column names', () => {
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

  it('renders House List table with values', () => {
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

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1); // Including header row

    data.forEach((item, index) => {
      const cells = within(rows[index + 1]).getAllByRole('cell');
      expect(cells[0]).toHaveTextContent(item.address);
      expect(cells[1]).toHaveTextContent(item.country);
      expect(cells[2]).toHaveTextContent(currencyFormatter.format(item.price));
    });
  });

  it('adds new row when the button "Add" is clicked', () => {
    const newRowData = {
      id: 3,
      address: '123 Main St. Edmonton',
      country: 'Canada',
      price: 100000,
    };

    const rows = screen.getAllByRole('row');
    const rowsCount = rows.length;

    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(button);

    const newRows = screen.getAllByRole('row');
    expect(newRows).toHaveLength(rowsCount + 1);

    // last row
    const cells = within(newRows[rowsCount]).getAllByRole('cell');
    expect(cells[0]).toHaveTextContent(newRowData.address);
    expect(cells[1]).toHaveTextContent(newRowData.country);
    expect(cells[2]).toHaveTextContent(currencyFormatter.format(newRowData.price));
  });
});
