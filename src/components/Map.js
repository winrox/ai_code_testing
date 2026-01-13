import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json', // MapLibre demo style
      center: [-97.7431, 30.2672], // Austin, TX [longitude, latitude]
      zoom: 2, // Zoom level
    });

    map.on('load', () => {
      // Add a GeoJSON source for the heart
      map.addSource('austin-heart', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-97.7431, 30.2672], // Austin, TX coordinates
              },
              properties: {
                'name': '♥️' 
              },
            },
          ],
        },
      });

      // Add a layer to display the heart
      map.addLayer({
        id: 'austin-heart-layer',
        type: 'symbol',
        source: 'austin-heart',
        'layout': {
          'text-field': ['get', 'name'], // Display 'name' property from GeoJSON
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Regular'], // Example fonts
          'text-anchor': 'center',
          'text-size': 16
        },
        'paint': {
          'text-color': '#ca3141',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      });

    });

    return () => map.remove(); // Clean up on component unmount
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
