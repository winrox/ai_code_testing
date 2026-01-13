import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders homepage text', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to the Homepage/i)).toBeInTheDocument();
  expect(screen.getByText(/This is a simple React app/i)).toBeInTheDocument();
});
