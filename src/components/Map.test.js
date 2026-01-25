import React from 'react';
import { render } from '@testing-library/react';

// Mock maplibre-gl similar to App.test.js
jest.mock('maplibre-gl', () => ({
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
}));

import MapComponent from './Map';

test('renders Map without crashing with defaults', () => {
  const { container } = render(<MapComponent />);
  expect(container.querySelector('div')).toBeTruthy();
});

test('renders Map with provided center and layers', () => {
  const fakeLayer = [{ sourceId: 'x', source: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } }, layer: { id: 'x-layer', type: 'line', source: 'x' } }];
  const { container } = render(<MapComponent center={[1, 2]} layers={fakeLayer} />);
  expect(container.querySelector('div')).toBeTruthy();
});
