import React from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import './ChanceCard.css';

function ChanceCard3({
  players,
  setPlayers,
  currentPlayer,
  nextPlayer,
  stations,
  levelfeatures,
  updateStationOtherState,
}) {
  console.log('here is ChanceCard3');
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
  // console.log(levelfeatures);
  // console.log(currentPlayer);
  console.log(currentPlayerCities);

  // Check if any of the currentPlayer's cities have the "Cuisine" feature
  let hasCuisineCity = false;
  let index = 0;

  let cuisineStations = levelfeatures.filter(
    (feature) => feature.level === -99999,
  )

  for (const city of currentPlayerCities) {
    for (const feature of levelfeatures) {
      if (feature.cid === city.cid && feature.categories === 'Cuisine') {
        cuisineStations[index] = feature;
        hasCuisineCity = true;
        index++;
        break;
      }
    }
    if (hasCuisineCity) {
      break;
    }
  }

  // Initialize the penalty
  let penalty = 0;
  if (!hasCuisineCity) {
    // If none of the cities have the "Cuisine" feature, grant the title and impose a penalty
    penalty = - 1000;
    // You can also grant the title here if needed
  }
  console.log(cuisineStations);
  console.log(penalty);
  // let clickcount = 0;

  function setStationOtherClose() {
    updateStationOtherState();
  }

  function setCurrentPlayerScore() {
    const newPlayers = JSON.parse(JSON.stringify(players));
    newPlayers[currentPlayer].score = players[currentPlayer].score + penalty;
    console.log('newPlayers', newPlayers);
    setPlayers(newPlayers);
    setStationOtherClose();
  };

  return (
    <div>
      <div className='chance--card--result' onClick={setCurrentPlayerScore}>
        <h3>Chance Card 3 - Cuisine Desert</h3>
        {hasCuisineCity ? (
          <div>
            <p>You own cities with Cuisine features. No penalty is imposed.</p>
            <p>Cuisine Stations:</p>
            <ul >
              {cuisineStations.map((feature, index) => (
                <li className='chance--card--list' key={index}>Station:{feature.cname} <br />    Feature: {feature.fname}</li>
              ))}
            </ul>
            <MapContainer
              center={[35.03956537837425, 103.4895297672369]}
              zoom={4}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cuisineStations.map((city) => (
                <Marker
                  key={city.id}
                  position={[city.latitude, city.longitude]}
                >
                  <Popup>{city.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : (
          <div>
            <p>
              You don't own cities with the Cuisine feature.
            </p>
            <p>
              You are awarded the Cuisine Desert title which costs 1000 scores.
            </p>
          </div>
        )}
      </div>
      <button className='chance--card--button' onClick={setCurrentPlayerScore}>
        OK
      </button>
    </div>
  );
}

export default ChanceCard3;