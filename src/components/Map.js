import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import veloway from '../assets/veloway.geojson';

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const osmRasterStyle = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          maxzoom: 19
        }
      },
      layers: [
        {
          id: 'osm-tiles',
          type: 'raster',
          source: 'osm',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: osmRasterStyle, // use OSM raster tiles with higher maxzoom for more detail
      center: [-97.7431, 30.2672], // Austin, TX [longitude, latitude]
      zoom: 2,
      maxZoom: 19
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
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Regular'],
          'text-anchor': 'center',
          'text-size': 24
        },
        'paint': {
          'text-color': '#e11d48'
        }
      });

      // Add veloway geojson as a source and show as a line at zoom 11+
      map.addSource('veloway', {
        type: 'geojson',
        data: veloway
      });

      map.addLayer({
        id: 'veloway-layer',
        type: 'line',
        source: 'veloway',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#ff0077',
          'line-width': 3,
          'line-opacity': 0.9
        },
        minzoom: 11
      });
    });

    return () => map.remove(); // Clean up on component unmount
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
