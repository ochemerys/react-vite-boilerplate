import { render, screen } from '@testing-library/react';
import HouseList from '../HouseList';

describe('HouseLIst component', () => {
  it('renders HouseLIst title', () => {
    render(<HouseList />);
    expect(screen.getByText('Houses currently on the market')).toBeInTheDocument();
  });
});
