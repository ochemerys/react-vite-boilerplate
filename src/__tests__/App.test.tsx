// import { useContext } from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import App from '../App';
// import NavigationContext from '../contexts/NavigationContext';
// import navValues from '../utils/navValues';

describe('App component', () => {
  const apiUrl = 'http://localhost:3000/houses';

  const mockData = [{
    id: 1,
    address: '12 Valley of Kings, Geneva',
    country: 'Switzerland',
    price: 900000,
    description: 'A beautiful house in Geneva',
    image: 'house1.jpg',
  }];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render App with Banner component', () => {
    render(<App />);
    expect(screen.getByText('Providing houses all over the world')).toBeInTheDocument();
  });

  it('should initially render HouseList component with loading status', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should initialize NavigationContext with home page', () => {
    render(<App />);
    const banner = screen.getByText('Providing houses all over the world');
    expect(banner).toBeInTheDocument();
  });

  it('should update navigation state when house is selected', async () => {
    // Mock fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    // Wait for data to load
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));

    // Find and click the house row
    const houseRow = await screen.findByRole('row', {
      name: /12 Valley of Kings, Geneva/i,
    });

    fireEvent.click(houseRow);

    // Verify navigation to house details
    await waitFor(() => {
      expect(screen.getByText('House on the market')).toBeInTheDocument();
    });
  });

  it('should provide NavigationContext with correct values to House component', async () => {
    // Mock fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue(mockData),
    });
    render(<App />);
    // Wait for data to load and click the house row
    const houseRow = await screen.findByRole('row', {
      name: /12 Valley of Kings, Geneva/i,
    });
    fireEvent.click(houseRow);
    // Verify that House component receives the correct context
    await waitFor(() => {
      const houseDetails = screen.getByText('House on the market');
      expect(houseDetails).toBeInTheDocument();

      // Verify the selected house details are displayed
      expect(screen.getByText('Switzerland')).toBeInTheDocument();
      expect(screen.getByText('12 Valley of Kings, Geneva')).toBeInTheDocument();
      expect(screen.getByText('$900,000.00')).toBeInTheDocument();
    });
  });
});
