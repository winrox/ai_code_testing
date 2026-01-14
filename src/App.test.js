import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 

// Mock the maplibre-gl module before it gets imported in App.js
jest.mock('maplibre-gl', function() {
  return ({
    Map: function() {
      return ({
        on: jest.fn(),
        remove: jest.fn(),
        // Add other methods and properties as needed
      })
    },
    // Mock other exports as needed
  })
});

import App from './App';

test('renders homepage text', () => {
  render(<App />);
  expect(screen.getByText(/Human in the Loop/i)).toBeInTheDocument();
});
