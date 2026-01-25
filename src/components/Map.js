import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const defaultStyle = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const MapComponent = ({
  center = [0, 0],
  zoom = 2,
  minZoom = 0,
  maxZoom = 19,
  style = defaultStyle,
  layers = [],
}) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style,
      center,
      zoom,
      minZoom,
      maxZoom
    });

    map.on('load', () => {
      // Add a small point marker as before (Austin heart) only if center is not [0,0]
      if (Array.isArray(center) && !(center[0] === 0 && center[1] === 0)) {
        map.addSource('austin-heart', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: center,
                },
                properties: { name: '♥️' },
              },
            ],
          },
        });

        map.addLayer({
          id: 'austin-heart-layer',
          type: 'symbol',
          source: 'austin-heart',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Regular'],
            'text-anchor': 'center',
            'text-size': 24,
          },
          paint: { 'text-color': '#e11d48' },
        });
      }

      // Add custom layers provided by props
      if (Array.isArray(layers)) {
        layers.forEach((l) => {
          try {
            if (l.sourceId && l.source) {
              // avoid double-adding a source if it exists
              if (!map.getSource || !map.getSource(l.sourceId)) {
                // Some map mock implementations may not have getSource; guard it
                map.addSource(l.sourceId, l.source);
              }
            }
            if (l.layer) {
              map.addLayer(l.layer);
            }
          } catch (err) {
            // swallow errors to avoid breaking the app when a layer fails to add in tests
            // record the issue to a global array so tests and dev tools can inspect it
            if (typeof window !== 'undefined') {
              /* Collect lightweight error info without using `console` */
              (window.__mapLayerErrors = window.__mapLayerErrors || []).push({
                id: l && l.layer && l.layer.id,
                message: String(err),
              });
            }
          }
        });
      }
    });

    return () => map.remove();
  }, [center, zoom, maxZoom, style, layers]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;

MapComponent.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  style: PropTypes.object,
  layers: PropTypes.arrayOf(
    PropTypes.shape({
      sourceId: PropTypes.string,
      source: PropTypes.object,
      layer: PropTypes.object,
    })
  ),
};
