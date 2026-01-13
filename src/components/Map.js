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
      zoom: 10, // Zoom level
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
              properties: {},
            },
          ],
        },
      });

      // Add a layer to display the heart
      map.addLayer({
        id: 'austin-heart-layer',
        type: 'symbol',
        source: 'austin-heart',
        layout: {
          'icon-image': 'heart-icon', // Reference the custom icon
          'icon-size': 1.5,
        },
      });

      // Add the heart icon to the map
      map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Heart_corazón.svg/1024px-Heart_corazón.svg.png',
        (error, image) => {
          if (error) throw error;
          if (!map.hasImage('heart-icon')) {
            map.addImage('heart-icon', image);
          }
        }
      );
    });

    return () => map.remove(); // Clean up on component unmount
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
