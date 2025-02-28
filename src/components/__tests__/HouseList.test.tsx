import {
  render, screen, within, fireEvent, waitFor,
} from '@testing-library/react';
import { MockedFunction } from 'vitest';
import HouseList from '../HouseList';
import currencyFormatter from '../../utils/currencyFormatter';

describe('HouseLst component', () => {
  const apiUrl = 'http://localhost:3000/houses';
  const mockData = [
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

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and displays data on mount', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([...mockData]),
    });

    render(<HouseList />);

    // check if correct request is made
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));
    // fetching data
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2 + 1); // Including header row

    mockData.forEach((item, index) => {
      const cells = within(rows[index + 1]).getAllByRole('cell');
      expect(cells[0]).toHaveTextContent(item.address);
      expect(cells[1]).toHaveTextContent(item.country);
      expect(cells[2]).toHaveTextContent(currencyFormatter.format(item.price));
    });
  });

  it('adds new row when the button "Add" is clicked', async () => {
    const newRowData = {
      id: 3,
      address: '123 Main St. Edmonton',
      country: 'Canada',
      price: 100000,
    };
    // api call response stubs
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        // get items response
        json: vi.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({
        // create new item response
        json: vi.fn().mockResolvedValue(newRowData),
      });

    render(<HouseList />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));

    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).toBeInTheDocument();
    // check if correct request is made
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));

    // just only header
    expect(screen.getAllByRole('row')).toHaveLength(1);

    fireEvent.click(button);

    await waitFor(() => {
      const lastCall = (global.fetch as MockedFunction<typeof fetch>).mock.calls.at(-1);
      if (!lastCall) throw new Error('No API calls found');

      const body = lastCall[1]?.body;
      if (typeof body !== 'string') {
        throw new Error(`Expected body to be a string but got ${typeof body}`);
      }

      const requestBody = JSON.parse(body);
      expect(requestBody.address).toBe(newRowData.address);
      expect(requestBody.country).toBe(newRowData.country);
      expect(requestBody.price).toBe(newRowData.price);
    });

    const rowsCount = 1 + 1; // one header row and one data row
    const newRows = screen.getAllByRole('row');
    expect(newRows).toHaveLength(rowsCount);

    // last row cells
    const cells = within(newRows[1]).getAllByRole('cell');
    expect(cells[0]).toHaveTextContent(newRowData.address);
    expect(cells[1]).toHaveTextContent(newRowData.country);
    expect(cells[2]).toHaveTextContent(currencyFormatter.format(newRowData.price));
  });
});
