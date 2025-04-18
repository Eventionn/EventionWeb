import { MapContainer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';

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
      color = '#006def';
    }

    return {
      fillColor: color,
      weight: 0.9,
      opacity: 1,
      color: '#808080',
      fillOpacity: 0.3,
    };
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
      style={{
        height: '100vh',      // Alterado para ocupar toda a altura da tela
        width: '100%',        // Ocupa toda a largura disponível
        overflow: 'hidden',   // Impede a rolagem horizontal
      }}
    >
      {geoData && (
        <GeoJSON
          data={geoData}
          style={countryStyle}
        />
      )}
    </MapContainer>
  );
}
