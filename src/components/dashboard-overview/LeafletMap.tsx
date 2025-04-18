import { MapContainer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function Leafletmap() {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('/country-borders/countries.geo.json')
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  function countryStyle(feature: any) {
    let color = '#E3E4DB';
    const countryName = feature.properties.name;

    if (countryName === 'Portugal') {
      color = 'blue';
    }

    return {
      fillColor: color,
      weight: 0.5,
      opacity: 1,
      color: '#808080',
      fillOpacity: 0.6,
    };
  }

  function highlightFeature(e: L.LeafletMouseEvent) {
    const layer = e.target;
    const countryName = layer.feature.properties.name;

    if (layer instanceof L.Path &&  countryName === 'Portugal') {
      layer.bindPopup(countryName, { closeButton: false }).openPopup();
      layer.bringToFront();

      layer.on('mousemove', (event) => {
        const originalLatLng = event.latlng;
        const newLatLng = L.latLng(originalLatLng.lat + 0.9, originalLatLng.lng);
        layer.getPopup()?.setLatLng(newLatLng);
      });
    }
  }

  function resetHighlight(e: L.LeafletMouseEvent) {
    const layer = e.target;
    if (layer instanceof L.Path) {
      layer.closePopup();
    }
  }

  function handleEachFeature(feature: any, layer: L.Layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  return (
    <MapContainer
      center={[45.505, 10]}
      zoom={2}
      scrollWheelZoom={false}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ height: '100vh', width: '100%', backgroundColor: '#ffffff' }}
    >
      {geoData && (
        <GeoJSON
          data={geoData}
          style={countryStyle}
          onEachFeature={handleEachFeature}
        />
      )}
    </MapContainer>
  );
}
