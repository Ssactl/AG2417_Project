import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as turf from '@turf/turf';

function ChanceCard4({
  players,
  currentPlayer,
  stations,
}) {
  console.log('here is ChanceCard4');
  const currentPlayerCities = stations.filter(
    (stations) => stations.belonger === currentPlayer + 1
  )
  console.log(stations);
  console.log(currentPlayer);
  console.log(currentPlayerCities);

  const calculateScore = () => {
    let totalReward = 0;
    currentPlayerCities.forEach((city1) => {
      currentPlayerCities.forEach((city2) => {
        if (city1.id !== city2.id) {
          const city1Point = turf.point([city1.latitude, city1.longitude]);
          console.log(city1Point);
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

  return (
    <>
      <h3>Chance Card 4 - Receive rewards for cities within 300km of each other</h3>
      <p>Reward: {totalReward}</p>
      <p>Score: {score}</p>
      {currentPlayerCities.length > 0 && (
        <MapContainer
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
        </MapContainer>
      )}
    </>
  );
};

export default ChanceCard4;
