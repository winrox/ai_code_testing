import React from 'react';
import './App.css';
import MapComponent from './components/Map';
import veloway from './assets/veloway.geojson';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Human in the Loop</h1>
      </header>
      <div className="main">
        <MapComponent
          center={[-97.7431, 30.2672]}
          minZoom={0}
          maxZoom={19}
          layers={[
            {
              sourceId: 'veloway',
              source: { type: 'geojson', data: veloway },
              layer: {
                id: 'veloway-layer',
                type: 'line',
                source: 'veloway',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#3452eb', 'line-width': 3, 'line-opacity': 0.9 },
                minzoom: 10,
              },
            },
          ]}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
