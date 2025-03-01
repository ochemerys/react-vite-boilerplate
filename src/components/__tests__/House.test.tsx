import { render, screen } from '@testing-library/react';
import House from '../House';
import { IHouse } from '../../types/IHouse';
import currencyFormatter from '../../utils/currencyFormatter';

describe('House component', () => {
  it('should render application name as attribute', () => {
    const dummyHouse:IHouse = {
      id: 0, address: '', country: '', price: 0, description: '', image: '',
    };
    render(<House houseData={dummyHouse} />);
    expect(screen.getByText('House on the market')).toBeInTheDocument();
  });

  it('should render default image for house when image name is empty', () => {
    const dummyHouse:IHouse = {
      id: 0, address: '', country: '', price: 0, description: '', image: '',
    };
    const expectedSrc = expect.stringMatching(/default-house.png/);
    render(<House houseData={dummyHouse} />);
    const img = screen.getByAltText('house');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expectedSrc);
  });

  it('should render house properly when correct data is passed to component', () => {
    const testHouse:IHouse = {
      id: 1, address: 'test address', country: 'thet country', price: 123, description: 'test description', image: '534182.jpeg',
    };
    const expectedSrc = expect.stringMatching(/534182.jpeg/);
    render(<House houseData={testHouse} />);
    expect(screen.getByText(testHouse.address)).toBeInTheDocument();
    expect(screen.getByText(testHouse.country)).toBeInTheDocument();
    expect(screen.getByText(currencyFormatter.format(testHouse.price))).toBeInTheDocument();
    if (testHouse.description !== undefined) {
      expect(screen.getByText(testHouse.description)).toBeInTheDocument();
    }
    const img = screen.getByAltText('house');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expectedSrc);
  });
});
