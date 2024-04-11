import { render, screen } from '@testing-library/react';
import MapViewComponent from './Map';
import MapViewComponent_Ram from './ram_test';

test('renders learn react link', () => {
  render(<MapViewComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
