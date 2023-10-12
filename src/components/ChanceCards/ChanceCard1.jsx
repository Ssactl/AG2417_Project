import React from 'react';
import './ChanceCard.css';

function ChanceCard1({
  players, 
  setPlayers,
  currentPlayer,
  nextPlayer,
  stations,
}) {
  console.log('here is ChanceCard1');
  const currentPlayerCities = stations.filter(
    (stations) => stations.belonger === currentPlayer + 1
  )
 let subsidy = 0;
function setCurrentPlayerScore(){
  const newPlayers = JSON.parse(JSON.stringify(players));
  newPlayers[currentPlayer].score = players[currentPlayer].score +  subsidy;
  setPlayers(newPlayers);
  nextPlayer();
}

    return (
      <div>
        <div className='chance--card--result' onClick={setCurrentPlayerScore}>
        <h3>Chance Card 1 - Remote Region Government Subsidy</h3>
        {hasNorthwestCity ? (
          <div>
            <p>You own stations in Remote Region. </p>
            <p>Remote Stations:</p>
            <ul >
              {northwestStations.map((station, index) => (
                <li className='chance--card--list' key={index}>{station.name}</li>
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
              {northwestStations.map((city) => (
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
              You don't own stations in Remote Region.
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

export default ChanceCard1;
