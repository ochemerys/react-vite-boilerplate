import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator component', () => {
  it('renders loading state', () => {
    render(<LoadingIndicator loadingState="Loading ..." />);
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<LoadingIndicator loadingState="An error occured while loading" />);
    expect(screen.getByText('An error occured while loading')).toBeInTheDocument();
  });
});
