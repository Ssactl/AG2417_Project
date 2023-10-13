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
  updateStationOtherState,
}) {
  console.log('here is ChanceCard2');
  const fengShuiStations = stations.filter(
    (stations) => stations.belonger === 0,
  )
  console.log(fengShuiStations);
  let cid = -999;
  let fid = -999;
  let isPicked = false;

  function setStationOtherClose() {
    // const { updateStationOtherState } = props;
    updateStationOtherState();
  }
// for picking
  function handlePick(event, cidCity) {
    cid = cidCity;
    isPicked = true;
    fid = (cid - 1) * 3 + 1;
    console.log('handlePick called with cid:', cid);
    console.log('isPicked:', isPicked);
    console.log('scoreBuy:',levelfeatures[fid].scoreBuy)
  }
// for buying
  function setCurrentInfo() {
    if (isPicked && cid > 0) {
      // console.log('setCurrentInfo called with cid:', cid);
      // console.log('setCurrentInfo called with cid:', fid);
      const newPlayers = JSON.parse(JSON.stringify(players));
      newPlayers[currentPlayer].score = players[currentPlayer].score - levelfeatures[fid].scoreBuy;
      console.log('newPlayers', newPlayers);
      setPlayers(newPlayers);

      const newStations = JSON.parse(JSON.stringify(stations));
      newStations[cid-1].belonger = currentPlayer + 1;
      newStations[cid-1].level = 1;
      console.log('newStations', newStations);
      setStations(newStations);

      setStationOtherClose();
    }
    // console.log(isPicked);
    // console.log(cid);
  }
// for not buying
  function setClose(){
    setStationOtherClose();
  }

  return (
    <div>
      <div className='chance--card--result'>
        <h3>Chance Card 2 - Feng Shui Haven</h3>
        <p> Please pick one station.</p>
        {/* {fid>0 ? (
          <p> The station costs: {levelfeatures[fid].scoreBuy} scores</p>
        ) : (
          <p> You haven't pick one yet. </p>
        )} */}
        {fengShuiStations.length > 0 ? (
          <MapContainer
            center={[35.03956537837425, 103.4895297672369]}
            zoom={5}
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
                <Popup>{city.name},cost:{levelfeatures[3*(city.cid-1)+1].scoreBuy}</Popup>
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