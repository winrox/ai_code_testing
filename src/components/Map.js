import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';


const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json', // MapLibre demo style
      center: [0, 0], // Initial map center [longitude, latitude]
      zoom: 2, // Initial zoom level
    });

    return () => map.remove(); // Clean up on component unmount
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
