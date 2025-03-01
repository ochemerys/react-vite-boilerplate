import { render, screen } from '@testing-library/react';
import Banner from '../Banner';

describe('Banner component', () => {
  it('should render application name as attribute', () => {
    render(<Banner headerText="Providing houses all over the world" />);
    expect(screen.getByText('Providing houses all over the world')).toBeInTheDocument();
  });

  it('should render logo image element', () => {
    const expectedSrc = expect.stringMatching(/GloboLogo.png/);
    render(<Banner headerText="Does not matter what for this scenario" />);
    const img = screen.getByAltText('logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expectedSrc);
  });

  it('should render application name as child element', () => {
    render(<Banner>Providing houses all over the world</Banner>);
    expect(screen.getByText('Providing houses all over the world')).toBeInTheDocument();
  });

  it('should failes to rander when both headerText and children are not provided', () => {
    expect(() => render(<Banner />)).toThrow('Either headerText or children must be provided.');
  });
});
