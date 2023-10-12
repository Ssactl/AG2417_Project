import React from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import './ChanceCard.css';

function ChanceCard2({
  players,
  setPlayers,
  currentPlayer,
  nextPlayer,
  stations,
  setStations,
  levelfeatures,
  setLevelfeatures,
}) {
  console.log('here is ChanceCard2');
  const fengShuiStations = stations.filter(
    (stations) => stations.belonger === 0,
  )
  console.log(fengShuiStations);
  let cid = -999;
  let isPicked = false;
  
// for picking
  function handlePick(event, cidCity) {
    cid = cidCity;
    isPicked = true;
    console.log('handlePick called with cidCity:', cidCity);
    console.log('isPicked:', isPicked);
  }
// for buying
  function setCurrentInfo() {
    if (isPicked && cid > 0) {
      const newPlayers = JSON.parse(JSON.stringify(players));
      const fid = (cid - 1) * 3 + 1;
      newPlayers[currentPlayer].score = players[currentPlayer].score - levelfeatures[fid];
      console.log('newPlayers', newPlayers);
      setPlayers(newPlayers);
      const newStations = JSON.parse(JSON.stringify(stations));
      newStations[cid].belonger = currentPlayer + 1;
      newStations[cid].level = 1;
      setStations(newStations);
      nextPlayer();
      console.log(fid);
    }
    console.log(isPicked);
    console.log(cid);
  }
// for not buying
  function setClose(){
    nextPlayer();
  }

  return (
    <div>
      <div className='chance--card--result'>
        <h3>Chance Card 2 - Feng Shui Haven</h3>
        <p> Please pick one station and you will own it.</p>
        {isPicked ? (
          <p> The station costs: {levelfeatures[(cid - 1) * 3 + 1]} scores</p>
        ) : (
          <p> You haven't pick one yet. </p>
        )}
        {fengShuiStations.length > 0 ? (
          <MapContainer
            center={[fengShuiStations[0].latitude, fengShuiStations[0].longitude]}
            zoom={4}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {fengShuiStations.map((city) => (
              <Marker
                key={city.cid}
                position={[city.latitude, city.longitude]}
                eventHandlers={{
                  click: (e) => {
                    handlePick(e, city.cid)
                  }
                }}
              >
                <Popup>{city.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p> No Feng Shui Haven in this place</p>
        )}
      </div>
      <div className="button-container">
  <button className='chance--card--button' onClick={setCurrentInfo}>
    OK
  </button>
  <button className='chance--card--button' onClick={setClose}>
    I don't want any.
  </button>
</div>
    </div>
  );
}

export default ChanceCard2;