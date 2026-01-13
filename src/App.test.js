import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders homepage text', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to the Homepage/i)).toBeInTheDocument();
  expect(screen.getByText(/This app was created by a human with as much help from Copilot as possible./i)).toBeInTheDocument();
});

test('renders footer icon', () => {
  render(<App />);
  const icon = screen.getByText(/GitHub Copilot/i).querySelector('.copilot-icon');

  expect(icon).toBeInTheDocument();
});
