import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import './ChanceCard.css';

function ChanceCard4({
  players,
  setPlayers,
  currentPlayer,
  nextPlayer,
  stations,
}) {
  console.log('here is ChanceCard4');
  // const updatedStations1 = stations.filter(
  //   (stations) => stations.belonger === 0,
  // )
  // const updatedStations = updatedStations1.map((station) => ({
  //   ...station,
  //   belonger: currentPlayer + 1,
  // }));
  // const currentPlayerCities = updatedStations.filter(
  //   (stations) => stations.belonger === currentPlayer + 1
  // )
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

  function setCurrentPlayerScore() {
    const newPlayers = JSON.parse(JSON.stringify(players));
    newPlayers[currentPlayer].score = players[currentPlayer].score + totalReward;
    setPlayers[newPlayers];
    nextPlayer();
  }

  return (
    <div>
      <div className='chance--card--result'>
        <h3>Chance Card 4 - Distance Bonus </h3>
        <p >Reward: {totalReward}</p>
        <p >Score: {players[currentPlayer].score}</p>
        {currentPlayerCities.length > 0 ? (
          <MapContainer
            center={[currentPlayerCities[0].latitude, currentPlayerCities[0].longitude]}
            zoom={3}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* add circles */}
            {currentPlayerCities.map((station, index) => (
              <Circle
                key={index}
                center={[station.latitude, station.longitude]}
                pathOptions={{ color: "blue", fillColor: "blue" }}
                radius={300000} // 设置圆的半径（以米为单位）
              />
            ))}
            {currentPlayerCities.map((city) => (
              <Marker
                key={city.id}
                position={[city.latitude, city.longitude]}
              >
                <Popup>{city.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p> No Reward</p>
        )}
      </div>
      <button className='chance--card--button' onClick={setCurrentPlayerScore}>
        OK
      </button>
    </div>
  );
};

export default ChanceCard4;