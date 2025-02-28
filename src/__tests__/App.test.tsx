import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  const apiUrl = 'http://localhost:3000/houses';
  const mockData = [
    {
      id: 1,
      address: '12 Valley of Kings, Geneva',
      country: 'Switzerland',
      price: 900000,
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders App with Banner component', () => {
    render(<App />);
    expect(screen.getByText('Providing houses all over the world')).toBeInTheDocument();
  });

  it('initially renders HouseList component with loading status', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders House component when house row is selected', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        // get items response
        json: vi.fn().mockResolvedValue([mockData]),
      });

    render(<App />);

    // check if correct request is made
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));

    const rows = screen.getAllByRole('row');

    if (rows.length > 1) {
      fireEvent.click(rows[1]); // row[0] is a header, row[1] is data row
      expect(screen.getByText('House on the market')).toBeInTheDocument();
    }
  });
});
