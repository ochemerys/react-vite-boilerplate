import { render, screen } from '@testing-library/react';
import Banner from '../../../components/Banner';

describe('Banner component', () => {
  it('renders application name', () => {
    render(<Banner />);
    expect(screen.getByText('Online Permitting Application')).toBeInTheDocument();
  });

  it('renders logo image element', () => {
    const expectedSrc = expect.stringMatching(/GloboLogo.png/);
    render(<Banner />);
    const img = screen.getByAltText('logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expectedSrc);
  });

  it('dose nothing when no functionality', () => {
    // empty
  });
});
