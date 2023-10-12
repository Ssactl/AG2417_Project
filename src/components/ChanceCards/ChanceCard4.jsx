import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import './ChanceCard.css'

function ChanceCard4({
  players,
  currentPlayer,
  nextplayer,
  stations,
}) {
  console.log('here is ChanceCard4');
  const currentPlayerCities = stations.filter(
    (stations) => stations.belonger === currentPlayer + 1
  )
  console.log(stations);
  console.log(currentPlayer);
  console.log(currentPlayerCities);
  let totalReward = 0;
  const calculateScore = () => {
    // let totalReward = 0;
    currentPlayerCities.forEach((city1) => {
      currentPlayerCities.forEach((city2) => {
        if (city1.id !== city2.id) {
          const city1Point = turf.point([city1.latitude, city1.longitude]);
          const city2Point = turf.point([city2.latitude, city2.longitude]);
          const distance = turf.distance(city1Point, city2Point, {
            units: 'kilometers',
          });
          if (distance <= 300) {
            totalReward += 1000;
          }
        }
      });
    });
    return totalReward;
  };

  const score = calculateScore();

  // Create a Turf.js feature collection for the currentPlayerCities
  const cityFeatures = currentPlayerCities.map((city) => {
    return turf.point([city.latitude, city.longitude], {
      name: city.name,
    });
  });
  // const cityFeatureCollection = turf.featureCollection(cityFeatures);

  // // Create a 300km buffer around the city feature collection
  // const buffer = turf.buffer(cityFeatureCollection, 300, {
  //   units: 'kilometers',
  // });

  // Convert the buffer to GeoJSON
  // const bufferGeoJSON = turf.toWgs84(buffer);
  // Render the buffer as GeoJSON on the map
  // useGeoJSON(bufferGeoJSON, {
  //   style: {
  //     fillColor: 'blue',
  //     color: 'blue',
  //   },
  // });
    // Create a feature group for the buffer polygons
    // const bufferGroup = new L.FeatureGroup();

    // // Create buffers for each city and add them to the buffer group
    // currentPlayerCities.forEach((city) => {
    //   const cityPoint = turf.point([city.latitude, city.longitude]);
    //   const buffer = turf.buffer(cityPoint, 300, {
    //     units: 'kilometers',
    //   });
    //   const bufferPolygon = L.geoJSON(buffer).getLayers()[0];
    //   bufferGroup.addLayer(bufferPolygon);
    // });
    const mapContainerRef = useRef(null);
  return (
    <div className='chance--card--4'>
      <h3>Chance Card 4 - Distance Bonus </h3>
      <p >Reward: {totalReward}</p>
      <p >Score: {players[currentPlayer].score}</p>
      {currentPlayerCities.length > 0 && (
        <MapContainer
        ref={mapContainerRef}
          center={[currentPlayerCities[0].latitude, currentPlayerCities[0].longitude]}
          zoom={5}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {currentPlayerCities.map((city) => (
            <Marker
              key={city.id}
              position={[city.latitude, city.longitude]}
            >
              <Popup>{city.name}</Popup>
            </Marker>
          ))}
  {/* Add the buffer polygons to the map */}
  {currentPlayerCities.map((city) => {
            const cityPoint = turf.point([city.latitude, city.longitude]);
            const buffer = turf.buffer(cityPoint, 300, {
              units: 'kilometers',
            });
            const bufferLayer = L.geoJSON(buffer);
            bufferLayer.addTo(mapContainerRef.current.leafletElement);
          })}

        </MapContainer>
      )}:
      (
        <p> No Reward</p>
      )
    </div>
  );
};

export default ChanceCard4;