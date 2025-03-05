import {
  render, screen, within, waitFor,
} from '@testing-library/react';
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

  it('should fetch and display data on mount', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([...mockData]),
    });

    render(<HouseList />);

    // check if correct request is made
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));
    // fetching data
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2 + 1); // Including header

    mockData.forEach((item, index) => {
      const cells = within(rows[index + 1]).getAllByRole('cell');
      expect(cells[0]).toHaveTextContent(item.address);
      expect(cells[1]).toHaveTextContent(item.country);
      expect(cells[2]).toHaveTextContent(currencyFormatter.format(item.price));
    });
  });
});
