import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { vi } from 'vitest';
import AddHouse from '../AddHouse';
import NavigationContext from '../../contexts/NavigationContext';
import navValues from '../../utils/navValues';
import * as housesApi from '../../api/houses';

describe('AddHouse component', () => {
  const mockNavigate = vi.fn();
  const mockAddHouse = vi.fn();

  const mockNavigationContext = {
    current: navValues.addHouse,
    navigate: mockNavigate,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render AddHouse form correctly', () => {
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <AddHouse onAddHouse={mockAddHouse} />
      </NavigationContext.Provider>,
    );
    expect(screen.getByText('Add New House')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Price')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <AddHouse onAddHouse={mockAddHouse} />
      </NavigationContext.Provider>,
    );
    const addressInput = screen.getByPlaceholderText('Enter Address');
    const countryInput = screen.getByPlaceholderText('Enter Country');
    const priceInput = screen.getByPlaceholderText('Enter Price');
    fireEvent.change(addressInput, { target: { value: 'Test Address' } });
    fireEvent.change(countryInput, { target: { value: 'Test Country' } });
    fireEvent.change(priceInput, { target: { value: '100000' } });
    expect(addressInput).toHaveValue('Test Address');
    expect(countryInput).toHaveValue('Test Country');
    expect(priceInput).toHaveValue(100000);
  });

  it('calls onAddHouse and navigates home when form is submitted', async () => {
    const mockHouse = {
      id: '1',
      address: 'Test Address',
      country: 'Test Country',
      price: 100000,
    };
    vi.spyOn(housesApi, 'post').mockResolvedValueOnce(mockHouse);
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <AddHouse onAddHouse={mockAddHouse} />
      </NavigationContext.Provider>,
    );
    fireEvent.change(screen.getByPlaceholderText('Enter Address'), { target: { value: 'Test Address' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Country'), { target: { value: 'Test Country' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Price'), { target: { value: '100000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(mockAddHouse).toHaveBeenCalledWith(mockHouse);
      expect(mockNavigate).toHaveBeenCalledWith(navValues.home);
    });
  });

  it('navigates home when Cancel button is clicked', () => {
    render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <AddHouse onAddHouse={mockAddHouse} />
      </NavigationContext.Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockNavigate).toHaveBeenCalledWith(navValues.home);
  });
});
