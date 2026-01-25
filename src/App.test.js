import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 

// Mock the maplibre-gl module before it gets imported in App.js
jest.mock('maplibre-gl', function() {
  return ({
    Map: function() {
      const instance = {
        on: jest.fn(),
        remove: jest.fn(),
        addSource: jest.fn(),
        addLayer: jest.fn(),
        getSource: jest.fn(),
      };
      (globalThis.__MAP_INSTANCES__ = globalThis.__MAP_INSTANCES__ || []).push(instance);
      return instance;
    },
  });
});

import App from './App';

test('renders homepage text', () => {
  render(<App />);
  expect(screen.getByText(/Human in the Loop/i)).toBeInTheDocument();
});
