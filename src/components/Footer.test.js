import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock the maplibre-gl module before it gets imported in App.js
jest.mock('maplibre-gl', function() {
  return {
    Map: function() {
      const instance = {
        on: jest.fn(),
        remove: jest.fn(),
      };
      (globalThis.__MAP_INSTANCES__ = globalThis.__MAP_INSTANCES__ || []).push(instance);
      return instance;
    },
  };
});

import App from '../App';

test('renders header title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Human in the Loop/i })).toBeInTheDocument();
});
